// Vercel serverless function: Stripe Checkout.
//
//   POST /api/checkout   { items: [{ sku, qty }], subscribe?, origin }  -> { url }
//        subscribe: true opens a Stripe Checkout in subscription mode (every 30 days at
//        site_settings.subscription_discount_pct off, default 15). Only daily-use products
//        (collection 'within', not bundles) may subscribe; the server enforces it.
//   GET  /api/checkout?session_id=cs_...                     -> order summary
//
// Prices are never trusted from the browser. Each SKU is looked up in
// Supabase (public read via the publishable key) and the Checkout Session is
// built from the database price. Shipping follows site_settings.

import Stripe from 'stripe'
import { fetchVariants, fetchSettings } from './_lib/supabase.js'

export const config = { runtime: 'nodejs' }

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })

function stripeClient() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return null
  return new Stripe(key, { apiVersion: '2024-06-20' })
}

export async function POST(request) {
  const stripe = stripeClient()
  if (!stripe) {
    return json({ error: 'checkout_not_configured', message: 'Checkout is not configured yet.' }, 503)
  }

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'bad_request', message: 'Invalid JSON.' }, 400)
  }

  const items = Array.isArray(body?.items) ? body.items : []
  const clean = items
    .map((i) => ({ sku: String(i.sku || '').slice(0, 64), qty: Math.max(1, Math.min(12, parseInt(i.qty, 10) || 1)) }))
    .filter((i) => i.sku)
  if (!clean.length) return json({ error: 'empty_cart', message: 'Your bag is empty.' }, 400)

  const origin = allowedOrigin(body.origin, request)

  let variants, settings
  try {
    ;[variants, settings] = await Promise.all([fetchVariants(clean.map((i) => i.sku)), fetchSettings()])
  } catch (err) {
    console.error('[checkout] catalog lookup failed', err)
    return json({ error: 'catalog_unavailable', message: 'We could not confirm prices. Please try again.' }, 502)
  }

  const bySku = Object.fromEntries(variants.map((v) => [v.sku, v]))
  const missing = clean.filter((i) => !bySku[i.sku]).map((i) => i.sku)
  if (missing.length) return json({ error: 'unknown_sku', message: `Unknown item: ${missing.join(', ')}` }, 400)

  // Purchasability is enforced here, not only in the UI. Only products whose
  // status is 'available' (and which are published) can be bought.
  const blocked = clean.filter((i) => bySku[i.sku].product?.status !== 'available' || bySku[i.sku].product?.is_published === false)
  if (blocked.length) {
    return json(
      { error: 'not_available', message: `Not available for purchase yet: ${blocked.map((i) => bySku[i.sku].product?.name || i.sku).join(', ')}. Join the list and we will write when it opens.` },
      409
    )
  }

  const subscribe = body?.subscribe === true
  const subPct = Math.min(50, Math.max(0, Number(settings.subscription_discount_pct ?? 15)))
  if (subscribe) {
    const notSub = clean.filter((i) => bySku[i.sku].product?.collection_slug !== 'within' || bySku[i.sku].product?.product_type === 'bundle')
    if (notSub.length) {
      return json({ error: 'not_subscribable', message: `Monthly delivery is available for the daily-use oils only, not: ${notSub.map((i) => bySku[i.sku].product?.name || i.sku).join(', ')}.` }, 400)
    }
  }

  const line_items = clean.map((i) => {
    const v = bySku[i.sku]
    const name = v.product?.name ? `${v.product.name} · ${v.label}` : v.label
    const image = v.image_storage_path || v.product?.product_images?.[0]?.storage_path
    return {
      quantity: i.qty,
      price_data: {
        currency: settings.currency || 'usd',
        unit_amount: subscribe ? Math.round(v.price_cents * (1 - subPct / 100)) : v.price_cents,
        ...(subscribe ? { recurring: { interval: 'day', interval_count: 30 } } : {}),
        product_data: {
          name,
          description: v.description ? v.description.split('|').slice(1).join('|').trim() || undefined : undefined,
          images: image ? [`${origin}/products/${image}.jpg`] : undefined,
          metadata: { sku: v.sku, slug: v.product?.slug || '' },
        },
      },
    }
  })

  const subtotal = clean.reduce((s, i) => s + (subscribe ? Math.round(bySku[i.sku].price_cents * (1 - subPct / 100)) : bySku[i.sku].price_cents) * i.qty, 0)
  const threshold = Number(settings.free_shipping_threshold_cents ?? 15000)
  const flat = Number(settings.flat_shipping_cents ?? 900)
  const shippingAmount = subtotal >= threshold ? 0 : flat

  try {
    const session = await stripe.checkout.sessions.create({
      mode: subscribe ? 'subscription' : 'payment',
      line_items,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      shipping_address_collection: { allowed_countries: ['US'] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: shippingAmount, currency: settings.currency || 'usd' },
            display_name: shippingAmount === 0 ? 'Complimentary shipping' : 'Standard shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 2 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
      ],
      phone_number_collection: { enabled: false },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      automatic_tax: { enabled: process.env.STRIPE_AUTOMATIC_TAX === 'true' },
      metadata: {
        cart: JSON.stringify(clean),
        source: 'drmushtaqs-storefront',
        plan: subscribe ? 'monthly' : 'once',
      },
      ...(subscribe
        ? { subscription_data: { description: 'Dr. Mushtaq’s monthly delivery', metadata: { cart: JSON.stringify(clean), source: 'drmushtaqs-storefront' } } }
        : { payment_intent_data: { description: 'Dr. Mushtaq’s order' } }),
    })
    return json({ url: session.url, id: session.id })
  } catch (err) {
    console.error('[checkout] stripe error', err)
    return json({ error: 'stripe_error', message: err.message || 'Stripe rejected the request.' }, 502)
  }
}

export async function GET(request) {
  const stripe = stripeClient()
  if (!stripe) return json({ error: 'checkout_not_configured' }, 503)
  const url = new URL(request.url)
  const id = url.searchParams.get('session_id')
  if (!id || !id.startsWith('cs_')) return json({ error: 'bad_request' }, 400)
  try {
    const session = await stripe.checkout.sessions.retrieve(id, { expand: ['line_items'] })
    return json({
      reference: session.id.slice(-8).toUpperCase(),
      status: session.payment_status,
      email: session.customer_details?.email || session.customer_email || '',
      amount_total: session.amount_total,
      items: (session.line_items?.data || []).map((li) => ({
        description: li.description,
        quantity: li.quantity,
        amount_total: li.amount_total,
      })),
    })
  } catch (err) {
    return json({ error: 'not_found', message: err.message }, 404)
  }
}

function allowedOrigin(candidate, request) {
  const fallback = process.env.PUBLIC_SITE_URL || `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || 'dr-mushtaqs-blackseed.vercel.app'}`
  try {
    const u = new URL(candidate)
    const host = u.hostname
    const ok =
      host === 'localhost' ||
      host.endsWith('.vercel.app') ||
      (process.env.PUBLIC_SITE_URL && host === new URL(process.env.PUBLIC_SITE_URL).hostname) ||
      host === request.headers.get('host')
    return ok ? u.origin : fallback
  } catch {
    return fallback
  }
}

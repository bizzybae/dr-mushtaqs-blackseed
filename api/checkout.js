// Vercel serverless function: Stripe Checkout.
//
//   POST /api/checkout   { items: [{ sku, qty }], origin }  -> { url }
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

  const line_items = clean.map((i) => {
    const v = bySku[i.sku]
    const name = v.product?.name ? `${v.product.name} · ${v.label}` : v.label
    const image = v.image_storage_path || v.product?.product_images?.[0]?.storage_path
    return {
      quantity: i.qty,
      price_data: {
        currency: settings.currency || 'usd',
        unit_amount: v.price_cents,
        product_data: {
          name,
          description: v.description ? v.description.split('|').slice(1).join('|').trim() || undefined : undefined,
          images: image ? [`${origin}/products/${image}.jpg`] : undefined,
          metadata: { sku: v.sku, slug: v.product?.slug || '' },
        },
      },
    }
  })

  const subtotal = clean.reduce((s, i) => s + bySku[i.sku].price_cents * i.qty, 0)
  const threshold = Number(settings.free_shipping_threshold_cents ?? 7500)
  const flat = Number(settings.flat_shipping_cents ?? 695)
  const shippingAmount = subtotal >= threshold ? 0 : flat

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
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
      },
      payment_intent_data: { description: 'Dr. Mushtaq’s Blackseed order' },
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

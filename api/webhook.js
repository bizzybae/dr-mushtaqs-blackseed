// Vercel serverless function: Stripe webhook.
// Records paid Checkout Sessions in Supabase (orders + order_items).
//
// Stripe Dashboard -> Developers -> Webhooks -> Add endpoint:
//   https://<your-domain>/api/webhook
//   events: checkout.session.completed, checkout.session.async_payment_succeeded,
//           checkout.session.async_payment_failed, charge.refunded, invoice.paid
//
// Subscriptions: the first delivery is recorded from the Checkout Session like
// any order. Each renewal arrives as invoice.paid (billing_reason
// subscription_cycle) and is recorded as its own order so it ships like one;
// the invoice id is stored in stripe_session_id (in_...), which keeps the
// unique key and the ignore-duplicates behaviour without a schema change.
// Then set STRIPE_WEBHOOK_SECRET in Vercel.

import Stripe from 'stripe'
import { fetchVariants, insertOrder, insertOrderItems, updateOrderStatus } from './_lib/supabase.js'

export const config = { runtime: 'nodejs' }

const text = (body, status = 200) => new Response(body, { status })

export async function POST(request) {
  const secret = process.env.STRIPE_SECRET_KEY
  const whsec = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret || !whsec) return text('webhook not configured', 503)

  const stripe = new Stripe(secret, { apiVersion: '2024-06-20' })
  const sig = request.headers.get('stripe-signature')
  const raw = await request.text()

  let event
  try {
    event = stripe.webhooks.constructEvent(raw, sig, whsec)
  } catch (err) {
    console.error('[webhook] signature failed', err.message)
    return text(`Webhook Error: ${err.message}`, 400)
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded': {
        const session = event.data.object
        if (session.payment_status === 'paid') await recordOrder(stripe, session)
        break
      }
      case 'checkout.session.async_payment_failed': {
        await updateOrderStatus(event.data.object.id, 'cancelled')
        break
      }
      case 'invoice.paid': {
        const invoice = event.data.object
        // The first invoice of a subscription is already recorded via the Checkout Session.
        if (invoice.billing_reason && invoice.billing_reason !== 'subscription_create' && invoice.subscription) await recordRenewal(stripe, invoice)
        break
      }
      case 'charge.refunded': {
        const charge = event.data.object
        if (charge.payment_intent) {
          const sessions = await stripe.checkout.sessions.list({ payment_intent: charge.payment_intent, limit: 1 })
          const s = sessions.data[0]
          if (s) await updateOrderStatus(s.id, 'refunded')
        }
        break
      }
      default:
        break
    }
    return text('ok')
  } catch (err) {
    console.error('[webhook] handler failed', err)
    return text('handler error', 500)
  }
}

async function recordOrder(stripe, session) {
  const full = await stripe.checkout.sessions.retrieve(session.id, { expand: ['line_items.data.price.product', 'shipping_cost.shipping_rate'] })
  const cart = safeJson(full.metadata?.cart) || []
  const skus = cart.map((c) => c.sku)
  const variants = skus.length ? await fetchVariants(skus) : []
  const bySku = Object.fromEntries(variants.map((v) => [v.sku, v]))

  const order = await insertOrder({
    email: full.customer_details?.email || full.customer_email || 'unknown@unknown',
    status: 'paid',
    subtotal_cents: full.amount_subtotal ?? 0,
    shipping_cents: full.shipping_cost?.amount_total ?? 0,
    tax_cents: full.total_details?.amount_tax ?? 0,
    total_cents: full.amount_total ?? 0,
    stripe_session_id: full.id,
    shipping_address: {
      name: full.shipping_details?.name || full.customer_details?.name || null,
      address: full.shipping_details?.address || full.customer_details?.address || null,
      phone: full.customer_details?.phone || null,
    },
  })

  // ignore-duplicates returns no row when the session was already recorded
  if (!order) return

  const items = (full.line_items?.data || []).map((li) => {
    const sku = li.price?.product?.metadata?.sku
    return {
      order_id: order.id,
      variant_id: sku && bySku[sku] ? bySku[sku].id : null,
      quantity: li.quantity,
      unit_price_cents: li.price?.unit_amount ?? Math.round(li.amount_subtotal / li.quantity),
    }
  })
  await insertOrderItems(items)
}

async function recordRenewal(stripe, invoice) {
  const full = await stripe.invoices.retrieve(invoice.id, { expand: ['lines.data.price.product', 'subscription'] })
  const lines = full.lines?.data || []
  const skus = lines.map((li) => li.price?.product?.metadata?.sku).filter(Boolean)
  const variants = skus.length ? await fetchVariants(skus) : []
  const bySku = Object.fromEntries(variants.map((v) => [v.sku, v]))
  const shipping = full.customer_shipping || null

  const order = await insertOrder({
    email: full.customer_email || 'unknown@unknown',
    status: 'paid',
    subtotal_cents: full.subtotal ?? 0,
    shipping_cents: 0,
    tax_cents: full.tax ?? 0,
    total_cents: full.amount_paid ?? full.total ?? 0,
    stripe_session_id: full.id,
    shipping_address: {
      name: shipping?.name || full.customer_name || null,
      address: shipping?.address || full.customer_address || null,
      phone: shipping?.phone || full.customer_phone || null,
      renewal_of: typeof full.subscription === 'string' ? full.subscription : full.subscription?.id || null,
    },
  })
  if (!order) return

  const items = lines
    .filter((li) => li.price?.product?.metadata?.sku)
    .map((li) => {
      const sku = li.price.product.metadata.sku
      return {
        order_id: order.id,
        variant_id: bySku[sku] ? bySku[sku].id : null,
        quantity: li.quantity ?? 1,
        unit_price_cents: li.price?.unit_amount ?? Math.round((li.amount ?? 0) / (li.quantity || 1)),
      }
    })
  if (items.length) await insertOrderItems(items)
}

function safeJson(s) {
  try {
    return s ? JSON.parse(s) : null
  } catch {
    return null
  }
}

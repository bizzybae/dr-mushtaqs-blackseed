// Vercel serverless function: first-lot waitlist with double opt-in.
//
//   POST /api/waitlist            { email, sku?, source?, website? }  -> { ok, status, confirmation_sent }
//   GET  /api/waitlist?confirm=<token>                                -> redirect /waitlist/confirmed
//   GET  /api/waitlist?unsubscribe=<token>                            -> redirect /waitlist/unsubscribed
//
// Insert uses the publishable key under the public-insert RLS policy, so it
// works before any service key is configured. Confirm and unsubscribe need
// SUPABASE_SERVICE_ROLE_KEY (there is no public select or update). Email goes
// through Resend when RESEND_API_KEY is set; otherwise the row is stored and
// the response says so, and the client shows the no-email success copy.

import { insertWaitlist, findWaitlistByToken, updateWaitlist } from './_lib/supabase.js'

export const config = { runtime: 'nodejs' }

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } })

// Soft per-instance rate limit: 5 submissions per IP per 10 minutes.
const hits = new Map()
function limited(ip) {
  const now = Date.now()
  const win = hits.get(ip)?.filter((t) => now - t < 10 * 60 * 1000) || []
  win.push(now)
  hits.set(ip, win)
  if (hits.size > 5000) hits.clear()
  return win.length > 5
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, message: 'Invalid request.' }, 400)
  }

  // Honeypot: bots fill the hidden field. Pretend success, store nothing.
  if (body?.website) return json({ ok: true, status: 'ignored', confirmation_sent: false })

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (limited(ip)) return json({ ok: false, message: 'Too many attempts. Please try again in a few minutes.' }, 429)

  const email = String(body?.email || '').trim().toLowerCase().slice(0, 254)
  if (!EMAIL.test(email)) return json({ ok: false, message: 'Please enter a valid email address.' }, 400)
  const sku = body?.sku ? String(body.sku).slice(0, 64) : null
  const source = String(body?.source || 'site').slice(0, 64)

  let row
  try {
    row = await insertWaitlist({ email, sku, source })
  } catch (err) {
    if (/23505|duplicate/i.test(String(err.message))) return json({ ok: true, status: 'duplicate', confirmation_sent: false }, 409)
    console.error('[waitlist] insert failed', err)
    return json({ ok: false, message: 'We could not save your email. Please try again.' }, 502)
  }

  const origin = siteOrigin(request)
  let sent = false
  if (row?.confirm_token) {
    sent = await sendConfirmation({ email, token: row.confirm_token, origin })
  }
  return json({ ok: true, status: 'saved', confirmation_sent: sent })
}

export async function GET(request) {
  const url = new URL(request.url)
  const confirm = url.searchParams.get('confirm')
  const unsub = url.searchParams.get('unsubscribe')
  const token = confirm || unsub
  const origin = siteOrigin(request)
  if (!token || !/^[0-9a-f-]{36}$/i.test(token)) return Response.redirect(`${origin}/waitlist/invalid`, 302)
  try {
    const row = await findWaitlistByToken(token)
    if (!row) return Response.redirect(`${origin}/waitlist/invalid`, 302)
    if (confirm) {
      await updateWaitlist(row.id, { confirmed: true, confirmed_at: new Date().toISOString(), unsubscribed_at: null })
      return Response.redirect(`${origin}/waitlist/confirmed`, 302)
    }
    await updateWaitlist(row.id, { unsubscribed_at: new Date().toISOString(), confirmed: false })
    return Response.redirect(`${origin}/waitlist/unsubscribed`, 302)
  } catch (err) {
    console.error('[waitlist] update failed', err)
    return Response.redirect(`${origin}/waitlist/error`, 302)
  }
}

async function sendConfirmation({ email, token, origin }) {
  const key = process.env.RESEND_API_KEY
  if (!key) return false
  const from = process.env.WAITLIST_FROM || 'Dr. Mushtaq’s <hello@drmushtaqs.com>'
  const confirmUrl = `${origin}/api/waitlist?confirm=${token}`
  const unsubUrl = `${origin}/api/waitlist?unsubscribe=${token}`
  const text = [
    'Please confirm your place on the first-lot list.',
    '',
    `Confirm: ${confirmUrl}`,
    '',
    'We will write once, the day the first lot ships, with its laboratory certificate attached. Nothing else until then.',
    '',
    `If this was not you, ignore this email or unsubscribe: ${unsubUrl}`,
    '',
    'Dr. Mushtaq’s',
  ].join('\n')
  const html = `<div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#171614">
    <p style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#bb8c4b;margin:0 0 16px">Dr. Mushtaq’s</p>
    <h1 style="font-size:28px;line-height:1.1;margin:0 0 20px">Confirm your place on the first-lot list.</h1>
    <p style="font-size:17px;line-height:1.6;margin:0 0 24px">We will write once, the day the first lot ships, with its laboratory certificate attached. Nothing else until then.</p>
    <p style="margin:0 0 32px"><a href="${confirmUrl}" style="display:inline-block;background:#171614;color:#f4f0e8;padding:14px 24px;text-decoration:none;font-family:monospace;font-size:12px;letter-spacing:.14em;text-transform:uppercase">Confirm my email</a></p>
    <p style="font-size:13px;line-height:1.6;color:#746e63;margin:0">If this was not you, ignore this email or <a href="${unsubUrl}" style="color:#746e63">unsubscribe</a>. Dr. Mushtaq does not provide medical services through this company.</p>
  </div>`
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [email],
        subject: 'Confirm your place on the first-lot list',
        text,
        html,
        headers: { 'List-Unsubscribe': `<${unsubUrl}>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' },
      }),
    })
    if (!res.ok) {
      console.error('[waitlist] resend error', res.status, await res.text())
      return false
    }
    return true
  } catch (err) {
    console.error('[waitlist] resend failed', err)
    return false
  }
}

function siteOrigin(request) {
  if (process.env.PUBLIC_SITE_URL) return process.env.PUBLIC_SITE_URL.replace(/\/+$/, '')
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || process.env.VERCEL_URL || 'dr-mushtaqs-blackseed.vercel.app'
  return `https://${host}`
}

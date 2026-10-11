// Minimal Supabase REST helpers for the serverless functions. No SDK needed.

const URL_ = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const ANON = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY

function headers(key) {
  return { apikey: key, Authorization: `Bearer ${key}`, 'content-type': 'application/json' }
}

async function rest(path, { method = 'GET', body, service = false, prefer } = {}) {
  if (!URL_) throw new Error('SUPABASE_URL is not set')
  const key = service ? SERVICE : ANON
  if (!key) throw new Error(service ? 'SUPABASE_SERVICE_ROLE_KEY is not set' : 'SUPABASE_PUBLISHABLE_KEY is not set')
  const res = await fetch(`${URL_}/rest/v1/${path}`, {
    method,
    headers: { ...headers(key), ...(prefer ? { Prefer: prefer } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(`Supabase ${method} ${path} -> ${res.status} ${await res.text()}`)
  if (res.status === 204 || res.status === 201) {
    const text = await res.text()
    return text ? JSON.parse(text) : null
  }
  return res.json()
}

export async function fetchVariants(skus) {
  const list = skus.map((s) => `"${s.replace(/"/g, '')}"`).join(',')
  return rest(
    `product_variants?sku=in.(${list})&select=id,sku,label,price_cents,description,image_storage_path,product:products!product_variants_product_id_fkey(name,slug,status,is_published,product_images(storage_path,sort_order))`
  )
}

// Waitlist: public insert under RLS; reads and updates need the service role.
// anon has INSERT only (no SELECT), so we generate the token here and ask for
// no representation back.
export async function insertWaitlist(row) {
  const confirm_token = crypto.randomUUID()
  await rest('waitlist', { method: 'POST', body: { ...row, confirm_token }, prefer: 'return=minimal' })
  return { confirm_token }
}
export async function findWaitlistByToken(token) {
  const rows = await rest(`waitlist?confirm_token=eq.${encodeURIComponent(token)}&select=id,email,confirmed`, { service: true })
  return rows?.[0] || null
}
export async function updateWaitlist(id, patch) {
  return rest(`waitlist?id=eq.${encodeURIComponent(id)}`, { method: 'PATCH', body: patch, service: true, prefer: 'return=minimal' })
}

export async function fetchSettings() {
  const rows = await rest('site_settings?select=key,value')
  return Object.fromEntries(rows.map((r) => [r.key, r.value]))
}

// Service-role writes used by the webhook.
export async function insertOrder(order) {
  const rows = await rest('orders', { method: 'POST', body: order, service: true, prefer: 'return=representation,resolution=ignore-duplicates' })
  return rows?.[0] || null
}

export async function insertOrderItems(items) {
  if (!items.length) return []
  return rest('order_items', { method: 'POST', body: items, service: true, prefer: 'return=representation' })
}

export async function updateOrderStatus(stripeSessionId, status) {
  return rest(`orders?stripe_session_id=eq.${encodeURIComponent(stripeSessionId)}`, {
    method: 'PATCH',
    body: { status },
    service: true,
    prefer: 'return=minimal',
  })
}

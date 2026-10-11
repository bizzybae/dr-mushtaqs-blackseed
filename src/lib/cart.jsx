import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { findVariant, useCatalog } from './catalog'

const KEY = 'dm-bag-v1'

function readStored() {
  try {
    const raw = window.localStorage.getItem(KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((i) => i && i.sku && i.qty > 0) : []
  } catch {
    return []
  }
}

function writeStored(items) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items))
  } catch {
    /* storage unavailable: bag lives in memory only */
  }
}

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { products, settings } = useCatalog()
  const [items, setItems] = useState(readStored) // [{ sku, qty }]
  const [open, setOpen] = useState(false)
  const [justAdded, setJustAdded] = useState(null)

  useEffect(() => writeStored(items), [items])

  const add = useCallback((sku, qty = 1) => {
    setItems((cur) => {
      const found = cur.find((i) => i.sku === sku)
      if (found) return cur.map((i) => (i.sku === sku ? { ...i, qty: i.qty + qty } : i))
      return [...cur, { sku, qty }]
    })
    setJustAdded(sku)
    setOpen(true)
  }, [])

  const setQty = useCallback((sku, qty) => {
    setItems((cur) => (qty <= 0 ? cur.filter((i) => i.sku !== sku) : cur.map((i) => (i.sku === sku ? { ...i, qty } : i))))
  }, [])

  const remove = useCallback((sku) => setItems((cur) => cur.filter((i) => i.sku !== sku)), [])
  const clear = useCallback(() => setItems([]), [])

  const lines = useMemo(
    () =>
      items
        .map((i) => {
          const hit = findVariant(products, i.sku)
          if (!hit) return null
          return { ...i, product: hit.product, variant: hit.variant, lineCents: hit.variant.priceCents * i.qty }
        })
        .filter(Boolean),
    [items, products]
  )

  const subtotalCents = lines.reduce((s, l) => s + l.lineCents, 0)
  const count = lines.reduce((s, l) => s + l.qty, 0)
  const threshold = Number(settings.free_shipping_threshold_cents ?? 15000)
  const flat = Number(settings.flat_shipping_cents ?? 900)
  const shippingCents = subtotalCents === 0 || subtotalCents >= threshold ? 0 : flat

  const value = useMemo(
    () => ({ items, lines, add, setQty, remove, clear, open, setOpen, count, subtotalCents, shippingCents, threshold, justAdded }),
    [items, lines, add, setQty, remove, clear, open, count, subtotalCents, shippingCents, threshold, justAdded]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}

// Build the payload /api/checkout expects and hand off to Stripe.
export async function startCheckout(lines, { subscribe = false } = {}) {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      items: lines.map((l) => ({ sku: l.sku, qty: l.qty })),
      subscribe: Boolean(subscribe),
      origin: window.location.origin,
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data.url) {
    const err = new Error(data.message || 'Checkout is unavailable right now.')
    err.code = data.error || 'checkout_failed'
    throw err
  }
  window.location.assign(data.url)
}

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductPhoto from './ProductPhoto'
import { money } from '../lib/catalog'
import { startCheckout, useCart } from '../lib/cart'

export default function CartDrawer() {
  const { open, setOpen, lines, setQty, remove, subtotalCents, shippingCents, threshold } = useCart()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, setOpen])

  async function checkout() {
    setBusy(true)
    setError(null)
    try {
      await startCheckout(lines)
    } catch (err) {
      setError(
        err.code === 'checkout_not_configured'
          ? 'Checkout is not open yet. Join the first-lot list in the footer and we will write the day it opens.'
          : err.message
      )
      setBusy(false)
    }
  }

  const remaining = Math.max(0, threshold - subtotalCents)
  const progress = Math.min(100, Math.round((subtotalCents / threshold) * 100))

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <button
        aria-label="Close bag"
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-ink/50 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        tabIndex={open ? 0 : -1}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your bag"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <h2 className="font-display text-2xl">Your bag</h2>
          <button onClick={() => setOpen(false)} className="font-mono text-[11px] uppercase tracking-[0.14em] hover:text-brass" data-testid="button-close-bag">
            Close
          </button>
        </div>

        {lines.length > 0 && (
          <div className="border-b border-ink/10 px-6 py-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted" data-testid="text-shipping-progress">
              {remaining > 0 ? `${money(remaining, { always: true })} away from complimentary shipping` : 'Complimentary shipping unlocked'}
            </p>
            <div className="mt-2 h-px w-full bg-ink/10">
              <div className="h-px bg-brass transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6">
          {lines.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-display text-xl">Your bag is empty.</p>
              <p className="mt-2 text-sm text-muted">Nothing here yet. Your future dropper awaits.</p>
              <Link to="/shop" onClick={() => setOpen(false)} className="btn btn-solid mt-8" data-testid="link-empty-shop">
                Shop by purpose
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-ink/10">
              {lines.map((l) => (
                <li key={l.sku} className="flex gap-4 py-5" data-testid={`row-bag-${l.sku}`}>
                  <Link to={`/shop/${l.product.slug}`} onClick={() => setOpen(false)} className="w-24 shrink-0 bg-sand">
                    <ProductPhoto slug={l.variant.image || l.product.image} fit="cover" ratio={1} sizes="96px" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <div>
                        <p className="font-display text-base leading-tight">{l.product.name}</p>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                          {l.variant.label}
                          {l.variant.format ? ` · ${l.variant.format}` : ''}
                        </p>
                      </div>
                      <p className="font-mono text-[12px]">{money(l.lineCents)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="inline-flex items-center border border-ink/20">
                        <button onClick={() => setQty(l.sku, l.qty - 1)} className="h-9 w-9 font-mono text-sm hover:bg-ink hover:text-cream" aria-label="Decrease quantity" data-testid={`button-dec-${l.sku}`}>
                          −
                        </button>
                        <span className="w-8 text-center font-mono text-[12px]" data-testid={`text-qty-${l.sku}`}>
                          {l.qty}
                        </span>
                        <button onClick={() => setQty(l.sku, l.qty + 1)} className="h-9 w-9 font-mono text-sm hover:bg-ink hover:text-cream" aria-label="Increase quantity" data-testid={`button-inc-${l.sku}`}>
                          +
                        </button>
                      </div>
                      <button onClick={() => remove(l.sku)} className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted hover:text-ink" data-testid={`button-remove-${l.sku}`}>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-ink/10 px-6 py-6">
            <dl className="space-y-2 font-mono text-[11px] uppercase tracking-[0.12em]">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd data-testid="text-subtotal">{money(subtotalCents, { always: true })}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Shipping</dt>
                <dd>{shippingCents === 0 ? 'Complimentary' : money(shippingCents, { always: true })}</dd>
              </div>
              <div className="flex justify-between border-t border-ink/10 pt-3 text-ink">
                <dt>Total</dt>
                <dd className="font-display text-xl normal-case tracking-normal" data-testid="text-total">
                  {money(subtotalCents + shippingCents, { always: true })}
                </dd>
              </div>
            </dl>
            {error && (
              <p className="mt-4 text-xs leading-relaxed text-ink/80" role="alert" data-testid="text-checkout-error">
                {error}
              </p>
            )}
            <button onClick={checkout} disabled={busy} className="btn btn-solid mt-5 w-full disabled:opacity-60" data-testid="button-checkout">
              {busy ? 'Opening secure checkout' : 'Checkout'}
            </button>
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Card, Apple Pay, Google Pay, Link · via Stripe</p>
          </div>
        )}
      </aside>
    </div>
  )
}

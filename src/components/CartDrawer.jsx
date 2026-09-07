export default function CartDrawer({ open, items, onClose, onClear }) {
  if (!open) {
    return null
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button aria-label="Close bag" onClick={onClose} className="flex-1 bg-ink/50" />
      <aside className="flex w-full max-w-sm flex-col overflow-y-auto bg-cream p-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl">Your bag</h2>
          <button onClick={onClose} className="font-mono text-[11px] uppercase tracking-[0.1em]">
            Close
          </button>
        </div>
        <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
          {items.length === 0 ? (
            <p className="py-6 text-sm text-muted">Your bag is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.slug} className="py-5">
                <p className="font-display text-lg">{item.name}</p>
                <div className="mt-1 flex justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                  <span>Quantity {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <p className="mt-5 flex justify-between font-display text-xl">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </p>
        )}
        <p className="mt-8 text-sm text-ink/70">
          Checkout is not enabled in this build. No payment, address, or account information is collected or stored.
        </p>
        <div className="mt-auto flex gap-4 pt-8">
          <button className="btn flex-1" onClick={onClear}>
            Clear bag
          </button>
          <button className="btn btn-solid flex-1 cursor-not-allowed opacity-60" disabled>
            Checkout
          </button>
        </div>
      </aside>
    </div>
  )
}

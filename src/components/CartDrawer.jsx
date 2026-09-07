export default function CartDrawer({ open, count, onClose, onClear }) {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button aria-label="Close bag" onClick={onClose} className="flex-1 bg-ink/50" />
      <aside className="flex w-full max-w-sm flex-col bg-cream p-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl">Your bag</h2>
          <button onClick={onClose} className="font-mono text-[11px] uppercase tracking-[0.1em]">
            Close
          </button>
        </div>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">Blackseed Oil</p>
        <p className="mt-1 font-display text-xl">Quantity {count}</p>
        <p className="mt-8 border-t border-ink/10 pt-6 text-sm text-ink/70">
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

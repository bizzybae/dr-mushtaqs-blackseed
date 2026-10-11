import { Link } from 'react-router-dom'
import { track } from '../lib/analytics'

// Renders only from a published batch row. If there is no published lot, it
// renders nothing: no "pending", no placeholder.
export default function BatchBadge({ batch, dark = false, className = '' }) {
  if (!batch?.lot_number) return null
  const tq = batch.thymoquinone_pct != null ? `${Number(batch.thymoquinone_pct).toFixed(2)}%` : null
  return (
    <p className={`font-mono text-[11px] uppercase tracking-[0.14em] ${dark ? 'text-cream/80' : 'text-ink/80'} ${className}`} data-testid={`badge-batch-${batch.lot_number}`}>
      Lot {batch.lot_number}
      {tq && <> · Thymoquinone {tq}</>}
      {' · '}
      <Link to={`/coa/${encodeURIComponent(batch.lot_number)}`} className="underline hover:text-brass" onClick={() => track('coa_opened', { lot: batch.lot_number, from: 'badge' })}>
        View lab report →
      </Link>
    </p>
  )
}

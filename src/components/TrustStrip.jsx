import { Link } from 'react-router-dom'
import { TRUST } from '../data/site'

export default function TrustStrip({ dark = false }) {
  const items = TRUST.filter((t) => t.label)
  if (!items.length) return null
  return (
    <ul className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-y px-4 py-5 font-mono text-[11px] uppercase tracking-[0.14em] ${dark ? 'border-cream/15 text-cream/80' : 'border-ink/10 text-ink/80'}`} data-testid="strip-trust">
      {items.map((t) => (
        <li key={t.label}>
          {t.external ? (
            <a href={t.to} className="normal-case tracking-normal hover:text-brass">
              {t.label}
            </a>
          ) : (
            <Link to={t.to} className="hover:text-brass">
              {t.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}

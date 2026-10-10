import { Link } from 'react-router-dom'
import { useSite } from '../lib/content'

export default function SafetyLine({ dark = false, className = '' }) {
  const { SAFETY_LINE } = useSite()
  return (
    <p className={`text-[13px] leading-relaxed ${dark ? 'text-cream/65' : 'text-ink/65'} ${className}`} data-testid="text-safety-line">
      {SAFETY_LINE}{' '}
      <Link to="/safety" className={`underline ${dark ? 'hover:text-cream' : 'hover:text-ink'}`}>
        Full safety info →
      </Link>
    </p>
  )
}

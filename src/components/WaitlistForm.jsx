import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { MICRO } from '../data/catalog'
import { track } from '../lib/analytics'

// Double opt-in waitlist. Submits to /api/waitlist which inserts the row and
// sends the confirmation email. Success only renders after the insert is
// confirmed by the server. Duplicate and error states are explicit.
export default function WaitlistForm({ sku = null, source = 'site', label = 'Join the first-lot list', dark = false, compact = false, onDone }) {
  const id = useId()
  const [email, setEmail] = useState('')
  const [hp, setHp] = useState('') // honeypot
  const [state, setState] = useState('idle') // idle | busy | done | duplicate | invalid | error
  const [message, setMessage] = useState('')

  async function submit(e) {
    e.preventDefault()
    if (state === 'busy') return
    const clean = email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      setState('invalid')
      return
    }
    setState('busy')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: clean, sku, source, website: hp }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.status === 409 || data.status === 'duplicate') {
        setState('duplicate')
        return
      }
      if (!res.ok || !data.ok) throw new Error(data.message || 'Could not save your email.')
      track('waitlist_submitted', { sku: sku || 'general', source })
      setState('done')
      setMessage(data.confirmation_sent ? MICRO.waitlistCheckInbox : MICRO.waitlistDone)
      setEmail('')
      onDone?.()
    } catch (err) {
      setMessage(err.message || 'Something went wrong. Please try again.')
      setState('error')
    }
  }

  const text = dark ? 'text-cream' : 'text-ink'
  const sub = dark ? 'text-cream/60' : 'text-muted'

  if (state === 'done') {
    return (
      <p className={`text-base leading-relaxed ${text}`} role="status" data-testid="text-waitlist-done">
        {message}
      </p>
    )
  }
  if (state === 'duplicate') {
    return (
      <p className={`text-base leading-relaxed ${text}`} role="status" data-testid="text-waitlist-duplicate">
        You are already on this list. We will write the day the lot ships.
      </p>
    )
  }

  return (
    <form onSubmit={submit} noValidate className={compact ? '' : 'max-w-md'} data-testid={`form-waitlist-${source}`}>
      <label htmlFor={`${id}-email`} className="eyebrow block">
        {label}
      </label>
      <div className={`mt-3 flex flex-col gap-3 sm:flex-row`}>
        <input
          id={`${id}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (state !== 'idle') setState('idle')
          }}
          placeholder="you@example.com"
          aria-invalid={state === 'invalid'}
          aria-describedby={`${id}-help`}
          className={`min-h-[48px] min-w-0 flex-1 border bg-transparent px-4 text-base outline-none placeholder:text-current/40 ${dark ? 'border-cream/40 text-cream' : 'border-ink/30 text-ink'} focus:border-brass`}
          data-testid="input-waitlist-email"
        />
        {/* Honeypot: hidden from people, filled by bots. */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} className="absolute left-[-9999px] h-px w-px opacity-0" aria-hidden="true" />
        <button type="submit" disabled={state === 'busy'} className={`btn min-h-[48px] ${dark ? 'border-cream text-cream hover:bg-cream hover:text-ink' : 'btn-solid'} disabled:opacity-60`} data-testid="button-waitlist-submit">
          {state === 'busy' ? 'Saving' : 'Notify me'}
        </button>
      </div>
      <p id={`${id}-help`} className={`mt-3 text-[13px] leading-relaxed ${state === 'invalid' || state === 'error' ? 'text-red-700' : sub}`} role={state === 'invalid' || state === 'error' ? 'alert' : undefined}>
        {state === 'invalid' ? 'Please enter a valid email address.' : state === 'error' ? message : (
          <>
            One confirmation email, then a note when the lot ships. Unsubscribe in one click.{' '}
            <Link to="/policies/privacy" className={`underline ${dark ? 'hover:text-cream' : 'hover:text-ink'}`}>
              Privacy
            </Link>
          </>
        )}
      </p>
    </form>
  )
}

// Compact "Notify me" that expands into the form in place.
export function NotifyButton({ sku, source, label = 'Notify me', className = 'btn flex-1' }) {
  const [open, setOpen] = useState(false)
  if (open) return <WaitlistForm sku={sku} source={source} label={label} compact />
  return (
    <button type="button" onClick={() => setOpen(true)} className={className} data-testid={`button-notify-${sku || source}`}>
      {label}
    </button>
  )
}

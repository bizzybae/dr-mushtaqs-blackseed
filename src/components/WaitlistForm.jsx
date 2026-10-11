import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { MICRO } from '../data/catalog'
import { INTERESTS } from '../data/site'
import { track } from '../lib/analytics'

// One list, many interests. Submits to /api/waitlist, which upserts one row per
// email and merges interest tags, then sends the confirmation email on first
// signup. Success only renders after the server confirms. Duplicate (already on
// the list; interests added) and error states are explicit.
//
//   interests  tags always attached to this signup (e.g. the product's collection)
//   options    interest keys offered as checkboxes under the email field
//   checked    option keys ticked by default
export default function WaitlistForm({
  sku = null,
  source = 'site',
  label = 'Join the first-lot list',
  dark = false,
  compact = false,
  interests = [],
  options = [],
  checked = [],
  onDone,
}) {
  const id = useId()
  const [email, setEmail] = useState('')
  const [hp, setHp] = useState('') // honeypot
  const [picked, setPicked] = useState(() => new Set(checked))
  const [state, setState] = useState('idle') // idle | busy | done | duplicate | invalid | error
  const [message, setMessage] = useState('')
  const shown = INTERESTS.filter((i) => options.includes(i.key))

  function toggle(key) {
    setPicked((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  async function submit(e) {
    e.preventDefault()
    if (state === 'busy') return
    const clean = email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      setState('invalid')
      return
    }
    const tags = [...new Set([...interests, ...picked])]
    setState('busy')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: clean, sku, source, interests: tags, website: hp }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.status === 409 || data.status === 'duplicate' || data.status === 'updated') {
        track('waitlist_updated', { source, interests: tags.join(',') })
        setState('duplicate')
        return
      }
      if (!res.ok || !data.ok) throw new Error(data.message || 'Could not save your email.')
      track('waitlist_submitted', { sku: sku || 'general', source, interests: tags.join(',') })
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
        You are already on the list; we have noted what you are interested in. We will write the day the lot ships.
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
      {shown.length > 0 && (
        <fieldset className="mt-4" data-testid="fieldset-interests">
          <legend className={`font-mono text-[10px] uppercase tracking-[0.16em] ${sub} ${shown.length === 1 ? 'sr-only' : ''}`}>Tell us what to write about</legend>
          <ul className={`${shown.length === 1 ? '' : 'mt-3'} grid gap-x-6 gap-y-3 ${shown.length > 2 ? 'sm:grid-cols-2' : ''}`}>
            {shown.map((o) => (
              <li key={o.key}>
                <label className={`flex cursor-pointer items-start gap-3 ${text}`}>
                  <input
                    type="checkbox"
                    checked={picked.has(o.key)}
                    onChange={() => toggle(o.key)}
                    className={`mt-1 h-4 w-4 shrink-0 accent-[#bb8c4b] ${dark ? 'border-cream/40' : 'border-ink/30'}`}
                    data-testid={`checkbox-interest-${o.key}`}
                  />
                  <span>
                    <span className="block text-base leading-snug">{o.label}</span>
                    <span className={`block text-[13px] leading-snug ${sub}`}>{o.note}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
      )}
      <p id={`${id}-help`} className={`${compact ? 'mt-2' : 'mt-3'} text-[13px] leading-relaxed ${state === 'invalid' || state === 'error' ? 'text-red-700' : sub}`} role={state === 'invalid' || state === 'error' ? 'alert' : undefined}>
        {state === 'invalid' ? 'Please enter a valid email address.' : state === 'error' ? message : (
          <>
            One list, one confirmation email, then a note when each thing you ticked is ready. Unsubscribe in one click.{' '}
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
export function NotifyButton({ sku, source, label = 'Notify me', className = 'btn flex-1', interests = [] }) {
  const [open, setOpen] = useState(false)
  if (open) return <WaitlistForm sku={sku} source={source} label={label} interests={interests} compact />
  return (
    <button type="button" onClick={() => setOpen(true)} className={className} data-testid={`button-notify-${sku || source}`}>
      {label}
    </button>
  )
}

import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Newsletter({ compact = false, source = 'site' }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle') // idle | busy | done | error

  async function submit(e) {
    e.preventDefault()
    if (!email || state === 'busy') return
    setState('busy')
    try {
      if (supabase) {
        const { error } = await supabase.from('subscribers').insert({ email: email.trim().toLowerCase(), source })
        if (error && error.code !== '23505') throw error
      }
      setState('done')
      setEmail('')
    } catch (err) {
      console.warn('[newsletter]', err?.message)
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <p className={`font-mono text-[11px] uppercase tracking-[0.12em] ${compact ? 'text-brass' : 'text-ink'}`} data-testid="text-newsletter-done">
        You are on the list. We write when a new lot is released.
      </p>
    )
  }

  return (
    <form onSubmit={submit} className={compact ? '' : 'max-w-md'}>
      <label htmlFor={`nl-${source}`} className={`block font-mono text-[10px] uppercase tracking-[0.2em] ${compact ? 'text-brass' : 'text-brass'}`}>
        Lot releases, by email
      </label>
      <div className={`mt-3 flex border-b ${compact ? 'border-cream/30' : 'border-ink/30'}`}>
        <input
          id={`nl-${source}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={`min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-current/40 ${compact ? 'text-cream' : 'text-ink'}`}
          data-testid="input-newsletter-email"
        />
        <button
          type="submit"
          disabled={state === 'busy'}
          className={`font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${compact ? 'text-cream hover:text-brass' : 'text-ink hover:text-brass'}`}
          data-testid="button-newsletter-submit"
        >
          {state === 'busy' ? 'Saving' : 'Join'}
        </button>
      </div>
      {state === 'error' && <p className="mt-2 text-xs text-red-700">Something went wrong. Please try again.</p>}
      <p className={`mt-3 text-[11px] leading-relaxed ${compact ? 'text-cream/50' : 'text-muted'}`}>A few notes a year. No discounts spam. Unsubscribe any time.</p>
    </form>
  )
}

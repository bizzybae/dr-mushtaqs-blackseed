import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setMessage(
      'Thank you. Nothing was stored. Connect a consent managed email provider before collecting real addresses.'
    )
    setEmail('')
  }

  return (
    <section className="section bg-brass text-ink">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/70">Stay in the know</p>
          <h2 className="h2 mt-4">New batches, clearly shared.</h2>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-[0.12em]">
            Email address
          </label>
          <div className="mt-2 flex border-b border-ink/50">
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full bg-transparent py-3 outline-none placeholder:text-ink/40"
            />
            <button type="submit" className="font-mono text-[11px] uppercase tracking-[0.12em]">
              Join
            </button>
          </div>
          <p className="mt-3 font-mono text-[10px] leading-relaxed" role="status">
            {message}
          </p>
        </form>
      </div>
    </section>
  )
}

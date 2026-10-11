// Renders nothing until real, approved reviews exist in the database.
export default function ReviewsSlot({ reviews = [], dark = false }) {
  const list = reviews.filter((r) => r && r.is_approved && r.body)
  if (!list.length) return null
  return (
    <section className={dark ? 'bg-ink text-cream' : ''} data-testid="section-reviews">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12">
        <p className="eyebrow">From customers</p>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((r, i) => (
            <li key={`${r.author_name}-${i}`} className={`border p-6 ${dark ? 'border-cream/15' : 'border-ink/10'}`}>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brass" aria-label={`${r.rating} out of 5`}>
                {'★'.repeat(r.rating)}
                {'☆'.repeat(5 - r.rating)}
              </p>
              {r.title && <p className="mt-3 font-display text-xl">{r.title}</p>}
              <p className={`mt-3 text-base leading-relaxed ${dark ? 'text-cream/75' : 'text-ink/75'}`}>{r.body}</p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                {r.author_name}
                {r.is_verified_buyer ? ' · Verified buyer' : ''}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

import { collection } from '../data/site.js'

export default function Collection() {
  return (
    <section id="collection" className="section">
      <p className="eyebrow">The collection ahead</p>
      <h2 className="h2 mt-4 max-w-2xl">Built around everyday care.</h2>
      <div className="mt-14 grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
        {collection.map((item) => (
          <article key={item.index} className="flex min-h-[220px] flex-col justify-between bg-cream p-8">
            <span className="font-mono text-[11px] text-brass">{item.index}</span>
            <div className="mt-10">
              <h3 className="font-display text-2xl">{item.name}</h3>
              <p className="mt-2 text-sm text-muted">{item.body}</p>
              <p className="mt-4 inline-block border border-ink/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em]">
                {item.status}
              </p>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-8 max-w-2xl font-mono text-[10px] leading-relaxed text-muted">
        Category concepts only. Every future item requires its own formulation, labeling, testing, and legal review
        before it can be offered for sale.
      </p>
    </section>
  )
}

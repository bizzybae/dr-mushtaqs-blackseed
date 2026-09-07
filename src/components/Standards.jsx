import { standards } from '../data/site.js'

export default function Standards() {
  return (
    <section id="standards" className="section bg-ink text-cream">
      <p className="eyebrow">A higher standard</p>
      <h2 className="h2 mt-4 max-w-2xl">What belongs on a label.</h2>
      <div className="mt-14 grid gap-10 md:grid-cols-3">
        {standards.map((item) => (
          <article key={item.index} className="border-t border-cream/20 pt-6">
            <span className="font-mono text-[11px] text-brass">{item.index}</span>
            <h3 className="mt-4 font-display text-2xl">{item.title}</h3>
            <p className="mt-3 text-cream/70">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

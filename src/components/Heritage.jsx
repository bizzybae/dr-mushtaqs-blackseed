import { hadith } from '../data/site.js'

export default function Heritage() {
  return (
    <section id="heritage" className="section bg-clay">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Sunnah and heritage</p>
          <h2 className="h2 mt-4">Honoring a tradition without turning it into a claim.</h2>
          <p className="mt-6 max-w-md text-ink/75">
            Black seed holds a meaningful place in Islamic tradition. The narration below is presented in full for
            heritage and education. It is not evidence for this product, not a product claim, and not medical advice.
          </p>
        </div>
        <figure className="border-l border-ink/30 pl-8">
          <blockquote className="font-display text-lg leading-relaxed text-ink/85">{hadith.narration}</blockquote>
          <figcaption className="mt-6 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/60">
            {hadith.reference}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

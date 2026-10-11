import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import WaitlistForm from '../components/WaitlistForm'
import { Accordion, SectionHead, Seo } from '../components/ui'
import { useSite } from '../lib/content'
import { isConcept, useCatalog } from '../lib/catalog'
import { INTERESTS, ROADMAP } from '../data/site'

// /coming-soon : the line in sequence. Phases, not a catalogue: Now / Next /
// Then / Later / Last, each naming its products as text, and one list with
// interest checkboxes at the end. No dates, no prices, no product cards.
export function ComingSoonPage() {
  const { products } = useCatalog()
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50)
  }, [hash, products.length])

  // Each product appears once, in the earliest phase that claims it.
  const used = new Set()
  const phases = ROADMAP.map((ph) => {
    const items = (ph.slugs ? ph.slugs.map((slug) => products.find((p) => p.slug === slug)).filter(Boolean) : products.filter((p) => ph.collections.includes(p.collection) && isConcept(p))).filter((p) => !used.has(p.slug))
    items.forEach((p) => used.add(p.slug))
    return { ...ph, items }
  }).filter((ph) => ph.items.length)

  return (
    <>
      <Seo title="What is next" description="The Dr. Mushtaq’s line arrives in order: the Original first, then the rest of Within, then Skin, Hair and Body, Fragrance and Sets. Each product opens when its formula is final and its first lot is tested." />
      <section className="border-b border-ink/10 bg-sand">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <p className="eyebrow">What is next</p>
          <h1 className="h1 mt-6">The line arrives in order.</h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/70">One product is at the laboratory. The rest are formulas, and we will not sell a formula. Each opens when its recipe is final and its first lot has been tested. Below is the order we are working in; leave your email once and tick what you want to hear about.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <ol className="divide-y divide-ink/10" data-testid="roadmap">
          {phases.map((ph, i) => (
            <li key={ph.key} id={ph.key} className="grid gap-6 py-12 scroll-mt-40 lg:grid-cols-12 lg:gap-10" data-testid={`roadmap-${ph.key}`}>
              <div className="lg:col-span-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brass">
                  {String(i + 1).padStart(2, '0')} · {ph.label}
                </p>
                <h2 className="mt-3 font-display text-3xl leading-tight">{ph.title}</h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-base leading-relaxed text-ink/75">{ph.body}</p>
              </div>
              <ul className="lg:col-span-4 flex flex-wrap gap-2">
                {ph.items.map((p) => (
                  <li key={p.slug} id={p.slug} className="scroll-mt-40">
                    <Link to={`/shop/${p.slug}`} className="inline-block border border-ink/15 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.1em] hover:border-ink hover:text-brass" data-testid={`link-roadmap-${p.slug}`}>
                      {p.name}
                      {p.status === 'prelaunch' && <span className="ml-2 text-brass">at the lab</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section id="list" className="border-t border-ink/10 bg-ink text-cream">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-24">
          <div className="lg:col-span-5">
            <p className="eyebrow">One list</p>
            <h2 className="h2 mt-4 text-cream">Tell us once.</h2>
            <p className="mt-4 text-lg leading-relaxed text-cream/70">One email address, one confirmation. We write when the Original ships, and then only about the things you tick, each time one of them is tested and ready.</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <WaitlistForm dark source="roadmap" label="Join the list" options={INTERESTS.map((i) => i.key)} checked={['within']} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12">
        <p className="text-base text-ink/70">
          Ready now:{' '}
          <Link to="/shop/blackseed-oil" className="underline hover:text-brass">
            the Original Blackseed Oil
          </Link>
          . Practitioners:{' '}
          <Link to="/practitioners" className="underline hover:text-brass">
            open an account
          </Link>
          .
        </p>
      </section>
    </>
  )
}

export function SafetyPage() {
  const { NO_MEDICAL_SERVICES, SAFETY_FAQ, SAFETY_LINE } = useSite()
  return (
    <>
      <Seo title="Safety" description="Who should check with a clinician before using Dr. Mushtaq’s products, what to do if you have a reaction, and what this site is and is not." />
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Safety</p>
            <h1 className="h1 mt-6">Read this first.</h1>
            <p className="mt-8 text-lg leading-relaxed text-ink/80" data-testid="text-safety-lede">
              {SAFETY_LINE}
            </p>
            <p className="mt-6 text-base leading-relaxed text-ink/70">{NO_MEDICAL_SERVICES} Everything on this site is general consumer information.</p>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={SAFETY_FAQ} defaultOpen={0} id="safety" />
            <p className="mt-10 text-base text-ink/70">
              Questions about a lot or a label? Write to{' '}
              <a href="mailto:hello@drmushtaqs.com" className="underline hover:text-brass">
                hello@drmushtaqs.com
              </a>{' '}
              with the lot number from the base of the bottle.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

// /heritage : culinary and cultural history plus the narration. No buy
// button on this page, and no founder or credential block.
export function HeritagePage() {
  const { HADITH, HERITAGE } = useSite()
  return (
    <>
      <Seo title="Heritage" description="Black seed has been pressed, eaten, and shared across the Middle East, North Africa, and South Asia for centuries. Its culinary and cultural story." />
      <section className="bg-sand">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
          <p className="eyebrow">Heritage</p>
          <h1 className="h1 mt-6">{HERITAGE.title}</h1>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="space-y-8 text-lg leading-relaxed text-ink/80">
          {HERITAGE.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? 'font-display text-2xl leading-snug text-ink' : ''}>
              {p}
            </p>
          ))}
        </div>
      </section>
      <section className="border-y border-ink/10 bg-sand">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 lg:py-24">
          <p className="eyebrow">The narration</p>
          <blockquote className="mt-8 font-display text-3xl italic leading-snug sm:text-4xl">{HADITH.narration}</blockquote>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{HADITH.attribution}</p>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-ink/60">{HADITH.note}</p>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <SectionHead eyebrow="Further reading" title="Where the names come from." />
        <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10 text-base text-ink/75">
          {(HERITAGE.names || []).map(([k, v]) => (
            <li key={k} className="grid grid-cols-3 gap-4 py-3">
              <span className="font-display text-lg text-ink">{k}</span>
              <span className="col-span-2">{v}</span>
            </li>
          ))}
        </ul>
        <p className="mt-10 font-mono text-[11px] leading-relaxed text-muted">Names and history are offered for interest. Nothing on this page is a product claim.</p>
      </section>
    </>
  )
}

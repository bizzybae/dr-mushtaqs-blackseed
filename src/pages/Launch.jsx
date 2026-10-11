import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ProductThumb } from '../components/ProductPhoto'
import { NotifyButton } from '../components/WaitlistForm'
import { Accordion, SectionHead, Seo } from '../components/ui'
import { useSite } from '../lib/content'
import { defaultVariant, useCatalog, useConceptProducts } from '../lib/catalog'

// /coming-soon : every concept, grouped by purpose. Name, format, one
// sensory line, Notify me. No prices, no internal notes.
export function ComingSoonPage() {
  const { products } = useConceptProducts()
  const { collections } = useCatalog()
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50)
  }, [hash, products.length])

  const groups = collections.map((c) => ({ ...c, items: products.filter((p) => p.collection === c.slug) })).filter((g) => g.items.length)

  return (
    <>
      <Seo title="Coming soon" description="The Dr. Mushtaq’s line as it comes off the press: skin, hair, body, fragrance, and ritual sets, each announced the day its first lot is tested." />
      <section className="border-b border-ink/10 bg-sand">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <p className="eyebrow">Coming soon</p>
          <h1 className="h1 mt-6">Next from the press.</h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/70">Everything here is in development. Each product opens when its formula is final and its first lot has been tested. Leave your email on anything you want to hear about and we will write once, the day it ships.</p>
        </div>
      </section>
      {groups.map((g) => (
        <section key={g.slug} className="mx-auto max-w-[1440px] border-b border-ink/10 px-5 py-16 sm:px-8 lg:px-12">
          <div className="flex items-baseline gap-4">
            <h2 className="font-display text-3xl">{g.name}</h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{g.short}</span>
          </div>
          <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {g.items.map((p) => (
              <li key={p.slug} id={p.slug} className="flex scroll-mt-40 flex-col" data-testid={`card-concept-${p.slug}`}>
                <Link to={`/shop/${p.slug}`} className="group block" aria-label={`${p.name}: what it is for and how to use it`}>
                  <ProductThumb product={p} ratio={1.1} sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw" imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none" />
                </Link>
                <h3 className="mt-5 font-display text-xl leading-tight">
                  <Link to={`/shop/${p.slug}`} className="hover:text-brass" data-testid={`link-concept-${p.slug}`}>
                    {p.name}
                  </Link>
                </h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{p.subtitle}</p>
                <p className="mb-5 mt-3 text-base leading-relaxed text-ink/70">{p.sensoryLine || p.tagline}</p>
                <div className="mt-auto">
                  <NotifyButton sku={defaultVariant(p).sku} source={`coming-soon-${p.slug}`} interests={[p.collection]} className="btn min-h-[48px] w-full" />
                  <Link to={`/shop/${p.slug}`} className="mt-3 block text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted hover:text-brass">
                    What it’s for and how to use it →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12">
        <p className="text-base text-ink/70">
          Ready now:{' '}
          <Link to="/shop/blackseed-oil" className="underline hover:text-brass">
            the Original Blackseed Oil
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

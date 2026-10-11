import { Link } from 'react-router-dom'
import ProductPhoto from '../components/ProductPhoto'
import ProductCard from '../components/ProductCard'
import BatchBadge from '../components/BatchBadge'
import ReviewsSlot from '../components/ReviewsSlot'
import TrustStrip from '../components/TrustStrip'
import WaitlistForm from '../components/WaitlistForm'
import { Accordion, GuaranteeStrip, PhysicianSeal, SectionHead, Seo } from '../components/ui'
import { JournalCard } from './Journal'
import { useSite } from '../lib/content'
import { defaultVariant, isConcept, money, useCatalog, useCurrentBatch, useSiteMode } from '../lib/catalog'

export default function Home() {
  const { FOUNDER, HOME, SITE_FAQ, JOURNAL } = useSite()
  const { products } = useCatalog()
  const mode = useSiteMode()
  const live = mode === 'live'
  const original = products.find((p) => p.slug === 'blackseed-oil') || products[0]
  const batch = useCurrentBatch(original)
  const concepts = products.filter(isConcept).filter((p) => p.productType !== 'bundle').slice(0, 4)
  const journal = JOURNAL.slice(0, 3)
  const subscribable = original.productType === 'supplement'
  const [ctaPrimary, ctaSecondary] = live ? HOME.cta.live : HOME.cta.prelaunch
  const reviews = products.flatMap((p) => p.reviews || [])

  return (
    <>
      <Seo description="Single-ingredient Nigella sativa oil, cold pressed and bottled in amber glass, with a published lab certificate for every lot." />

      {/* Hero */}
      <section className="relative bg-sand">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-12">
          <div className="order-2 flex flex-col justify-center px-5 py-14 sm:px-8 lg:order-1 lg:col-span-5 lg:px-12 lg:py-24">
            <p className="eyebrow">{batch ? HOME.eyebrowTested : HOME.eyebrow}</p>
            <h1 className="h1 mt-6">
              {HOME.h1[0]}
              <br />
              <span className="italic text-brass">{HOME.h1[1]}</span>
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/70">{HOME.sub}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              {live ? (
                <Link to={`/shop/${original.slug}`} className="btn btn-solid" data-testid="link-hero-shop">
                  {ctaPrimary} · {money(defaultVariant(original).priceCents)}
                </Link>
              ) : (
                <a href="#first-lot" className="btn btn-solid" data-testid="link-hero-waitlist">
                  {ctaPrimary}
                </a>
              )}
              <Link to="/coa" className="btn" data-testid="link-hero-coa">
                {ctaSecondary}
              </Link>
            </div>
            {batch && <BatchBadge batch={batch} className="mt-8" />}
          </div>
          <div className="relative order-1 lg:order-2 lg:col-span-7 lg:min-h-[640px]">
            <ProductPhoto slug="blackseed-oil" priority className="lg:absolute lg:inset-0" fit="cover" ratio={1.5} position="center 40%" sizes="(min-width: 1024px) 58vw, 100vw" imgClassName="lg:min-h-[640px]" />
          </div>
        </div>
      </section>

      {/* Value row */}
      <section className="border-b border-ink/10">
        <ul className="mx-auto grid max-w-[1440px] divide-y divide-ink/10 px-5 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-12" data-testid="row-values">
          {HOME.values.map(([t, b], i) => (
            <li key={t} className={`py-8 md:px-8 ${i === 0 ? 'md:pl-0' : ''} ${i === 2 ? 'md:pr-0' : ''}`}>
              <p className="font-display text-2xl">{t}</p>
              <p className="mt-2 text-base leading-relaxed text-ink/70">{b}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* The Seed: the plant before the product */}
      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28" data-testid="section-seed">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHead eyebrow={HOME.seed.eyebrow} title={HOME.seed.title} lede={HOME.seed.body} />
          </div>
          <div className="flex flex-wrap gap-4 lg:col-span-5 lg:justify-end">
            <Link to="/the-seed" className="btn btn-solid" data-testid="link-seed">
              {HOME.seed.cta[0]}
            </Link>
            <Link to="/coa" className="btn">
              {HOME.seed.cta[1]}
            </Link>
          </div>
        </div>
        <ol className="mt-14 grid gap-8 md:grid-cols-3" data-testid="list-seed-steps">
          {HOME.seed.steps.map(([img, t, b], i) => (
            <li key={img}>
              <Link to="/the-seed" className="group block" aria-label={`${t}: read about the seed`}>
                <ProductPhoto slug={img} fit="cover" ratio={1.3333} sizes="(min-width: 768px) 30vw, 100vw" className="bg-sand" imgClassName="transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none" />
              </Link>
              <p className="mt-6 font-mono text-[11px] text-brass">0{i + 1}</p>
              <h3 className="mt-2 font-display text-2xl">{t}</h3>
              <p className="mt-3 text-base leading-relaxed text-ink/70">{b}</p>
            </li>
          ))}
        </ol>
        <blockquote className="mt-14 border-l-2 border-brass pl-6 lg:ml-[33.333%] lg:w-2/3" data-testid="text-seed-founder-note">
          <p className="font-display text-xl leading-snug text-ink sm:text-2xl">{HOME.seed.founderNote}</p>
          <footer className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{FOUNDER.name}</footer>
        </blockquote>
      </section>

      {/* The Original */}
      <section className="border-t border-ink/10 bg-sand/40">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="eyebrow">The Original</p>
            <h2 className="h2 mt-4">{original.name}</h2>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{original.subtitle}</p>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">{original.short}</p>
            {original.sensory && <p className="mt-4 font-display text-xl italic leading-snug text-brass">{original.sensoryLine || original.sensory}</p>}
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-ink/10 pt-6">
              {original.variants.map((v) => (
                <div key={v.sku}>
                  <dt className="font-display text-xl">{v.label}</dt>
                  <dd className="mt-1 font-mono text-[12px]">{money(v.priceCents)}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to={`/shop/${original.slug}`} className="btn btn-solid" data-testid="link-original">
                {live ? 'Shop the Original' : 'See the Original'}
              </Link>
              <Link to="/coa" className="btn">
                How we test
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ProductPhoto slug="collection-flatlay" fit="cover" ratio={1.5} position="center 35%" sizes="(min-width: 1024px) 58vw, 100vw" />
          </div>
        </div>
        </div>
      </section>

      {/* Founder: the physician behind the label */}
      <section className="bg-ink text-cream" data-testid="section-founder">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-28">
          <div className="lg:col-span-6">
            {FOUNDER.portraitUrl ? (
              <div className="overflow-hidden bg-cream/5" style={{ aspectRatio: 1.45 }}>
                <img src={FOUNDER.portraitUrl} alt={FOUNDER.portraitAlt} className="h-full w-full object-cover" loading="lazy" decoding="async" data-testid="img-founder-portrait" />
              </div>
            ) : (
              <ProductPhoto slug="physician-desk" fit="cover" ratio={1.45} sizes="(min-width: 1024px) 50vw, 100vw" />
            )}
            <div className="mt-6 flex flex-wrap items-start justify-between gap-4 border-t border-cream/15 pt-5">
              <div>
                <p className="font-display text-2xl text-cream">{FOUNDER.name}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-cream/50">{FOUNDER.role}</p>
              </div>
              <ul className="max-w-xs space-y-1 font-mono text-[10px] uppercase tracking-[0.14em] text-cream/60 sm:text-right" data-testid="list-founder-credentials">
                {FOUNDER.credentials.slice(0, 2).map(([, v]) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col justify-center lg:col-span-5 lg:col-start-8">
            <PhysicianSeal className="h-24 w-24" dark />
            <p className="eyebrow mt-8 text-cream/60">The physician behind the label</p>
            <h2 className="h2 mt-4 text-cream">{HOME.founderTeaser.title}</h2>
            <p className="mt-6 font-display text-xl leading-snug text-cream/90 sm:text-2xl">{FOUNDER.why[0]}</p>
            <p className="mt-5 text-lg leading-relaxed text-cream/70">{HOME.founderTeaser.body}</p>
            <ul className="mt-6 space-y-3">
              {HOME.founderTeaser.points.map((pt) => (
                <li key={pt} className="flex gap-3 text-base text-cream/85">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brass" aria-hidden="true" />
                  {pt}
                </li>
              ))}
            </ul>
            <p className="mt-8 font-display text-3xl italic text-brass">Q. U. Mushtaq</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link to="/dr-mushtaq" className="btn self-start border-cream/40 text-cream hover:bg-cream hover:text-ink" data-testid="link-founder-page">
                Meet the founder
              </Link>
              <Link to="/coa" className="btn self-start border-cream/40 text-cream hover:bg-cream hover:text-ink" data-testid="link-founder-coa">
                What he tests
              </Link>
            </div>
            <p className="mt-8 font-mono text-[11px] leading-relaxed text-cream/50">{FOUNDER.noMedical} His statements are opinion, not medical advice.</p>
          </div>
        </div>
      </section>

      {/* Journal: the botanicals, one at a time */}
      {journal.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28" data-testid="section-journal">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead eyebrow={HOME.journalTeaser.eyebrow} title={HOME.journalTeaser.title} lede={HOME.journalTeaser.body} />
            <Link to="/journal" className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink hover:text-brass" data-testid="link-journal">
              {HOME.journalTeaser.cta} →
            </Link>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3">
            {journal.map((p) => (
              <JournalCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      {/* Coming soon preview */}
      {concepts.length > 0 && (
        <section className="border-y border-ink/10 bg-sand/60">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHead eyebrow="Coming to the shelf" title="Next from the press." />
              <Link to="/coming-soon" className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink hover:text-brass" data-testid="link-coming-soon">
                Everything coming soon →
              </Link>
            </div>
            <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {concepts.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} ratio={1.1} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Practitioners */}
      <section className="border-b border-ink/10" data-testid="section-practitioners">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:items-center lg:px-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Practitioners</p>
            <h2 className="h2 mt-3">{HOME.practitionerTeaser.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-ink/70">{HOME.practitionerTeaser.body}</p>
          </div>
          <ul className="space-y-2 lg:col-span-4">
            {HOME.practitionerTeaser.points.map((pt) => (
              <li key={pt} className="flex gap-3 text-base text-ink/85">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brass" aria-hidden="true" />
                {pt}
              </li>
            ))}
          </ul>
          <div className="lg:col-span-3 lg:text-right">
            <Link to="/practitioners" className="btn btn-solid" data-testid="link-practitioners-home">
              {HOME.practitionerTeaser.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* Heritage teaser */}
      <section className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 lg:py-24">
        <p className="eyebrow">Heritage</p>
        <h2 className="h2 mt-4">{HOME.heritageTeaser.title}</h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink/70">{HOME.heritageTeaser.body}</p>
        <Link to="/heritage" className="mt-8 inline-block font-mono text-[11px] uppercase tracking-[0.14em] hover:text-brass" data-testid="link-heritage">
          Read about its heritage →
        </Link>
      </section>

      {/* Who it's for */}
      <section className="border-t border-ink/10">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12">
          <p className="eyebrow">Who it is for</p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-testid="row-who-for">
            {HOME.whoFor.map(([t, b]) => (
              <li key={t} className="border border-ink/10 p-6">
                <p className="font-display text-2xl">{t}</p>
                <p className="mt-2 text-base leading-relaxed text-ink/70">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ReviewsSlot reviews={reviews} />

      {/* Questions + guarantee */}
      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <GuaranteeStrip />
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="Questions" title="Asked often." />
            <Link to="/faq" className="mt-8 inline-block font-mono text-[11px] uppercase tracking-[0.14em] hover:text-brass" data-testid="link-all-faq">
              All questions →
            </Link>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={[SITE_FAQ[0].items[0], SITE_FAQ[0].items[1], SITE_FAQ[2].items[0], SITE_FAQ[1].items[0]]} defaultOpen={0} id="home" />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="first-lot" className="bg-ink text-cream">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <h2 className="h2 text-cream">{live ? HOME.finalCta.live : HOME.finalCta.prelaunch}</h2>
              <p className="mt-4 text-lg text-cream/70">{live ? 'Every bottle ships with its lot certificate and the 60-Day Standard.' : 'The first lot ships the day its certificate is published. Be on the list when it does.'}</p>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              {live ? (
                <Link to={`/shop/${original.slug}`} className="btn border-cream text-cream hover:bg-cream hover:text-ink">
                  Shop the Original
                </Link>
              ) : (
                <WaitlistForm dark sku={defaultVariant(original).sku} source="home-final" label="Join the first-lot list" interests={[original.collection]} options={subscribable ? ['subscription'] : []} />
              )}
            </div>
          </div>
          <div className="mt-14">
            <TrustStrip dark />
          </div>
        </div>
      </section>
    </>
  )
}

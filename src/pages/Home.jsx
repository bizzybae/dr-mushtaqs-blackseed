import { Link } from 'react-router-dom'
import ProductPhoto from '../components/ProductPhoto'
import BatchBadge from '../components/BatchBadge'
import ReviewsSlot from '../components/ReviewsSlot'
import TrustStrip from '../components/TrustStrip'
import WaitlistForm from '../components/WaitlistForm'
import { Accordion, GuaranteeStrip, PhysicianSeal, SectionHead, Seo } from '../components/ui'
import { useSite } from '../lib/content'
import { defaultVariant, money, useCatalog, useCurrentBatch, useSiteMode } from '../lib/catalog'

export default function Home() {
  const { FOUNDER, HOME, SITE_FAQ } = useSite()
  const { products, settings } = useCatalog()
  const mode = useSiteMode()
  const live = mode === 'live'
  const original = products.find((p) => p.slug === 'blackseed-oil') || products[0]
  const batch = useCurrentBatch(original)
  const [ctaPrimary, ctaSecondary] = live ? HOME.cta.live : HOME.cta.prelaunch
  // Scarcity line renders only from a real number in site_settings; never a placeholder.
  const lotOne = Number(settings?.lot_one_bottles) > 0 ? HOME.lotOne.replace('{n}', Number(settings.lot_one_bottles).toLocaleString('en-US')) : null
  const credentials = (FOUNDER.credentials || []).slice(0, 4)
  const reviews = products.flatMap((p) => p.reviews || [])

  return (
    <>
      <Seo description="Single-ingredient Nigella sativa oil, cold pressed and bottled in amber glass, with a published lab certificate for every lot." />

      {/* Hero */}
      <section className="relative bg-sand">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-12">
          <div className="order-2 flex flex-col justify-center px-5 py-8 sm:px-8 lg:order-1 lg:col-span-5 lg:px-12 lg:py-10">
            <p className="eyebrow">{batch ? HOME.eyebrowTested : HOME.eyebrow}</p>
            <h1 className="mt-4 font-display text-[2.4rem] leading-[0.98] tracking-tight sm:text-6xl lg:text-[3.9rem] xl:text-[4.4rem]">
              {HOME.h1[0]}
              <br />
              <span className="italic text-brass">{HOME.h1[1]}</span>
            </h1>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink/70">{HOME.sub}</p>
            {live ? (
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to={`/shop/${original.slug}`} className="btn btn-solid" data-testid="link-hero-shop">
                  {ctaPrimary} · {money(defaultVariant(original).priceCents)}
                </Link>
                <Link to="/coa" className="btn" data-testid="link-hero-coa">
                  {ctaSecondary}
                </Link>
              </div>
            ) : (
              <div id="first-lot" className="mt-7 scroll-mt-32 border border-ink/15 bg-cream/70 p-5" data-testid="box-hero-waitlist">
                <WaitlistForm sku={defaultVariant(original).sku} source="home-hero" label={ctaPrimary} interests={['within']} options={['subscription']} compact />
                {lotOne && (
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-brass" data-testid="text-lot-one">
                    {lotOne}
                  </p>
                )}
                <p className="mt-3 text-[13px] leading-relaxed text-ink/60">
                  From {money(defaultVariant(original).priceCents)} for 125 mL. Nothing is charged until the lot has its certificate.{' '}
                  <Link to="/coa" className="underline hover:text-ink" data-testid="link-hero-coa">
                    {ctaSecondary}
                  </Link>
                </p>
              </div>
            )}
            {batch && <BatchBadge batch={batch} className="mt-8" />}
          </div>
          <div className="relative order-1 lg:order-2 lg:col-span-7 lg:min-h-[640px]">
            {/* Shorter crop on phones so the first-lot form sits within the first screen. */}
            <ProductPhoto slug="blackseed-oil" priority className="lg:hidden" fit="cover" ratio={1.9} position="center 45%" sizes="100vw" />
            <ProductPhoto slug="blackseed-oil" priority className="hidden lg:absolute lg:inset-0 lg:block" fit="cover" ratio={1.5} position="center 40%" sizes="(min-width: 1024px) 58vw, 100vw" imgClassName="lg:min-h-[640px]" />
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

      {/* The Original */}
      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
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
      </section>

      {/* Founder teaser */}
      <section className="bg-ink text-cream">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-28">
          <div className="lg:col-span-5">
            {FOUNDER.portraitUrl ? (
              <img src={FOUNDER.portraitUrl} alt={FOUNDER.portraitAlt} className="aspect-[4/5] w-full object-cover" loading="lazy" data-testid="img-founder-portrait" />
            ) : (
              <ProductPhoto slug="physician-desk" fit="cover" ratio={0.8} sizes="(min-width: 1024px) 42vw, 100vw" />
            )}
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-cream/15 pt-6" data-testid="list-founder-credentials">
              {credentials.map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-brass">{k}</dt>
                  <dd className="mt-1 text-sm leading-snug text-cream/80">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
            <div className="flex items-center gap-5">
              <PhysicianSeal className="h-20 w-20 shrink-0" dark />
              <div>
                <p className="font-display text-2xl text-cream">{FOUNDER.name}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-cream/60">{FOUNDER.role}</p>
              </div>
            </div>
            <h2 className="h2 mt-8 text-cream">{HOME.founderTeaser.title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/75">{FOUNDER.why?.[0] || HOME.founderTeaser.body}</p>
            <p className="mt-4 text-base leading-relaxed text-cream/70">{HOME.founderTeaser.body}</p>
            <p className="mt-6 font-display text-xl italic text-brass">{FOUNDER.lede}</p>
            <ul className="mt-6 space-y-3">
              {HOME.founderTeaser.points.map((pt) => (
                <li key={pt} className="flex gap-3 text-base text-cream/85">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brass" aria-hidden="true" />
                  {pt}
                </li>
              ))}
            </ul>
            <Link to="/dr-mushtaq" className="btn mt-8 self-start border-cream/40 text-cream hover:bg-cream hover:text-ink" data-testid="link-founder-page">
              Meet the founder →
            </Link>
            <p className="mt-8 font-mono text-[11px] leading-relaxed text-cream/50">{FOUNDER.noMedical} His statements are opinion, not medical advice.</p>
          </div>
        </div>
      </section>

      {/* What is next: a sentence and a link, not a catalogue */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="flex flex-col gap-6 border-y border-ink/10 py-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">What is next</p>
            <h2 className="h2 mt-4">{HOME.roadmapTeaser.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/70">{HOME.roadmapTeaser.body}</p>
          </div>
          <Link to="/coming-soon" className="btn shrink-0 self-start lg:self-center" data-testid="link-coming-soon">
            {HOME.roadmapTeaser.cta} →
          </Link>
        </div>
      </section>

      {/* Practitioners */}
      <section className="bg-sand" data-testid="band-practitioners">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-24">
          <div className="lg:col-span-5">
            <p className="eyebrow">Practitioners</p>
            <h2 className="h2 mt-4">{HOME.practitionerTeaser.title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">{HOME.practitionerTeaser.body}</p>
            <Link to="/practitioners" className="btn btn-solid mt-8" data-testid="link-practitioners-home">
              {HOME.practitionerTeaser.cta}
            </Link>
          </div>
          <ul className="grid gap-4 self-center sm:grid-cols-3 lg:col-span-7 lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-ink/10 lg:border-y lg:border-ink/10">
            {HOME.practitionerTeaser.points.map((pt, i) => (
              <li key={pt} className="flex gap-4 border border-ink/10 p-5 lg:border-0 lg:px-0 lg:py-5">
                <span className="font-mono text-[11px] text-brass">0{i + 1}</span>
                <p className="text-base leading-relaxed text-ink/80">{pt}</p>
              </li>
            ))}
          </ul>
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
                <WaitlistForm dark sku={defaultVariant(original).sku} source="home-final" label="Join the first-lot list" interests={['within']} options={['subscription', 'practitioner']} />
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

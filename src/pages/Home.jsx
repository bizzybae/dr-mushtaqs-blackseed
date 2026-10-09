import { Link } from 'react-router-dom'
import ProductPhoto, { ProductThumb } from '../components/ProductPhoto'
import ProductCard from '../components/ProductCard'
import { Accordion, GuaranteeStrip, LabelBadges, PhysicianSeal, SectionHead, Seo } from '../components/ui'
import { BOTANICALS } from '../data/catalog'
import { FOUNDER, HADITH, SITE_FAQ } from '../data/site'
import { defaultVariant, money, priceFrom, priceTo, useCatalog } from '../lib/catalog'

export default function Home() {
  const { products, collections } = useCatalog()
  const hero = products.find((p) => p.slug === 'blackseed-oil') || products[0]
  const bestsellers = products.filter((p) => p.bestseller || p.featured).filter((p) => p.productType !== 'bundle').slice(0, 6)
  const sets = products.filter((p) => p.collection === 'ritual-sets').slice(0, 4)
  const newest = products.filter((p) => p.isNew && p.productType !== 'bundle').slice(0, 3)
  const shopCollections = collections.filter((c) => c.slug !== 'ritual-sets')

  return (
    <>
      <Seo description="Physician-formulated blackseed, saffron, and grapevine botanicals for within, skin, hair, body, and fragrance. Single-origin, cold-pressed, lot-tested, standardized to 4.64% thymoquinone." />

      {/* Hero */}
      <section className="relative bg-sand">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-12">
          <div className="order-2 flex flex-col justify-center px-5 py-14 sm:px-8 lg:order-1 lg:col-span-5 lg:px-12 lg:py-24">
            <p className="eyebrow">Physician formulated · Single-origin botanicals</p>
            <h1 className="h1 mt-6">
              The molecule,
              <br />
              <span className="italic text-brass">not the myth.</span>
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/70">
              Blackseed, saffron, and grapevine, pressed cold from one harvest each, assayed by an independent laboratory, and formulated by a physician who prints the number instead of the promise.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to={`/shop/${hero.slug}`} className="btn btn-solid" data-testid="link-hero-shop">
                Shop the oil · {money(defaultVariant(hero).priceCents)}
              </Link>
              <Link to="/dr-mushtaq" className="btn" data-testid="link-hero-founder">
                Meet Dr. Mushtaq
              </Link>
            </div>
            <div className="mt-14 border-t border-ink/10 pt-8">
              <LabelBadges compact />
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <ProductPhoto slug="blackseed-oil" priority className="h-full" fit="cover" ratio={1.5} position="center 40%" sizes="(min-width: 1024px) 58vw, 100vw" imgClassName="lg:min-h-[640px]" />
          </div>
        </div>
      </section>

      {/* Shop by purpose */}
      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <SectionHead eyebrow="Shop by purpose" title="Five purposes. One standard." lede="Every line begins with the same cold-pressed Ethiopian blackseed oil. The botanicals change with the purpose: saffron for skin, amla for hair, sesame for the body, oud and rose for fragrance." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {shopCollections.map((c, i) => (
            <Link key={c.slug} to={`/collections/${c.slug}`} className={`group relative block overflow-hidden bg-sand ${i === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}`} data-testid={`link-collection-${c.slug}`}>
              <ProductPhoto slug={c.hero} fit="cover" ratio={i === 0 ? 1.05 : 1.1} className="h-full" sizes={i === 0 ? '(min-width: 1024px) 40vw, 100vw' : '(min-width: 1024px) 20vw, 50vw'} imgClassName="transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/55 to-transparent p-6 pt-28">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/75">{c.short}</p>
                <p className={`mt-1 font-display text-cream ${i === 0 ? 'text-4xl' : 'text-2xl'}`}>{c.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="border-y border-ink/10 bg-sand/60">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead eyebrow="Bestsellers" title="Where people begin." />
            <Link to="/shop" className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink hover:text-brass" data-testid="link-view-all">
              Shop everything →
            </Link>
          </div>
          <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {bestsellers.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} ratio={1.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Founder, TheraBreath-style */}
      <section className="bg-ink text-cream">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-28">
          <div className="lg:col-span-6">
            <ProductPhoto slug="physician-desk" fit="cover" ratio={1.45} sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div className="flex flex-col justify-center lg:col-span-5 lg:col-start-8">
            <PhysicianSeal className="h-28 w-28" dark />
            <p className="eyebrow mt-8">From the founder</p>
            <h2 className="h2 mt-4 text-cream">“{FOUNDER.lede}”</h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/70">{FOUNDER.short}</p>
            <p className="mt-6 font-display text-2xl italic text-brass">{FOUNDER.name}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-cream/50">{FOUNDER.role}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/dr-mushtaq" className="btn border-cream/40 text-cream hover:bg-cream hover:text-ink" data-testid="link-founder-page">
                The physician behind the label
              </Link>
              <Link to="/policies/guarantee" className="btn border-cream/40 text-cream hover:bg-cream hover:text-ink">
                The 60-Day Standard
              </Link>
            </div>
            <p className="mt-8 font-mono text-[10px] leading-relaxed text-cream/40">{FOUNDER.disclosure}</p>
          </div>
        </div>
      </section>

      {/* New */}
      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="New this season" title="Saffron, grapevine, rose." lede="Three botanicals join the blackseed base, each bought from one origin and assayed for its marker constituent." />
            <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
              {['saffron', 'grapevine', 'rose'].map((k) => {
                const b = BOTANICALS[k]
                return (
                  <li key={k} className="grid grid-cols-12 gap-3 py-4">
                    <p className="col-span-5 font-display text-lg">{b.name}</p>
                    <p className="col-span-7 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-muted">
                      {b.latin} · {b.origin}
                    </p>
                  </li>
                )
              })}
            </ul>
            <Link to="/botanicals" className="mt-8 inline-block font-mono text-[11px] uppercase tracking-[0.14em] hover:text-brass" data-testid="link-botanicals">
              The full materia medica →
            </Link>
          </div>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-3 lg:col-span-8">
            {newest.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} ratio={1} />
            ))}
          </div>
        </div>
      </section>

      {/* Sets */}
      <section className="bg-sand">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead eyebrow="Save with sets" title="Routines, priced below their parts." />
            <Link to="/collections/ritual-sets" className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink hover:text-brass">
              All ritual sets →
            </Link>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sets.map((p) => {
              const v = defaultVariant(p)
              const save = v.compareAtCents ? Math.round((1 - v.priceCents / v.compareAtCents) * 100) : 0
              return (
                <Link key={p.slug} to={`/shop/${p.slug}`} className="group block bg-cream p-4" data-testid={`link-set-${p.slug}`}>
                  <ProductThumb product={p} ratio={1.2} sizes="(min-width: 1024px) 25vw, 50vw" imgClassName="transition-transform duration-700 group-hover:scale-[1.03]" />
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-lg leading-tight group-hover:text-brass">{p.name}</p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{p.subtitle}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-[12px]">{money(v.priceCents)}</p>
                      {save > 0 && <p className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.12em] text-brass">Save {save}%</p>}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Standard statement */}
      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Our standard</p>
            <h2 className="h2 mt-4">
              One number per botanical,
              <br />
              printed where you can see it.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">
              Thymoquinone in blackseed oil. Crocin and safranal in saffron. Total stilbenes in grapevine. We assay the marker constituent of each botanical on every lot, publish the certificate, and make no other claim on the bottle.
            </p>
            <Link to="/science" className="btn mt-10" data-testid="link-standard-science">
              Read the method
            </Link>
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <ProductPhoto slug="collection-flatlay" fit="cover" ratio={1.6} position="center 35%" sizes="(min-width: 1024px) 55vw, 100vw" />
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-ink/10 pt-8">
              {[
                ['4.64%', 'Thymoquinone by HPLC'],
                ['< 40 °C', 'Press temperature'],
                ['1 origin', 'Per botanical, one harvest per lot'],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-3xl text-brass sm:text-4xl">{n}</dt>
                  <dd className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Heritage */}
      <section className="border-y border-ink/10 bg-sand">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 lg:py-24">
          <p className="eyebrow">Heritage</p>
          <blockquote className="mt-8 font-display text-3xl italic leading-snug sm:text-4xl">{HADITH.narration}</blockquote>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{HADITH.attribution}</p>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-ink/60">{HADITH.note}</p>
        </div>
      </section>

      {/* FAQ excerpt + guarantee */}
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
            <Accordion items={[SITE_FAQ[0].items[0], SITE_FAQ[0].items[1], SITE_FAQ[1].items[0], SITE_FAQ[2].items[2]]} defaultOpen={0} id="home" />
          </div>
        </div>
      </section>
    </>
  )
}

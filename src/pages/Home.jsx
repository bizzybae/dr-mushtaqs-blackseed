import { Link } from 'react-router-dom'
import ProductPhoto from '../components/ProductPhoto'
import ProductCard from '../components/ProductCard'
import { Accordion, LabelBadges, SectionHead, Seo } from '../components/ui'
import { Mark } from '../components/Logo'
import { PROTOCOL } from '../data/catalog'
import { FOUNDER, HADITH, SITE_FAQ } from '../data/site'
import { defaultVariant, money, useCatalog } from '../lib/catalog'

export default function Home() {
  const { products } = useCatalog()
  const hero = products.find((p) => p.slug === 'blackseed-oil') || products[0]

  return (
    <>
      <Seo description="Single-origin Ethiopian Nigella sativa, cold-pressed and standardized to 4.64% thymoquinone. Five products, one oil, one number on the label." />

      {/* Hero */}
      <section className="relative bg-sand">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-12">
          <div className="order-2 flex flex-col justify-center px-5 py-14 sm:px-8 lg:order-1 lg:col-span-5 lg:px-12 lg:py-24">
            <p className="eyebrow">Ethiopian Nigella sativa · Cold-pressed</p>
            <h1 className="h1 mt-6">
              The molecule,
              <br />
              <span className="italic text-brass">not the myth.</span>
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/70">
              Most blackseed oil is sold on folklore. Ours is sold on a number. Every lot is tested and released at 4.64% thymoquinone, and we print it on the bottle.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to={`/shop/${hero.slug}`} className="btn btn-solid" data-testid="link-hero-shop">
                Shop the oil · {money(defaultVariant(hero).priceCents)}
              </Link>
              <Link to="/science" className="btn" data-testid="link-hero-science">
                Why 4.64%
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

      {/* The five */}
      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28" id="shop">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead eyebrow="The collection" title="Five products. One oil." lede="Everything we make begins with the same single-origin pressing. The format changes to suit the moment; the oil does not." />
          <Link to="/shop" className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink hover:text-brass" data-testid="link-view-all">
            View all five →
          </Link>
        </div>
        <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} ratio={1.1} />
          ))}
        </div>
        <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:mx-auto lg:w-2/3">
          {products.slice(3, 5).map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i + 3} ratio={1.1} />
          ))}
        </div>
      </section>

      {/* Standard statement */}
      <section className="bg-ink text-cream">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-28">
          <div className="lg:col-span-5">
            <p className="eyebrow">Our standard</p>
            <h2 className="h2 mt-4 text-cream">
              One number,
              <br />
              printed where you can see it.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/70">
              Thymoquinone is the constituent of Nigella sativa oil most worth measuring. We measure it by HPLC on every lot, release the oil at 4.64%, and print the result on the label. No other claim on the bottle, because no other claim is needed.
            </p>
            <Link to="/science" className="btn mt-10 border-cream/40 text-cream hover:bg-cream hover:text-ink" data-testid="link-standard-science">
              Read the method
            </Link>
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <ProductPhoto slug="collection-flatlay" fit="cover" ratio={1.6} position="center 35%" sizes="(min-width: 1024px) 55vw, 100vw" />
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-cream/15 pt-8">
              {[
                ['4.64%', 'Thymoquinone by HPLC'],
                ['< 40 °C', 'Press temperature'],
                ['1 origin', 'Ethiopian seed, one harvest per lot'],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-3xl text-brass sm:text-4xl">{n}</dt>
                  <dd className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-cream/60">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Protocol */}
      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <SectionHead eyebrow="Your protocol" title="A day with the five." lede="How the formats fit together. Pick one, or build the whole shelf." />
        <ol className="mt-14 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-5">
          {PROTOCOL.map((step) => {
            const p = products.find((x) => x.slug === step.product)
            if (!p) return null
            return (
              <li key={step.step} className="bg-cream">
                <Link to={`/shop/${p.slug}`} className="group block h-full p-6" data-testid={`link-protocol-${p.slug}`}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[10px] text-brass">{step.step}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{step.time}</span>
                  </div>
                  <ProductPhoto slug={p.image} fit="cover" ratio={1} className="mt-5 bg-sand" sizes="(min-width: 1024px) 20vw, 50vw" imgClassName="transition-transform duration-700 group-hover:scale-[1.03]" />
                  <p className="mt-5 font-display text-lg leading-tight group-hover:text-brass">{p.name}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink/65">{step.note}</p>
                </Link>
              </li>
            )
          })}
        </ol>
      </section>

      {/* Gift presentation */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-20">
          <div className="lg:col-span-7">
            <ProductPhoto slug="collection-gift-set" fit="cover" ratio={1.7} sizes="(min-width: 1024px) 58vw, 100vw" />
          </div>
          <div className="lg:col-span-5 lg:pl-8">
            <p className="eyebrow">Travel Ritual</p>
            <h2 className="h2 mt-4">Five vials, one box.</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">
              The oil in five 10 mL vials, seated in a walnut stand inside a rigid black and gold box. For travel, for gifting, or for a first trial before committing to the full bottle.
            </p>
            <Link to="/shop/blackseed-oil?variant=DM-BSO-TR5" className="btn btn-solid mt-8" data-testid="link-travel-ritual">
              Shop the Travel Ritual
            </Link>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Mark className="h-16 w-16 text-brass" />
            <p className="eyebrow mt-8">The founder</p>
            <h2 className="h2 mt-4">{FOUNDER.name}</h2>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Family medicine · Myrtle Beach, SC</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="font-display text-2xl leading-snug sm:text-3xl">{FOUNDER.short}</p>
            <Link to="/story" className="btn mt-10" data-testid="link-founder-story">
              Our story
            </Link>
            <p className="mt-10 max-w-2xl font-mono text-[10px] leading-relaxed text-muted">{FOUNDER.disclaimer}</p>
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

      {/* FAQ excerpt */}
      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="Questions" title="Asked often." />
            <Link to="/faq" className="mt-8 inline-block font-mono text-[11px] uppercase tracking-[0.14em] hover:text-brass" data-testid="link-all-faq">
              All questions →
            </Link>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={[...SITE_FAQ[0].items.slice(0, 3), SITE_FAQ[1].items[1]]} defaultOpen={0} id="home" />
          </div>
        </div>
      </section>
    </>
  )
}

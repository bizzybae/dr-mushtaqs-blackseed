import { Link } from 'react-router-dom'
import ProductPhoto from '../components/ProductPhoto'
import { JournalCard } from './Journal'
import { PhysicianSeal, SectionHead, Seo } from '../components/ui'
import { useSite } from '../lib/content'
import { useCatalog } from '../lib/catalog'

// /the-seed: the cornerstone page. The plant before the product: botany,
// names, harvest, the press, and what the certificate measures. Educational
// only; the shop is one link away, never on this page.
const FACTS = [
  ['Family', 'Ranunculaceae, the buttercups'],
  ['Habit', 'Annual herb, 20 to 30 cm'],
  ['Native range', 'Romania to western and south-western Iran'],
  ['Flower', 'Pale blue to white, five to ten petals, one per stem'],
  ['Fruit', 'A horned capsule of fused follicles'],
  ['Seed', 'Matte black, angular, about 3 mm'],
  ['Part used', 'Seed, cold-pressed below 40 °C'],
  ['Measured per lot', 'Thymoquinone, fatty acids, peroxide, metals, microbes'],
]

const NAMES = [
  ['Kalonji', 'Hindi, Urdu'],
  ['Habbat al-sauda', 'Arabic'],
  ['Çörek otu', 'Turkish'],
  ['Siyah daneh', 'Persian'],
  ['Black cumin, black caraway', 'English (related to neither)'],
  ['Melanthion', 'Greek, classical'],
  ['Hei zhong cao zi', 'Chinese materia medica'],
]

const SEASON = [
  ['Sow', 'Early spring, from seed, in open ground. Nigella does not transplant well, so it is sown where it will grow.'],
  ['Flower', 'Early summer. The flower lasts a few days; the stamens shed and the follicles begin to swell into the capsule.'],
  ['Dry', 'Late summer. The capsule turns from green to straw and papery on the plant while the seed inside hardens and blackens.'],
  ['Harvest', 'When the capsule is dry and before it splits. Plants are cut, dried further, and threshed; the seed is cleaned and stored dry and dark.'],
  ['Press', 'Cold, below 40 °C, in small runs. The cake is discarded; the oil settles, is filtered, and goes to the laboratory before it is bottled.'],
]

export default function SeedPage() {
  const { HOME, FOUNDER, JOURNAL } = useSite()
  const { products } = useCatalog()
  const original = products.find((p) => p.slug === 'blackseed-oil')
  const seedPosts = JOURNAL.filter((p) => p.botanical === 'blackseed' || p.slug === 'how-to-read-a-lot-certificate').slice(0, 2)
  const seed = HOME.seed

  return (
    <>
      <Seo title="The Seed: Nigella sativa" description="Nigella sativa, from flower to oil: the plant, its names, how it is grown and harvested, how we press it, and what we measure on every lot." image="/products/seed-flower.jpg" />

      {/* Hero: the flower, not the bottle */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-12">
          <div className="order-2 flex flex-col justify-center px-5 py-14 sm:px-8 lg:order-1 lg:col-span-5 lg:px-12 lg:py-24">
            <p className="eyebrow">{seed.eyebrow} · The plant</p>
            <h1 className="h1 mt-6">
              One seed.
              <br />
              <span className="italic text-brass">Every bottle.</span>
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/70">{seed.body}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#from-flower-to-oil" className="btn btn-solid" data-testid="link-seed-steps">
                From flower to oil
              </a>
              <Link to="/coa" className="btn" data-testid="link-seed-coa">
                What we measure
              </Link>
            </div>
          </div>
          <div className="relative order-1 lg:order-2 lg:col-span-7 lg:min-h-[600px]">
            <ProductPhoto slug="seed-flower" priority className="lg:absolute lg:inset-0" fit="cover" ratio={1.4} position="center 55%" sizes="(min-width: 1024px) 58vw, 100vw" imgClassName="lg:min-h-[600px]" />
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="border-b border-ink/10">
        <dl className="mx-auto grid max-w-[1440px] gap-x-8 gap-y-6 px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12" data-testid="list-seed-facts">
          {FACTS.map(([k, v]) => (
            <div key={k} className="border-l border-ink/15 pl-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{k}</dt>
              <dd className="mt-1 text-base leading-snug text-ink/85">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* From flower to oil */}
      <section id="from-flower-to-oil" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <SectionHead eyebrow="From flower to oil" title="Three things to recognise." lede="If you can picture these three, you know the plant better than most labels assume you do." />
        <ol className="mt-14 grid gap-10 lg:grid-cols-3" data-testid="list-seed-steps">
          {seed.steps.map(([img, t, b], i) => (
            <li key={img}>
              <ProductPhoto slug={img} fit="cover" ratio={1.3333} sizes="(min-width: 1024px) 30vw, 100vw" />
              <p className="mt-6 font-mono text-[11px] text-brass">0{i + 1}</p>
              <h3 className="mt-2 font-display text-2xl">{t}</h3>
              <p className="mt-3 text-base leading-relaxed text-ink/70">{b}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Names */}
      <section className="border-y border-ink/10 bg-sand">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-28">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="Names" title="One plant, many kitchens." lede="The names mark where it has been kept beside the salt. None of them is cumin; none of them is caraway." />
            <Link to="/heritage" className="mt-8 inline-block font-mono text-[11px] uppercase tracking-[0.14em] hover:text-brass" data-testid="link-seed-heritage">
              Read its heritage →
            </Link>
          </div>
          <dl className="divide-y divide-ink/10 border-y border-ink/10 lg:col-span-7 lg:col-start-6" data-testid="list-seed-names">
            {NAMES.map(([n, l]) => (
              <div key={n} className="grid grid-cols-12 gap-4 py-4">
                <dt className="col-span-7 font-display text-xl sm:col-span-6">{n}</dt>
                <dd className="col-span-5 text-sm leading-relaxed text-ink/70 sm:col-span-6">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* A season */}
      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <SectionHead eyebrow="A season" title="Sown in spring, pressed in autumn." />
        <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-5" data-testid="list-seed-season">
          {SEASON.map(([t, b], i) => (
            <li key={t} className="border border-ink/10 p-6">
              <span className="font-mono text-[11px] text-brass">0{i + 1}</span>
              <p className="mt-4 font-display text-xl">{t}</p>
              <p className="mt-3 text-base leading-relaxed text-ink/70">{b}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Founder note */}
      <section className="bg-ink text-cream">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-24">
          <div className="lg:col-span-5">
            <ProductPhoto slug="seed-oil" fit="cover" ratio={1.3333} sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
          <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
            <PhysicianSeal className="h-20 w-20" dark />
            <p className="eyebrow mt-8 text-cream/60">Why the plant comes first</p>
            <p className="mt-6 font-display text-2xl leading-snug text-cream sm:text-3xl">{seed.founderNote}</p>
            <p className="mt-8 font-display text-3xl italic text-brass">Q. U. Mushtaq</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-cream/50">{FOUNDER.name}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/dr-mushtaq" className="btn border-cream/40 text-cream hover:bg-cream hover:text-ink" data-testid="link-seed-founder">
                Meet the founder
              </Link>
              <Link to="/science" className="btn border-cream/40 text-cream hover:bg-cream hover:text-ink" data-testid="link-seed-science">
                The molecule
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Journal entries about the seed */}
      {seedPosts.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead eyebrow="From the Journal" title="Read further." />
            <Link to="/journal" className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink hover:text-brass" data-testid="link-seed-journal">
              All entries →
            </Link>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2">
            {seedPosts.map((p) => (
              <JournalCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      {/* One link to the product */}
      {original && (
        <section className="border-t border-ink/10 bg-sand">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-14 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
            <div>
              <p className="eyebrow">The Original</p>
              <p className="mt-3 font-display text-2xl">This seed, pressed cold, in amber glass, with its certificate.</p>
            </div>
            <Link to={`/shop/${original.slug}`} className="btn btn-solid self-start lg:self-auto" data-testid="link-seed-original">
              See the Original
            </Link>
          </div>
        </section>
      )}
    </>
  )
}

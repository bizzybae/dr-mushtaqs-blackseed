import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import ProductPhoto from '../components/ProductPhoto'
import { GuaranteeStrip, LabelBadges, Seo } from '../components/ui'
import { BOTANICALS } from '../data/catalog'
import { useCatalog, useCollection } from '../lib/catalog'
import NotFound from './NotFound'

// /shop : everything, filterable by purpose
export default function Shop() {
  const { products, collections } = useCatalog()
  const [filter, setFilter] = useState('all')
  const shown = filter === 'all' ? products : products.filter((p) => p.collection === filter)

  return (
    <>
      <Seo title="Shop all" description="Every Dr. Mushtaq’s product across Within, Skin, Hair, Body, Fragrance and Ritual Sets. Physician formulated, single-origin, lot-tested." />
      <section className="border-b border-ink/10 bg-sand">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-20">
          <div className="lg:col-span-6">
            <p className="eyebrow">The collection</p>
            <h1 className="h1 mt-6">Everything we make.</h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/70">
              {products.length} products across five purposes, every one built on the same cold-pressed, 4.64% thymoquinone blackseed oil. Two or three sizes each; the larger sizes cost less per millilitre.
            </p>
            <div className="mt-10">
              <LabelBadges compact />
            </div>
          </div>
          <div className="lg:col-span-6">
            <ProductPhoto slug="collection-flatlay" fit="cover" ratio={1.6} position="center 40%" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="flex flex-wrap items-center gap-2 border-b border-ink/10 pb-6" role="group" aria-label="Filter by purpose">
          {[{ slug: 'all', name: 'All' }, ...collections].map((c) => (
            <button key={c.slug} onClick={() => setFilter(c.slug)} aria-pressed={filter === c.slug} className={`px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors sm:px-4 ${filter === c.slug ? 'bg-ink text-cream' : 'hover:text-brass'}`} data-testid={`button-filter-${c.slug}`}>
              {c.name}
            </button>
          ))}
          <p className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-muted" data-testid="text-shop-count">
            {shown.length} of {products.length}
          </p>
        </div>
        <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} ratio={1.1} priority={i < 4} />
          ))}
        </div>
      </section>
    </>
  )
}

// /collections/:slug : one purpose, grouped by step
export function CollectionPage() {
  const { slug } = useParams()
  const { collection, products, loading } = useCollection(slug)
  const { collections } = useCatalog()
  if (!collection) return loading ? <div className="min-h-[60vh]" /> : <NotFound />

  const steps = collection.steps?.length ? collection.steps : [...new Set(products.map((p) => p.step))]
  const botanicals = [...new Set(products.flatMap((p) => p.botanicals || []))].filter((k) => BOTANICALS[k]).slice(0, 6)
  const others = collections.filter((c) => c.slug !== slug)

  return (
    <>
      <Seo title={collection.name} description={collection.description} image={`/products/${collection.hero}.jpg`} />
      <section className="border-b border-ink/10 bg-sand">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-20">
          <div className="lg:col-span-5">
            <nav aria-label="Breadcrumb" className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              <Link to="/shop" className="hover:text-ink">
                Shop
              </Link>{' '}
              / <span className="text-ink">{collection.name}</span>
            </nav>
            <p className="eyebrow mt-8">{collection.short}</p>
            <h1 className="h1 mt-4">{collection.name}</h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/70">{collection.description}</p>
            {steps.length > 0 && (
              <ol className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                {steps.map((s, i) => (
                  <li key={s} className="font-mono text-[10px] uppercase tracking-[0.16em]">
                    <span className="text-brass">0{i + 1}</span> <span className="ml-2">{s}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
          <div className="lg:col-span-7">
            <ProductPhoto slug={collection.hero} fit="cover" ratio={1.6} priority sizes="(min-width: 1024px) 58vw, 100vw" />
          </div>
        </div>
      </section>

      {steps.map((step, si) => {
        const group = products.filter((p) => p.step === step)
        if (!group.length) return null
        return (
          <section key={step} className={`mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 ${si > 0 ? 'border-t border-ink/10' : ''}`}>
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[11px] text-brass">0{si + 1}</span>
              <h2 className="font-display text-3xl">{step}</h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                {group.length} {group.length === 1 ? 'product' : 'products'}
              </span>
            </div>
            <div className={`mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 ${group.length > 2 ? 'lg:grid-cols-3 xl:grid-cols-4' : 'lg:grid-cols-2'}`}>
              {group.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={products.indexOf(p)} ratio={group.length > 2 ? 1.1 : 1.5} priority={si === 0 && i < 4} showStep={false} />
              ))}
            </div>
          </section>
        )
      })}

      {botanicals.length > 0 && (
        <section className="border-t border-ink/10 bg-sand">
          <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">In this line</p>
                <h2 className="h2 mt-3">The botanicals.</h2>
              </div>
              <Link to="/botanicals" className="font-mono text-[11px] uppercase tracking-[0.14em] hover:text-brass">
                Full materia medica →
              </Link>
            </div>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {botanicals.map((k) => {
                const b = BOTANICALS[k]
                return (
                  <li key={k} className="border border-ink/10 p-6">
                    <p className="font-display text-xl">{b.name}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                      {b.latin} · {b.origin}
                    </p>
                    <dl className="mt-4 grid grid-cols-3 gap-2 font-mono text-[10px] uppercase tracking-[0.1em]">
                      <div>
                        <dt className="text-brass">Ayurveda</dt>
                        <dd className="mt-1 text-ink/70">{b.ayurveda}</dd>
                      </div>
                      <div>
                        <dt className="text-brass">Unani</dt>
                        <dd className="mt-1 text-ink/70">{b.unani}</dd>
                      </div>
                      <div>
                        <dt className="text-brass">TCM</dt>
                        <dd className="mt-1 text-ink/70">{b.tcm}</dd>
                      </div>
                    </dl>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12">
        <GuaranteeStrip />
        <p className="eyebrow mt-16">Other purposes</p>
        <ul className="mt-6 grid gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {others.map((c) => (
            <li key={c.slug}>
              <Link to={`/collections/${c.slug}`} className="group block" data-testid={`link-other-${c.slug}`}>
                <ProductPhoto slug={c.hero} fit="cover" ratio={1.3} className="bg-sand" sizes="(min-width: 1024px) 20vw, 33vw" imgClassName="transition-transform duration-700 group-hover:scale-[1.03]" />
                <p className="mt-3 font-display text-lg group-hover:text-brass">{c.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{c.short}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import ProductPhoto from '../components/ProductPhoto'
import { LabelBadges, Seo } from '../components/ui'
import { useCatalog } from '../lib/catalog'

const FILTERS = [
  { key: 'all', label: 'All five' },
  { key: 'supplement', label: 'Taken' },
  { key: 'cosmetic', label: 'Applied' },
  { key: 'food', label: 'Eaten' },
]

export default function Shop() {
  const { products } = useCatalog()
  const [filter, setFilter] = useState('all')
  const shown = filter === 'all' ? products : products.filter((p) => p.productType === filter)

  return (
    <>
      <Seo title="Shop" description="The five Dr. Mushtaq’s products: Blackseed Oil, Softgels, Balm, Scalp & Beard Serum, and Culinary Finishing Oil. One oil, standardized to 4.64% thymoquinone." />
      <section className="border-b border-ink/10 bg-sand">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-20">
          <div className="lg:col-span-6">
            <p className="eyebrow">The collection</p>
            <h1 className="h1 mt-6">Five products.</h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/70">
              Taken, applied, or eaten: each is the same single-origin Ethiopian oil, standardized to 4.64% thymoquinone, in the format that fits the moment.
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
        <div className="flex flex-wrap items-center gap-2 border-b border-ink/10 pb-6" role="group" aria-label="Filter products">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={`px-3 py-2 font-mono sm:px-4 text-[11px] uppercase tracking-[0.14em] transition-colors ${filter === f.key ? 'bg-ink text-cream' : 'hover:text-brass'}`}
              data-testid={`button-filter-${f.key}`}
            >
              {f.label}
            </button>
          ))}
          <p className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-muted" data-testid="text-shop-count">
            {shown.length} of {products.length}
          </p>
        </div>
        <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={products.indexOf(p)} ratio={1.1} priority={i < 3} />
          ))}
        </div>
      </section>
    </>
  )
}

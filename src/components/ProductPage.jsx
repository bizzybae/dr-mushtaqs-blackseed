import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { productBySlug, products } from '../data/products.js'
import ProductCard from './ProductCard.jsx'

function DetailRow({ label, value }) {
  return (
    <div className="grid gap-1 py-4 sm:grid-cols-[150px_1fr] sm:gap-8">
      <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{label}</dt>
      <dd className="text-sm leading-relaxed">{value}</dd>
    </div>
  )
}

export default function ProductPage({ onAdd }) {
  const { slug } = useParams()
  const product = productBySlug[slug]
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!product) {
      return
    }
    document.title = `${product.name} | Dr. Mushtaq’s Blackseed`
    window.scrollTo(0, 0)
  }, [product])

  if (!product) {
    return <Navigate to="/products" replace />
  }

  const index = products.findIndex((item) => item.slug === product.slug)
  const related = [
    products[(index + 1) % products.length],
    products[(index + 2) % products.length],
    products[(index + 3) % products.length]
  ]

  return (
    <main>
      <nav aria-label="Breadcrumb" className="px-6 py-5 sm:px-10 lg:px-20">
        <ol className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>/</li>
          <li className="text-ink" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <section className="grid border-y border-ink/10 lg:grid-cols-2">
        <div className="min-h-[360px] bg-sand lg:min-h-[680px]">
          <img
            src={product.image}
            alt={`${product.name} product presentation`}
            onError={(event) => {
              event.currentTarget.style.visibility = 'hidden'
            }}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-16">
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow">{product.eyebrow}</p>
            <span className="border border-brass/60 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-brass">
              {product.status}
            </span>
          </div>
          <h1 className="mt-5 font-display text-5xl leading-[0.98] tracking-tight sm:text-6xl">{product.name}</h1>
          <p className="mt-4 font-display text-xl italic text-ink/65">{product.subtitle}</p>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            {product.category} / {product.size}
          </p>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/75">{product.summary}</p>
          <div className="mt-10 border-y border-ink/10 py-5">
            <p className="font-display text-3xl">
              {product.price == null ? 'Price to be confirmed' : `$${product.price.toFixed(2)}`}
            </p>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <div className="flex items-center border border-ink/20">
              <button className="px-4 py-3" aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                −
              </button>
              <span className="w-10 text-center font-mono text-sm">{quantity}</span>
              <button className="px-4 py-3" aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)}>
                +
              </button>
            </div>
            <button
              className={`btn btn-solid ${product.price == null ? 'cursor-not-allowed opacity-60' : ''}`}
              disabled={product.price == null}
              onClick={() => product.price != null && onAdd(product, quantity)}
            >
              {product.price == null ? 'Not yet available' : 'Add to bag'}
            </button>
          </div>
          <p className="mt-5 max-w-lg font-mono text-[10px] leading-relaxed text-muted">
            Demonstration storefront. Checkout is disabled. The product image is a design visualization, and final
            packaging may differ after review.
          </p>
        </div>
      </section>

      <section className="section grid gap-14 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <p className="eyebrow">Product specification</p>
          <h2 className="mt-4 font-display text-4xl">What we know today.</h2>
          <dl className="mt-9 divide-y divide-ink/10 border-y border-ink/10">
            {product.details.map(([label, value]) => (
              <DetailRow key={label} label={label} value={value} />
            ))}
          </dl>
          <div className="mt-10">
            <h3 className="font-display text-2xl">Proposed ingredients</h3>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink/75">
              {product.ingredients.map((item) => (
                <li key={item} className="border-l border-brass pl-4">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <aside className="bg-sand p-7 sm:p-10">
          <p className="eyebrow">Launch checklist</p>
          <h2 className="mt-4 font-display text-4xl">Details to approve.</h2>
          <ol className="mt-8 space-y-5">
            {product.review.map((item, itemIndex) => (
              <li key={item} className="grid grid-cols-[32px_1fr] gap-3 border-b border-ink/10 pb-5">
                <span className="font-mono text-[10px] text-brass">{String(itemIndex + 1).padStart(2, '0')}</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ol>
          <p className="mt-8 font-mono text-[10px] leading-relaxed text-muted">
            Editable working copy. No placeholder should be treated as a manufacturing specification or printed on
            packaging without verification.
          </p>
        </aside>
      </section>

      <section className="grid border-y border-ink/10 lg:grid-cols-2">
        <div className="px-6 py-14 sm:px-10 lg:px-20">
          <p className="eyebrow">Directions</p>
          <h2 className="mt-4 font-display text-3xl">How it may be used.</h2>
          <p className="mt-6 max-w-xl leading-relaxed text-ink/75">{product.directions}</p>
        </div>
        <div className="bg-ink px-6 py-14 text-cream sm:px-10 lg:px-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brass">Safety</p>
          <h2 className="mt-4 font-display text-3xl">Read before use.</h2>
          <p className="mt-6 max-w-xl leading-relaxed text-cream/75">{product.safety}</p>
        </div>
      </section>

      <section className="section">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Continue exploring</p>
            <h2 className="mt-4 font-display text-4xl">From the collection.</h2>
          </div>
          <Link to="/products" className="btn hidden sm:inline-flex">
            View all
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>
    </main>
  )
}

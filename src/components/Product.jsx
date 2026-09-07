import { useState } from 'react'
import { Link } from 'react-router-dom'
import { originalProduct as product } from '../data/products.js'

export default function Product({ onAdd }) {
  const [quantity, setQuantity] = useState(1)

  return (
    <section id="shop" className="section border-t border-ink/10">
      <div className="grid gap-14 lg:grid-cols-2">
        <Link to={`/products/${product.slug}`} className="overflow-hidden bg-sand">
          <img
            src={product.image}
            alt={`${product.name} product presentation`}
            onError={(event) => {
              event.currentTarget.style.visibility = 'hidden'
            }}
            className="aspect-[4/3] h-full w-full object-cover transition duration-500 hover:scale-[1.01]"
          />
        </Link>
        <div className="self-center">
          <p className="eyebrow">The original</p>
          <h2 className="h2 mt-4">{product.name}</h2>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
            {product.subtitle} / {product.size}
          </p>
          <p className="mt-8 text-lg leading-relaxed text-ink/75">{product.summary}</p>
          <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
            {product.details.slice(0, 5).map(([label, value]) => (
              <div key={label} className="flex justify-between gap-6 py-3">
                <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{label}</dt>
                <dd className="max-w-[60%] text-right text-sm">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <p className="font-display text-2xl">${product.price.toFixed(2)}</p>
            <div className="flex items-center border border-ink/20">
              <button className="px-4 py-3" aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                −
              </button>
              <span className="w-10 text-center font-mono text-sm">{quantity}</span>
              <button className="px-4 py-3" aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)}>
                +
              </button>
            </div>
            <button className="btn btn-solid" onClick={() => onAdd(product, quantity)}>
              Add to bag
            </button>
            <Link className="btn" to={`/products/${product.slug}`}>
              Full details
            </Link>
          </div>
          <p className="mt-6 max-w-md font-mono text-[10px] leading-relaxed text-muted">
            Demonstration storefront. Checkout is disabled and no payment or personal information is collected. Read the
            complete product label before use.
          </p>
        </div>
      </div>
    </section>
  )
}

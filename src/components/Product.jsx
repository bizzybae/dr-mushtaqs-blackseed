import { useState } from 'react'
import { product } from '../data/site.js'
import BottleArt from './BottleArt.jsx'

export default function Product({ onAdd }) {
  const [quantity, setQuantity] = useState(1)

  return (
    <section id="shop" className="section border-t border-ink/10">
      <div className="grid gap-14 lg:grid-cols-2">
        <div className="grid place-items-center bg-sand py-14">
          <BottleArt className="h-[300px] w-auto sm:h-[380px]" />
        </div>
        <div>
          <p className="eyebrow">The original</p>
          <h2 className="h2 mt-4">{product.name}</h2>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
            {product.botanical} / {product.size}
          </p>
          <p className="mt-8 text-lg text-ink/75">{product.summary}</p>
          <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
            {product.details.map((row) => (
              <div key={row.label} className="flex justify-between gap-6 py-3">
                <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{row.label}</dt>
                <dd className="text-right text-sm">{row.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <p className="font-display text-2xl">${product.price.toFixed(2)}</p>
            <div className="flex items-center border border-ink/20">
              <button
                className="px-4 py-3"
                aria-label="Decrease quantity"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="w-10 text-center font-mono text-sm">{quantity}</span>
              <button className="px-4 py-3" aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)}>
                +
              </button>
            </div>
            <button className="btn btn-solid" onClick={() => onAdd(quantity)}>
              Add to bag
            </button>
          </div>
          <p className="mt-6 max-w-md font-mono text-[10px] leading-relaxed text-muted">
            Demonstration storefront. Checkout is disabled and no payment or personal information is collected. For
            adults. Read the complete product label before use.
          </p>
        </div>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { ProductThumb } from './ProductPhoto'
import { bestSavings, defaultVariant, money, priceFrom, priceTo } from '../lib/catalog'
import { useCart } from '../lib/cart'

export default function ProductCard({ product, index = 0, ratio = 1.1, priority = false, showStep = true }) {
  const { add } = useCart()
  const variant = defaultVariant(product)
  const from = priceFrom(product)
  const to = priceTo(product)
  const hasRange = product.variants.length > 1
  const setSaving = variant.compareAtCents ? Math.round((1 - variant.priceCents / variant.compareAtCents) * 100) : 0
  const bulk = hasRange ? bestSavings(product) : 0
  const badge = product.bestseller ? 'Bestseller' : product.isNew ? 'New' : null

  return (
    <article className="group flex flex-col" data-testid={`card-product-${product.slug}`}>
      <Link to={`/shop/${product.slug}`} className="relative block">
        <ProductThumb product={product} ratio={ratio} priority={priority} sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw" imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
        <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60">{String(index + 1).padStart(2, '0')}</span>
        {(badge || setSaving > 0) && (
          <span className="absolute right-4 top-4 bg-ink px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-cream">
            {setSaving > 0 ? `Save ${setSaving}%` : badge}
          </span>
        )}
      </Link>
      <div className="mt-5 flex flex-1 flex-col">
        {showStep && product.step && <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brass">{product.step}</p>}
        <div className="mt-1 flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl leading-tight">
            <Link to={`/shop/${product.slug}`} className="hover:text-brass" data-testid={`link-product-${product.slug}`}>
              {product.name}
            </Link>
          </h3>
          <p className="shrink-0 text-right font-mono text-[12px] tracking-wide" data-testid={`text-price-${product.slug}`}>
            {hasRange ? `${money(from)} to ${money(to)}` : money(from)}
          </p>
        </div>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{product.subtitle}</p>
        <p className="mb-5 mt-3 text-sm leading-relaxed text-ink/70">{product.tagline}</p>
        <div className="mt-auto flex items-center justify-between gap-3">
          <button onClick={() => add(variant.sku, 1)} className="btn flex-1" data-testid={`button-add-${product.slug}`}>
            Add {variant.label}
            <span className="text-brass">·</span>
            {money(variant.priceCents)}
          </button>
        </div>
        {bulk > 0 && <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Save up to {bulk}% on larger sizes</p>}
      </div>
    </article>
  )
}

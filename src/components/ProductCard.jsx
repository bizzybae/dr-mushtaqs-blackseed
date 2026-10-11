import { Link } from 'react-router-dom'
import { ProductThumb } from './ProductPhoto'
import ProductPhoto from './ProductPhoto'
import { NotifyButton } from './WaitlistForm'
import { bestSavings, defaultVariant, isConcept, isPurchasable, money, priceFrom, priceTo, statusOf } from '../lib/catalog'
import { useCart } from '../lib/cart'

export default function ProductCard({ product, index = 0, ratio = 1.1, priority = false, showStep = true }) {
  const { add } = useCart()
  const variant = defaultVariant(product)
  const from = priceFrom(product)
  const to = priceTo(product)
  const hasRange = product.variants.length > 1
  const setSaving = variant.compareAtCents ? Math.round((1 - variant.priceCents / variant.compareAtCents) * 100) : 0
  const bulk = hasRange ? bestSavings(product) : 0
  const status = statusOf(product)
  const concept = isConcept(product)
  const buyable = isPurchasable(product)
  const badge = concept ? 'Coming soon' : product.status === 'prelaunch' ? 'First lot soon' : product.status === 'sold_out' ? 'Sold out' : product.bestseller ? 'Bestseller' : product.isNew ? 'New' : null
  const href = `/shop/${product.slug}`
  const second = (product.gallery || []).find((g) => g !== product.image)

  return (
    <article className="group flex flex-col" data-testid={`card-product-${product.slug}`}>
      <Link to={href} className="relative block overflow-hidden">
        <ProductThumb product={product} ratio={ratio} priority={priority} sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw" imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none" />
        {second && (
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 motion-reduce:transition-none" aria-hidden="true">
            <ProductPhoto slug={second} fit="cover" ratio={ratio} sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw" />
          </div>
        )}
        <span className="absolute left-4 top-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60">{String(index + 1).padStart(2, '0')}</span>
        {(badge || (buyable && setSaving > 0)) && (
          <span className="absolute right-4 top-4 bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-cream">
            {buyable && setSaving > 0 ? `Save ${setSaving}%` : badge}
          </span>
        )}
      </Link>
      <div className="mt-5 flex flex-1 flex-col">
        {showStep && product.step && <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brass">{product.step}</p>}
        <div className="mt-1 flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl leading-tight">
            <Link to={href} className="hover:text-brass" data-testid={`link-product-${product.slug}`}>
              {product.name}
            </Link>
          </h3>
          {!concept && (
            <p className="shrink-0 text-right font-mono text-[12px] tracking-wide" data-testid={`text-price-${product.slug}`}>
              {hasRange ? `${money(from)} to ${money(to)}` : money(from)}
            </p>
          )}
        </div>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{product.subtitle}</p>
        <p className="mb-5 mt-3 text-base leading-relaxed text-ink/70">{product.sensoryLine || product.tagline}</p>
        <div className="mt-auto flex items-center justify-between gap-3">
          {buyable ? (
            <button onClick={() => add(variant.sku, 1)} className="btn min-h-[48px] flex-1" data-testid={`button-add-${product.slug}`}>
              Add {variant.label}
              <span className="text-brass">·</span>
              {money(variant.priceCents)}
            </button>
          ) : (
            <NotifyButton sku={variant.sku} source={`card-${product.slug}`} label={status.cta} interests={[product.collection]} className="btn min-h-[48px] flex-1" />
          )}
        </div>
        {buyable && bulk > 0 && <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Save up to {bulk}% on larger sizes</p>}
      </div>
    </article>
  )
}

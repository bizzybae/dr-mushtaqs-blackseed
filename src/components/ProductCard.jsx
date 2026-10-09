import { Link } from 'react-router-dom'
import ProductPhoto from './ProductPhoto'
import { defaultVariant, money, priceFrom } from '../lib/catalog'
import { useCart } from '../lib/cart'

export default function ProductCard({ product, index = 0, ratio = 1.1, priority = false }) {
  const { add } = useCart()
  const from = priceFrom(product)
  const variant = defaultVariant(product)
  const hasRange = product.variants.length > 1

  return (
    <article className="group flex flex-col" data-testid={`card-product-${product.slug}`}>
      <Link to={`/shop/${product.slug}`} className="relative block overflow-hidden bg-sand">
        <ProductPhoto
          slug={product.image}
          fit="cover"
          ratio={ratio}
          priority={priority}
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
          imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60">0{index + 1}</span>
      </Link>
      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl leading-tight">
            <Link to={`/shop/${product.slug}`} className="hover:text-brass" data-testid={`link-product-${product.slug}`}>
              {product.name}
            </Link>
          </h3>
          <p className="shrink-0 font-mono text-[12px] tracking-wide" data-testid={`text-price-${product.slug}`}>
            {hasRange ? `from ${money(from)}` : money(from)}
          </p>
        </div>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{product.subtitle}</p>
        <p className="mb-5 mt-3 text-sm leading-relaxed text-ink/70">{product.tagline}</p>
        <button
          onClick={() => add(variant.sku, 1)}
          className="btn mt-auto w-full"
          data-testid={`button-add-${product.slug}`}
        >
          Add to bag
          <span className="text-brass">·</span>
          {money(variant.priceCents)}
        </button>
      </div>
    </article>
  )
}

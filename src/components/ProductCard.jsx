import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <article className="group flex h-full flex-col border border-ink/10 bg-cream">
      <Link to={`/products/${product.slug}`} className="block overflow-hidden bg-sand">
        <img
          src={product.image}
          alt={`${product.name} product presentation`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.visibility = 'hidden'
          }}
          className="aspect-[4/3] h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">{product.category}</p>
        <Link to={`/products/${product.slug}`} className="mt-3 font-display text-2xl leading-tight hover:text-brass">
          {product.name}
        </Link>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">{product.size}</p>
        <div className="mt-auto flex items-end justify-between gap-4 pt-7">
          <span className="font-display text-xl">
            {product.price == null ? 'Price pending' : `$${product.price.toFixed(2)}`}
          </span>
          <Link
            to={`/products/${product.slug}`}
            className="font-mono text-[10px] uppercase tracking-[0.12em] underline decoration-brass underline-offset-4"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  )
}

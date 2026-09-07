import { Link } from 'react-router-dom'
import ProductCard from './ProductCard.jsx'
import { products } from '../data/products.js'

export default function ProductCatalog({ limit }) {
  const visible = typeof limit === 'number' ? products.slice(0, limit) : products

  return (
    <section id="collection" className="section border-t border-ink/10">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">The collection</p>
          <h2 className="h2 mt-4 max-w-2xl">Ten considered formats.</h2>
        </div>
        {limit && (
          <Link to="/products" className="btn self-start sm:self-auto">
            View all products
          </Link>
        )}
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
      <p className="mt-8 max-w-3xl font-mono text-[10px] leading-relaxed text-muted">
        Products marked as under review are concepts, not active offers for sale. Formula, sourcing, label, testing,
        regulatory classification, price, and availability must be approved before launch.
      </p>
    </section>
  )
}

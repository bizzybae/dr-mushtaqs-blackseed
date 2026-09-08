import { getProductImage } from '../data/productImages'
import BottleArt from './BottleArt'

// Drop-in replacement for the placeholder SVG art.
// Usage: <ProductPhoto slug={product.slug} priority />
// If a slug has no photograph yet, the original BottleArt SVG still renders,
// so nothing can regress to a blank frame.
export default function ProductPhoto({
  slug,
  alt,
  className = '',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority = false,
}) {
  const img = getProductImage(slug)

  if (!img) {
    return (
      <div className={`overflow-hidden rounded-2xl bg-[#f7f4ee] ${className}`}>
        <BottleArt />
      </div>
    )
  }

  return (
    <picture>
      <source type="image/webp" srcSet={img.webpSrcSet} sizes={sizes} />
      <source type="image/jpeg" srcSet={img.jpgSrcSet} sizes={sizes} />
      <img
        src={img.jpg}
        alt={alt || img.alt}
        className={`w-full h-auto rounded-2xl object-cover ${className}`}
        style={{ aspectRatio: img.aspect }}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
    </picture>
  )
}

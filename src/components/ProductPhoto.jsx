import { imageFor } from '../lib/catalog'

// Renders one of the eight studio photographs. `fit="cover"` crops into the
// given aspect (used for cards); `fit="natural"` keeps the photo’s own ratio.
export default function ProductPhoto({
  slug,
  alt,
  className = '',
  imgClassName = '',
  fit = 'natural',
  ratio,
  position = 'center',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority = false,
}) {
  const img = imageFor(slug)
  if (!img) {
    return <div className={`bg-sand ${className}`} style={{ aspectRatio: ratio || 1 }} aria-hidden="true" />
  }
  const aspect = fit === 'cover' ? ratio || 1 : img.aspect
  return (
    <picture className={`block overflow-hidden ${className}`} style={{ aspectRatio: aspect }}>
      <source type="image/webp" srcSet={img.webpSrcSet} sizes={sizes} />
      <source type="image/jpeg" srcSet={img.jpgSrcSet} sizes={sizes} />
      <img
        src={img.jpg}
        alt={alt ?? img.alt}
        width={1600}
        height={Math.round(1600 / img.aspect)}
        className={`h-full w-full ${fit === 'cover' ? 'object-cover' : 'object-contain'} ${imgClassName}`}
        style={{ objectPosition: position }}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
    </picture>
  )
}

import { cardImages, imageFor } from '../lib/catalog'

// Renders one studio photograph. `fit="cover"` crops into `ratio`; `fit="natural"` keeps the photo’s own ratio.
export default function ProductPhoto({ slug, alt, className = '', imgClassName = '', fit = 'natural', ratio, position = 'center', sizes = '(min-width: 1024px) 50vw, 100vw', priority = false }) {
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
        fetchpriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
    </picture>
  )
}

// Card image for a product: its own photo, or a mosaic of the set’s components.
export function ProductThumb({ product, ratio = 1.1, sizes, priority = false, imgClassName = '', className = '' }) {
  const imgs = cardImages(product)
  if (imgs.length <= 1) {
    return <ProductPhoto slug={imgs[0]} fit="cover" ratio={ratio} sizes={sizes} priority={priority} className={`bg-sand ${className}`} imgClassName={imgClassName} />
  }
  const shown = imgs.slice(0, 3)
  return (
    <div className={`grid gap-px overflow-hidden bg-ink/10 ${shown.length === 2 ? 'grid-cols-2' : 'grid-cols-2 grid-rows-2'} ${className}`} style={{ aspectRatio: ratio }}>
      {shown.map((s, i) => (
        <ProductPhoto
          key={s}
          slug={s}
          fit="cover"
          ratio={undefined}
          sizes={sizes}
          priority={priority}
          className={`h-full bg-sand ${shown.length === 3 && i === 0 ? 'row-span-2' : ''}`}
          imgClassName={imgClassName}
        />
      ))}
    </div>
  )
}

import { createContext, useContext, useEffect, useMemo, useState, createElement } from 'react'
import { supabase } from './supabase'
import { PRODUCTS, IMAGES, COLLECTIONS, LABEL_BADGES } from '../data/catalog'

const MEDIA_BASE = String(import.meta.env.VITE_MEDIA_BASE || '/products').replace(/\/+$/, '')

export function imageFor(slug) {
  const meta = IMAGES[slug]
  if (!meta) return null
  return {
    slug,
    alt: meta.alt,
    aspect: meta.aspect,
    jpg: `${MEDIA_BASE}/${slug}.jpg`,
    webp: `${MEDIA_BASE}/${slug}.webp`,
    webpSrcSet: `${MEDIA_BASE}/${slug}@800.webp 800w, ${MEDIA_BASE}/${slug}.webp 1600w`,
    jpgSrcSet: `${MEDIA_BASE}/${slug}@800.jpg 800w, ${MEDIA_BASE}/${slug}.jpg 1600w`,
  }
}

// Normalise Supabase rows into the same shape as src/data/catalog.js.
function fromRows(products, collections, settings) {
  const list = products
    .filter((p) => p.is_published)
    .map((p) => {
      const sections = Object.fromEntries((p.product_sections || []).map((s) => [s.section_type, s.content]))
      const images = (p.product_images || []).sort((a, b) => a.sort_order - b.sort_order).map((i) => i.storage_path)
      const variants = (p.product_variants || [])
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((v) => {
          const [format = '', ...rest] = (v.description || '').split('|')
          return {
            sku: v.sku,
            label: v.label,
            format: format.trim(),
            description: rest.join('|').trim(),
            sizeMl: v.size_ml ? Number(v.size_ml) : undefined,
            priceCents: v.price_cents,
            compareAtCents: v.compare_at_cents,
            default: v.is_default,
            image: v.image_storage_path || images[0] || null,
            stock: v.stock,
          }
        })
      return {
        slug: p.slug,
        sort: p.sort_order,
        collection: p.collection_slug,
        step: p.step,
        name: p.name,
        subtitle: p.subtitle,
        tagline: p.tagline,
        category: p.category,
        productType: p.product_type,
        featured: p.is_featured,
        isNew: p.is_new,
        bestseller: p.is_bestseller,
        botanicals: p.botanicals || [],
        image: images[0] || null,
        gallery: images,
        mosaic: p.mosaic || [],
        bundle: (p.bundle_items || []).map((b) => ({ sku: b.variant?.sku, qty: b.quantity })).filter((b) => b.sku),
        short: p.short_description,
        long: p.long_description,
        ingredients: p.inci_ingredients,
        specs: p.specs || [],
        howToUse: sections.how_to_use || [],
        faq: sections.faq || [],
        safety: sections.key_points?.safety || '',
        variants,
        batches: (p.batches || []).sort((a, b) => (a.pressed_date < b.pressed_date ? 1 : -1)),
      }
    })
    .sort((a, b) => a.sort - b.sort)
  const cols = (collections || [])
    .filter((c) => c.is_published)
    .map((c) => ({ slug: c.slug, name: c.name, short: c.short_label, description: c.description, hero: c.hero_image_url, steps: c.steps || [], sort: c.sort_order }))
    .sort((a, b) => a.sort - b.sort)
  const map = Object.fromEntries((settings || []).map((s) => [s.key, s.value]))
  return { products: list, collections: cols.length ? cols : COLLECTIONS, settings: map }
}

const STATIC = {
  products: PRODUCTS.map((p) => ({ ...p, batches: [], bundle: p.bundle || [], mosaic: p.mosaic || [], gallery: p.gallery || [] })),
  collections: COLLECTIONS,
  settings: { free_shipping_threshold_cents: 15000, flat_shipping_cents: 900, announcement: 'Complimentary shipping on orders over $150' },
}

const CatalogContext = createContext({ ...STATIC, source: 'static', loading: false })

export function CatalogProvider({ children }) {
  const [state, setState] = useState({ ...STATIC, source: 'static', loading: Boolean(supabase) })

  useEffect(() => {
    if (!supabase) return
    let cancelled = false
    ;(async () => {
      try {
        const [{ data: products, error }, { data: collections }, { data: settings }] = await Promise.all([
          supabase
            .from('products')
            .select(
              'slug,name,subtitle,tagline,category,product_type,short_description,long_description,inci_ingredients,is_featured,is_new,is_bestseller,is_published,sort_order,badges,specs,collection_slug,step,botanicals,mosaic,' +
                'product_variants!product_variants_product_id_fkey(sku,label,size_ml,price_cents,compare_at_cents,stock,is_default,sort_order,image_storage_path,description),' +
                'product_images(storage_path,alt,sort_order,aspect),' +
                'product_sections(section_type,content,sort_order),' +
                'bundle_items!bundle_items_bundle_product_id_fkey(quantity,variant:product_variants!bundle_items_variant_id_fkey(sku)),' +
                'batches(lot_number,pressed_date,best_by,thymoquinone_pct,acid_value,peroxide_value,coa_storage_path)'
            )
            .order('sort_order'),
          supabase.from('collections').select('slug,name,short_label,description,hero_image_url,steps,sort_order,is_published').order('sort_order'),
          supabase.from('site_settings').select('key,value'),
        ])
        if (error) throw error
        if (!cancelled && products && products.length) {
          setState({ ...fromRows(products, collections, settings), source: 'supabase', loading: false })
        } else if (!cancelled) {
          setState((s) => ({ ...s, loading: false }))
        }
      } catch (err) {
        console.warn('[catalog] falling back to static catalog:', err?.message || err)
        if (!cancelled) setState((s) => ({ ...s, loading: false }))
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(() => state, [state])
  return createElement(CatalogContext.Provider, { value }, children)
}

export function useCatalog() {
  return useContext(CatalogContext)
}

export function useProduct(slug) {
  const { products, loading } = useCatalog()
  return { product: products.find((p) => p.slug === slug) || null, loading }
}

export function useCollection(slug) {
  const { products, collections, loading } = useCatalog()
  const collection = collections.find((c) => c.slug === slug) || null
  const items = products.filter((p) => p.collection === slug)
  return { collection, products: items, loading }
}

export function findVariant(products, sku) {
  for (const p of products) {
    const v = p.variants.find((x) => x.sku === sku)
    if (v) return { product: p, variant: v }
  }
  return null
}

export function priceFrom(product) {
  return Math.min(...product.variants.map((v) => v.priceCents))
}
export function priceTo(product) {
  return Math.max(...product.variants.map((v) => v.priceCents))
}
export function defaultVariant(product) {
  return product.variants.find((v) => v.default) || product.variants[0]
}
export function savingsPct(variant) {
  if (!variant?.compareAtCents || variant.compareAtCents <= variant.priceCents) return 0
  return Math.round((1 - variant.priceCents / variant.compareAtCents) * 100)
}
export function bestSavings(product) {
  return Math.max(0, ...product.variants.map(savingsPct))
}
// Thumbnail(s) used for cards: own photo, or a mosaic of bundle components.
export function cardImages(product) {
  if (product.image) return [product.image]
  if (product.mosaic?.length) return product.mosaic
  return []
}

export { LABEL_BADGES }

export const money = (cents, opts = {}) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: cents % 100 === 0 && !opts.always ? 0 : 2 }).format(cents / 100)

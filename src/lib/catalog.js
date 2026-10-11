import { createContext, useContext, useEffect, useMemo, useState, createElement } from 'react'
import { supabase } from './supabase'
import { applyProductContent, useSite } from './content'
import { PRODUCTS, IMAGES, COLLECTIONS, LABEL_BADGES, STATUS } from '../data/catalog'

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
        status: STATUS[p.status] ? p.status : 'concept',
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
        intendedUse: p.intended_use || '',
        sensoryLine: p.sensory_line || '',
        sensory: p.sensory_notes || '',
        storage: p.storage || '',
        shelfLife: p.shelf_life || '',
        serving: p.serving || '',
        servingMl: p.serving_ml ? Number(p.serving_ml) : undefined,
        directions: p.directions || [],
        howTo: Array.isArray(p.how_to) ? p.how_to : [],
        // "Why it suits your skin": only claims the owner has approved reach the browser (RLS),
        // and only the cosmetic kind renders as copy. Spec claims stay on the label badges.
        why: (p.claims || []).filter((c) => c.claim_type === 'cosmetic' && c.text).map((c) => c.text),
        variants,
        batches: normaliseBatches(p.batches),
        reviews: (p.reviews || []).filter((r) => r.is_approved),
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

// Only published rows ever reach the browser (RLS), but filter again so a
// row can never render half-finished. Newest press first.
export function normaliseBatches(rows) {
  return (rows || [])
    .filter((b) => b && b.published !== false && b.lot_number)
    .map((b) => ({ ...b, press_date: b.press_date || b.pressed_date || null }))
    .sort((a, b) => ((a.press_date || '') < (b.press_date || '') ? 1 : -1))
}

const STATIC = {
  products: PRODUCTS.map((p) => ({ ...p, status: p.status || 'concept', batches: [], reviews: [], bundle: p.bundle || [], mosaic: p.mosaic || [], gallery: p.gallery || [], directions: p.directions || [], howTo: p.howTo || [], why: p.why || [] })),
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
              'slug,status,name,subtitle,tagline,category,product_type,short_description,long_description,inci_ingredients,is_featured,is_new,is_bestseller,is_published,sort_order,badges,specs,collection_slug,step,botanicals,mosaic,' +
                'intended_use,sensory_line,sensory_notes,storage,shelf_life,serving,serving_ml,directions,how_to,' +
                'product_variants!product_variants_product_id_fkey(sku,label,size_ml,price_cents,compare_at_cents,stock,is_default,sort_order,image_storage_path,description),' +
                'product_images(storage_path,alt,sort_order,aspect),' +
                'product_sections(section_type,content,sort_order),' +
                'claims(text,claim_type),' +
                'bundle_items!bundle_items_bundle_product_id_fkey(quantity,variant:product_variants!bundle_items_variant_id_fkey(sku)),' +
                'batches(lot_number,press_date,pressed_date,best_by,origin_country,origin_region,thymoquinone_pct,tq_method,peroxide_value,fatty_acid_profile,heavy_metals_result,micro_result,lab_name,coa_pdf_url,published,is_current),' +
                'reviews(author_name,rating,title,body,is_verified_buyer,is_approved,created_at)'
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

  // Editorial copy from Sanity overlays the commerce rows by slug.
  const { PRODUCT_CONTENT } = useSite()
  const value = useMemo(
    () => ({ ...state, products: state.products.map((p) => applyProductContent(p, PRODUCT_CONTENT?.[p.slug])) }),
    [state, PRODUCT_CONTENT]
  )
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

// Lifecycle helpers. The server enforces the same rule in api/checkout.js.
export const statusOf = (product) => STATUS[product?.status] || STATUS.concept
export const isPurchasable = (product) => statusOf(product).purchasable
export const isConcept = (product) => (product?.status || 'concept') === 'concept'
// Products on the shop grid: anything past the concept stage. Every product,
// concept included, has its own /shop/{slug} page (concepts show Notify me).
export const isListed = (product) => !isConcept(product)
export const productPath = (product) => `/shop/${product.slug}`
// The label for the third detail block depends on what the product is for.
export function whyLabel(product) {
  if (product?.collection === 'hair') return 'Why it suits your hair'
  if (product?.category === 'topical' || product?.collection === 'skin' || product?.collection === 'body') return 'Why it suits your skin'
  return 'Why it is on the shelf'
}
// Per-mL and per-fl-oz lines only make sense for products sold in bottle sizes.
// Small formats (eye concentrate, attars) would read as misleadingly expensive.
export const showsUnitPrice = (product) => Math.max(0, ...(product?.variants || []).map((v) => v.sizeMl || 0)) > 30
export function useListedProducts() {
  const { products, loading } = useCatalog()
  return { products: products.filter(isListed), loading }
}
export function useConceptProducts() {
  const { products, loading } = useCatalog()
  return { products: products.filter(isConcept), loading }
}
// Site-wide state: live once anything can be bought.
export function useSiteMode() {
  const { products } = useCatalog()
  return products.some(isPurchasable) ? 'live' : 'prelaunch'
}
export function useCurrentBatch(product) {
  const list = product?.batches || []
  return list.find((b) => b.is_current) || list[0] || null
}

const ML_PER_FL_OZ = 29.5735
export function perOz(variant) {
  if (!variant?.sizeMl) return null
  return Math.round(variant.priceCents / (variant.sizeMl / ML_PER_FL_OZ))
}
export function perMl(variant) {
  if (!variant?.sizeMl) return null
  return Math.round(variant.priceCents / variant.sizeMl)
}
export function servingsPer(product, variant) {
  if (!product?.servingMl || !variant?.sizeMl) return null
  return Math.floor(variant.sizeMl / product.servingMl)
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

export { LABEL_BADGES, STATUS }

export const money = (cents, opts = {}) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: cents % 100 === 0 && !opts.always ? 0 : 2 }).format(cents / 100)

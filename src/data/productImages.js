// Product photography registry for Dr. Mushtaq's Blackseed.
// Assets are served from /public/products by default. To serve them from a
// Supabase Storage bucket instead, set in Vercel:
//   VITE_MEDIA_BASE=https://<project-ref>.supabase.co/storage/v1/object/public/product-media

const BASE = String(import.meta.env?.VITE_MEDIA_BASE || '/products').replace(/\/+$/, '')

export const PRODUCT_IMAGES = {
  'culinary-finishing-oil': {
    file: 'culinary-finishing-oil',
    aspect: 1.4906,
    alt: "Dr. Mushtaq's Culinary Finishing Oil, cold-pressed blackseed, 250 ml amber bottle with gold pour spout",
  },
  'blackseed-immunity-tea': {
    file: 'blackseed-immunity-tea',
    aspect: 1.4906,
    alt: "Dr. Mushtaq's Blackseed Immunity Tea tin with 40 sachets of ginger, cinnamon and licorice",
  },
  'blackseed-miswak-oral-gel': {
    file: 'blackseed-miswak-oral-gel',
    aspect: 1.4906,
    alt: "Dr. Mushtaq's Blackseed & Miswak Oral Gel, fluoride-free 75 ml tube beside a miswak stick",
  },
  'gift-set': {
    file: 'gift-set',
    aspect: 1.7917,
    alt: "Dr. Mushtaq's blackseed gift set with dropper bottle, balm, travel vials and botanical card",
  },
  'blackseed-cleansing-bar': {
    file: 'blackseed-cleansing-bar',
    aspect: 1.4906,
    alt: "Dr. Mushtaq's Blackseed Cleansing Bar, 120 g cold-process charcoal soap with embossed hexagon",
  },
  'blackseed-sidr-honey': {
    file: 'blackseed-sidr-honey',
    aspect: 1.4906,
    alt: "Dr. Mushtaq's Blackseed & Sidr Honey raw infusion, 250 g jar with wooden dipper",
  },
  'scalp-beard-serum': {
    file: 'scalp-beard-serum',
    aspect: 1.8333,
    alt: "Dr. Mushtaq's Scalp & Beard Serum with blackseed and rosemary, 60 ml dropper bottle and comb",
  },
  'blackseed-balm': {
    file: 'blackseed-balm',
    aspect: 1.4906,
    alt: "Dr. Mushtaq's Blackseed Balm, 50 ml concentrated skin salve in an amber jar",
  },
  'travel-ritual-set': {
    file: 'travel-ritual-set',
    aspect: 1.4906,
    alt: "Dr. Mushtaq's Blackseed Oil Travel Ritual box with five 10 ml vials and a walnut stand",
  },
  'blackseed-oil-softgels': {
    file: 'blackseed-oil-softgels',
    aspect: 1.4906,
    alt: "Dr. Mushtaq's Blackseed Oil Softgels, 90 count at 500 mg, in an amber bottle",
  },
  'collection-flatlay': {
    file: 'collection-flatlay',
    aspect: 1.8338,
    alt: "Dr. Mushtaq's full blackseed collection flat-lay with oil, balm, travel vials and thymoquinone reference card",
  },
}

// Optional aliases so existing product ids/slugs in src/data/products.js resolve
// without renaming anything there. Add entries as needed.
export const IMAGE_ALIASES = {
  'finishing-oil': 'culinary-finishing-oil',
  'culinary-oil': 'culinary-finishing-oil',
  'immunity-tea': 'blackseed-immunity-tea',
  tea: 'blackseed-immunity-tea',
  'oral-gel': 'blackseed-miswak-oral-gel',
  toothpaste: 'blackseed-miswak-oral-gel',
  'cleansing-bar': 'blackseed-cleansing-bar',
  soap: 'blackseed-cleansing-bar',
  'sidr-honey': 'blackseed-sidr-honey',
  honey: 'blackseed-sidr-honey',
  'beard-serum': 'scalp-beard-serum',
  serum: 'scalp-beard-serum',
  balm: 'blackseed-balm',
  'travel-set': 'travel-ritual-set',
  softgels: 'blackseed-oil-softgels',
  capsules: 'blackseed-oil-softgels',
  'gift-box': 'gift-set',
  hero: 'collection-flatlay',
  collection: 'collection-flatlay',
}

export function resolveSlug(slug) {
  if (!slug) return null
  const key = String(slug).toLowerCase()
  if (PRODUCT_IMAGES[key]) return key
  return IMAGE_ALIASES[key] || null
}

export function getProductImage(slug) {
  const key = resolveSlug(slug)
  if (!key) return null
  const meta = PRODUCT_IMAGES[key]
  return {
    slug: key,
    alt: meta.alt,
    aspect: meta.aspect,
    webp: `${BASE}/${meta.file}.webp`,
    jpg: `${BASE}/${meta.file}.jpg`,
    webpSrcSet: `${BASE}/${meta.file}@800.webp 800w, ${BASE}/${meta.file}.webp 1600w`,
    jpgSrcSet: `${BASE}/${meta.file}@800.jpg 800w, ${BASE}/${meta.file}.jpg 1600w`,
  }
}

export const MEDIA_BASE = BASE
export default PRODUCT_IMAGES

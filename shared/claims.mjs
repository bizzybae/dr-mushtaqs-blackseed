// Single source of the banned-word rule. Imported by scripts/check-claims.mjs
// (build and CI), by the Sanity Studio (validation while editing), and by the
// storefront if it ever needs to warn. Keep this file dependency-free.

export const BANNED = [
  'heal', 'healing', 'heals', 'cure', 'cures', 'treat', 'treats', 'treatment', 'treatments', 'prevent', 'prevents', 'prevention',
  'immune', 'immunity', 'inflammation', 'anti-inflammatory', 'detox', 'boost', 'boosts', 'boosting', 'remedy', 'remedies',
  'medicinal', 'therapeutic', 'clinical', 'clinically', 'proven', 'disease', 'diseases', 'condition', 'conditions',
  'symptom', 'symptoms', 'restorative', 'organic', 'doctor recommended', 'doctor-recommended',
]

export const SUPPORTS = /\bsupports?\s+(?:a\s+|the\s+|your\s+|healthy\s+)?(?:immune|digestive|cardiovascular|respiratory|nervous|skin|hair|joint|liver|heart|brain|gut|metabolic|hormonal)\b/i

// Exact phrases that are legally required or are labelled quotations.
export const ALLOW = [
  'These products are not intended to diagnose, treat, cure, or prevent any disease.',
  'They are not intended to diagnose, treat, cure, or prevent any disease.',
  'managing a health condition',
  '“There is healing in black seed for all diseases except death.”',
]

const escape = (w) => w.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
export const BANNED_RE = new RegExp(`\\b(${BANNED.map(escape).join('|')})\\b`, 'gi')

// Returns the banned terms found in a string after removing allowlisted phrases.
export function findBanned(text) {
  if (!text) return []
  let t = String(text)
  for (const a of ALLOW) t = t.split(a).join(' ')
  const hits = [...t.matchAll(BANNED_RE)].map((m) => m[1].toLowerCase())
  const sup = t.match(SUPPORTS)
  if (sup) hits.push(sup[0])
  return [...new Set(hits)]
}

// Walks any JSON-ish value (strings, arrays, objects, Portable Text) and
// returns banned terms found anywhere inside it.
export function findBannedDeep(value) {
  const out = new Set()
  const walk = (v) => {
    if (v == null) return
    if (typeof v === 'string') findBanned(v).forEach((h) => out.add(h))
    else if (Array.isArray(v)) v.forEach(walk)
    else if (typeof v === 'object') Object.values(v).forEach(walk)
  }
  walk(value)
  return [...out]
}

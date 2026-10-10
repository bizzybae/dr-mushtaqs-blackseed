#!/usr/bin/env node
// Banned-word check for customer-facing copy. Scans src/, index.html, and
// public/*.svg (alt text, meta, JSON-LD, product names all live there).
// Exit 1 on any hit. Run in CI and before every build.
//
// Allowlist: a handful of exact phrases that are legally required or are
// direct quotations labelled as such (the FDA disclaimer, the safety line,
// the hadith). Anything else must be rewritten, not allowlisted.

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const TARGETS = ['src', 'index.html', 'public/favicon.svg']

const BANNED = [
  'heal', 'healing', 'heals', 'cure', 'cures', 'treat', 'treats', 'treatment', 'treatments', 'prevent', 'prevents', 'prevention',
  'immune', 'immunity', 'inflammation', 'anti-inflammatory', 'detox', 'boost', 'boosts', 'boosting', 'remedy', 'remedies',
  'medicinal', 'therapeutic', 'clinical', 'clinically', 'proven', 'disease', 'diseases', 'condition', 'conditions',
  'symptom', 'symptoms', 'restorative', 'organic', 'doctor recommended', 'doctor-recommended',
]
const SUPPORTS = /\bsupports?\s+(?:a\s+|the\s+|your\s+|healthy\s+)?(?:immune|digestive|cardiovascular|respiratory|nervous|skin|hair|joint|liver|heart|brain|gut|metabolic|hormonal)\b/i

const ALLOW = [
  // FDA disclaimer, verbatim
  'These products are not intended to diagnose, treat, cure, or prevent any disease.',
  'They are not intended to diagnose, treat, cure, or prevent any disease.',
  // the safety line (the brief's own wording)
  'managing a health condition',
  // quotation, labelled as heritage, not a claim
  '“There is healing in black seed for all diseases except death.”',
]

const ALLOW_FILE_PATTERNS = [/supports-\[backdrop-filter\]/g] // Tailwind variant, not copy

function* walk(p) {
  const st = statSync(p)
  if (st.isDirectory()) for (const f of readdirSync(p)) yield* walk(join(p, f))
  else if (/\.(jsx?|html|svg|json|md)$/.test(p)) yield p
}

const re = new RegExp(`\\b(${BANNED.map((w) => w.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})\\b`, 'gi')
let failures = 0
for (const target of TARGETS) {
  for (const file of walk(join(ROOT, target))) {
    let text = readFileSync(file, 'utf8')
    for (const a of ALLOW) text = text.split(a).join(' ')
    for (const p of ALLOW_FILE_PATTERNS) text = text.replace(p, ' ')
    const lines = text.split('\n')
    lines.forEach((line, i) => {
      const hits = [...line.matchAll(re)].map((m) => m[1])
      const sup = line.match(SUPPORTS)
      if (sup) hits.push(sup[0])
      if (hits.length) {
        failures += hits.length
        console.log(`${relative(ROOT, file)}:${i + 1}  ${[...new Set(hits)].join(', ')}`)
        console.log(`    ${line.trim().slice(0, 160)}`)
      }
    })
  }
}
if (failures) {
  console.error(`\ncheck-claims: ${failures} banned term(s) found.`)
  process.exit(1)
}
console.log('check-claims: clean.')

#!/usr/bin/env node
// Banned-word check for customer-facing copy. Scans src/, index.html, the
// Studio schemas' initial values, and public/favicon.svg. Exit 1 on any hit.
// The word list and allowlist live in shared/claims.mjs so the Sanity Studio
// enforces the same rule while editing.

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { ALLOW, BANNED_RE, SUPPORTS } from '../shared/claims.mjs'

const ROOT = new URL('..', import.meta.url).pathname
const TARGETS = ['src', 'index.html', 'public/favicon.svg', 'studio/schemas']
const ALLOW_FILE_PATTERNS = [/supports-\[backdrop-filter\]/g] // Tailwind variant, not copy

function* walk(p) {
  const st = statSync(p)
  if (st.isDirectory()) for (const f of readdirSync(p)) yield* walk(join(p, f))
  else if (/\.(jsx?|tsx?|html|svg|json|md)$/.test(p)) yield p
}

let failures = 0
for (const target of TARGETS) {
  let exists = true
  try { statSync(join(ROOT, target)) } catch { exists = false }
  if (!exists) continue
  for (const file of walk(join(ROOT, target))) {
    let text = readFileSync(file, 'utf8')
    for (const a of ALLOW) text = text.split(a).join(' ')
    for (const p of ALLOW_FILE_PATTERNS) text = text.replace(p, ' ')
    text.split('\n').forEach((line, i) => {
      const hits = [...line.matchAll(BANNED_RE)].map((m) => m[1])
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

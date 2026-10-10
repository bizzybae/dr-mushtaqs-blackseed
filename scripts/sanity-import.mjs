#!/usr/bin/env node
// Builds Sanity documents from the repo copy (src/data/site.js and the
// editorial fields of src/data/catalog.js), writes sanity/import.ndjson, and,
// when SANITY_PROJECT_ID + SANITY_API_TOKEN are set, upserts them.
//
//   node scripts/sanity-import.mjs            # write NDJSON only
//   SANITY_PROJECT_ID=... SANITY_API_TOKEN=... node scripts/sanity-import.mjs --push
//
// Documents are createOrReplace'd by fixed _id, so re-running is idempotent and
// never duplicates. Pass --no-overwrite to only create documents that do not
// exist yet (safe once editors have started changing things in the Studio).

import { mkdirSync, writeFileSync } from 'node:fs'
import { BOTANICALS, PRODUCTS } from '../src/data/catalog.js'
import { COA, CONTACT, FDA_DISCLAIMER, FOUNDER, HADITH, HERITAGE, HOME, NO_MEDICAL_SERVICES, POLICIES, PRACTITIONERS, SAFETY_FAQ, SAFETY_LINE, SITE_FAQ, TRUST } from '../src/data/site.js'
import { findBannedDeep } from '../shared/claims.mjs'

const key = (i) => ({ _key: `k${i}` })
const tb = (arr) => (arr || []).map(([title, body], i) => ({ _type: 'titledBody', ...key(i), title, body }))
const qa = (arr) => (arr || []).map(([q, a], i) => ({ _type: 'qa', ...key(i), q, a }))
const names = (arr) => (arr || []).map(([name, meaning], i) => ({ _type: 'nm', ...key(i), name, meaning }))

const docs = [
  {
    _id: 'siteSettings', _type: 'siteSettings',
    announcementPrelaunch: HOME.announcement.prelaunch, announcementLive: HOME.announcement.live,
    contactEmail: CONTACT.email, safetyLine: SAFETY_LINE, fdaDisclaimer: FDA_DISCLAIMER, noMedicalServices: NO_MEDICAL_SERVICES,
    trust: TRUST.map((t, i) => ({ _type: 'link', ...key(i), label: t.label, to: t.to, external: !!t.external })),
  },
  {
    _id: 'homePage', _type: 'homePage',
    eyebrow: HOME.eyebrow, eyebrowTested: HOME.eyebrowTested, h1a: HOME.h1[0], h1b: HOME.h1[1], sub: HOME.sub,
    ctaPrelaunchPrimary: HOME.cta.prelaunch[0], ctaPrelaunchSecondary: HOME.cta.prelaunch[1], ctaLivePrimary: HOME.cta.live[0], ctaLiveSecondary: HOME.cta.live[1],
    values: tb(HOME.values),
    founderTeaser: { title: HOME.founderTeaser.title, body: HOME.founderTeaser.body, points: HOME.founderTeaser.points },
    heritageTeaser: { title: HOME.heritageTeaser.title, body: HOME.heritageTeaser.body },
    whoFor: tb(HOME.whoFor), finalCtaPrelaunch: HOME.finalCta.prelaunch, finalCtaLive: HOME.finalCta.live,
  },
  {
    _id: 'founderPage', _type: 'founderPage',
    name: FOUNDER.name, shortName: FOUNDER.shortName, role: FOUNDER.role,
    credentials: FOUNDER.credentials.map(([label, detail], i) => ({ _type: 'cred', ...key(i), label, detail })),
    short: FOUNDER.short, lede: FOUNDER.lede, why: FOUNDER.why,
    tested: { title: FOUNDER.tested.title, items: tb(FOUNDER.tested.items) },
    never: { title: FOUNDER.never.title, items: FOUNDER.never.items },
    training: { title: FOUNDER.training.title, items: tb(FOUNDER.training.items) },
    principles: tb(FOUNDER.principles), noMedical: FOUNDER.noMedical, disclosure: FOUNDER.disclosure, qa: qa(FOUNDER.qa),
  },
  { _id: 'heritagePage', _type: 'heritagePage', title: HERITAGE.title, paragraphs: HERITAGE.paragraphs, hadith: { ...HADITH }, names: names(HERITAGE.names) },
  { _id: 'coaGuide', _type: 'coaGuide', title: COA.title, body: COA.body, panel: COA.panel, howToRead: qa(COA.howToRead) },
  { _id: 'practitionersPage', _type: 'practitionersPage', lede: PRACTITIONERS.lede, points: tb(PRACTITIONERS.points), eligible: PRACTITIONERS.eligible },
  { _id: 'safetyPage', _type: 'safetyPage', faq: qa(SAFETY_FAQ) },
  ...SITE_FAQ.map((g, i) => ({ _id: `faq-${g.group.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, _type: 'faqGroup', group: g.group, order: i + 1, items: qa(g.items) })),
  ...Object.entries(POLICIES).map(([slug, p]) => ({ _id: `policy-${slug}`, _type: 'policy', slug: { _type: 'slug', current: slug }, title: p.title, updated: p.updated, sections: tb(p.sections) })),
  ...Object.entries(BOTANICALS).map(([k, b]) => ({ _id: `botanical-${k}`, _type: 'botanical', key: k, name: b.name, latin: b.latin, part: b.part, ayurveda: b.ayurveda, unani: b.unani, tcm: b.tcm, note: b.note })),
  ...PRODUCTS.map((p) => ({
    _id: `product-${p.slug}`, _type: 'productContent', slug: p.slug, name: p.name,
    tagline: p.tagline, short: p.short, long: p.long, intendedUse: p.intendedUse, sensoryLine: p.sensoryLine, sensory: p.sensory,
    howTo: tb(p.howTo), directions: p.directions || [], storage: p.storage, shelfLife: p.shelfLife, faq: qa(p.faq),
  })),
]

// Strip undefined so documents stay tidy.
const clean = (v) => JSON.parse(JSON.stringify(v))
const out = docs.map(clean)

const bad = out.flatMap((d) => findBannedDeep(d).map((h) => `${d._id}: ${h}`))
if (bad.length) {
  console.error('Banned terms in import:\n' + bad.join('\n'))
  process.exit(1)
}

mkdirSync(new URL('../sanity/', import.meta.url), { recursive: true })
writeFileSync(new URL('../sanity/import.ndjson', import.meta.url), out.map((d) => JSON.stringify(d)).join('\n') + '\n')
console.log(`wrote sanity/import.ndjson (${out.length} documents)`)

if (process.argv.includes('--push')) {
  const { createClient } = await import('@sanity/client')
  const projectId = process.env.SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID
  const dataset = process.env.SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production'
  const token = process.env.SANITY_API_TOKEN
  if (!projectId || !token) {
    console.error('SANITY_PROJECT_ID and SANITY_API_TOKEN are required for --push')
    process.exit(1)
  }
  const client = createClient({ projectId, dataset, token, apiVersion: '2025-01-01', useCdn: false })
  const overwrite = !process.argv.includes('--no-overwrite')
  let tx = client.transaction()
  for (const d of out) tx = overwrite ? tx.createOrReplace(d) : tx.createIfNotExists(d)
  const res = await tx.commit()
  console.log(`pushed ${res.results.length} documents to ${projectId}/${dataset} (${overwrite ? 'createOrReplace' : 'createIfNotExists'})`)
}

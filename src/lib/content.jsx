import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { createClient } from '@sanity/client'
import * as DEFAULTS from '../data/site'
import { BOTANICALS as BOTANICAL_DEFAULTS } from '../data/catalog'

// Content layer. Editorial copy comes from Sanity when VITE_SANITY_PROJECT_ID
// is set; otherwise (or until it loads, or if it fails) the storefront renders
// the repo defaults in src/data/site.js. Commerce facts never come from here.

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
const inStudio = typeof window !== 'undefined' && window.self !== window.top

export const sanity = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2025-01-01',
      useCdn: !inStudio,
      perspective: 'published',
      maxRetries: 1,
    })
  : null

const QUERY = `{
  "settings": *[_id == "siteSettings"][0],
  "home": *[_id == "homePage"][0],
  "founder": *[_id == "founderPage"][0]{ ..., "portraitUrl": portrait.asset->url, "portraitAlt": portrait.alt },
  "heritage": *[_id == "heritagePage"][0],
  "coa": *[_id == "coaGuide"][0],
  "practitioners": *[_id == "practitionersPage"][0],
  "safety": *[_id == "safetyPage"][0],
  "faq": *[_type == "faqGroup"] | order(order asc) { group, items },
  "policies": *[_type == "policy"] { "slug": slug.current, title, updated, sections },
  "botanicals": *[_type == "botanical"] { key, name, latin, part, ayurveda, unani, tcm, note },
  "products": *[_type == "productContent"] {
    slug, tagline, short, long, intendedUse, sensoryLine, sensory, howTo, directions, why, storage, shelfLife, faq,
    "gallery": gallery[] { "url": asset->url, alt }
  }
}`

// Helpers that fall back to the default when Sanity has nothing.
const or = (v, d) => (v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0) ? d : v)
const pairs = (arr, d, a = 'title', b = 'body') => (Array.isArray(arr) && arr.length ? arr.map((x) => [x[a], x[b]]) : d)
const qa = (arr, d) => pairs(arr, d, 'q', 'a')

// Shape Sanity documents into exactly the objects src/data/site.js exports, so
// pages do not care where the copy came from.
export function shapeSite(c) {
  if (!c) return { ...DEFAULTS, BOTANICALS: BOTANICAL_DEFAULTS, PRODUCT_CONTENT: {} }
  const s = c.settings || {}
  const h = c.home || {}
  const f = c.founder || {}
  const hp = c.heritage || {}
  const co = c.coa || {}
  const pr = c.practitioners || {}
  const D = DEFAULTS
  const HOME = {
    announcement: { prelaunch: or(s.announcementPrelaunch, D.HOME.announcement.prelaunch), live: or(s.announcementLive, D.HOME.announcement.live) },
    eyebrow: or(h.eyebrow, D.HOME.eyebrow),
    eyebrowTested: or(h.eyebrowTested, D.HOME.eyebrowTested),
    h1: [or(h.h1a, D.HOME.h1[0]), or(h.h1b, D.HOME.h1[1])],
    sub: or(h.sub, D.HOME.sub),
    cta: {
      prelaunch: [or(h.ctaPrelaunchPrimary, D.HOME.cta.prelaunch[0]), or(h.ctaPrelaunchSecondary, D.HOME.cta.prelaunch[1])],
      live: [or(h.ctaLivePrimary, D.HOME.cta.live[0]), or(h.ctaLiveSecondary, D.HOME.cta.live[1])],
    },
    values: pairs(h.values, D.HOME.values),
    founderTeaser: {
      title: or(h.founderTeaser?.title, D.HOME.founderTeaser.title),
      body: or(h.founderTeaser?.body, D.HOME.founderTeaser.body),
      points: or(h.founderTeaser?.points, D.HOME.founderTeaser.points),
    },
    heritageTeaser: { title: or(h.heritageTeaser?.title, D.HOME.heritageTeaser.title), body: or(h.heritageTeaser?.body, D.HOME.heritageTeaser.body) },
    whoFor: pairs(h.whoFor, D.HOME.whoFor),
    finalCta: { prelaunch: or(h.finalCtaPrelaunch, D.HOME.finalCta.prelaunch), live: or(h.finalCtaLive, D.HOME.finalCta.live) },
    lotOne: or(h.lotOne, D.HOME.lotOne),
    subscription: { label: or(h.subscription?.label, D.HOME.subscription.label), note: or(h.subscription?.note, D.HOME.subscription.note) },
    practitionerTeaser: {
      title: or(h.practitionerTeaser?.title, D.HOME.practitionerTeaser.title),
      body: or(h.practitionerTeaser?.body, D.HOME.practitionerTeaser.body),
      points: or(h.practitionerTeaser?.points, D.HOME.practitionerTeaser.points),
      cta: or(h.practitionerTeaser?.cta, D.HOME.practitionerTeaser.cta),
    },
    roadmapTeaser: { title: or(h.roadmapTeaser?.title, D.HOME.roadmapTeaser.title), body: or(h.roadmapTeaser?.body, D.HOME.roadmapTeaser.body), cta: or(h.roadmapTeaser?.cta, D.HOME.roadmapTeaser.cta) },
  }
  const FOUNDER = {
    ...D.FOUNDER,
    name: or(f.name, D.FOUNDER.name),
    shortName: or(f.shortName, D.FOUNDER.shortName),
    role: or(f.role, D.FOUNDER.role),
    credentials: pairs(f.credentials, D.FOUNDER.credentials, 'label', 'detail'),
    short: or(f.short, D.FOUNDER.short),
    lede: or(f.lede, D.FOUNDER.lede),
    why: or(f.why, D.FOUNDER.why),
    tested: { title: or(f.tested?.title, D.FOUNDER.tested.title), items: pairs(f.tested?.items, D.FOUNDER.tested.items) },
    never: { title: or(f.never?.title, D.FOUNDER.never.title), items: or(f.never?.items, D.FOUNDER.never.items) },
    training: { title: or(f.training?.title, D.FOUNDER.training.title), items: pairs(f.training?.items, D.FOUNDER.training.items) },
    principles: pairs(f.principles, D.FOUNDER.principles),
    noMedical: or(f.noMedical, D.FOUNDER.noMedical),
    disclosure: or(f.disclosure, D.FOUNDER.disclosure),
    qa: qa(f.qa, D.FOUNDER.qa),
    // Portrait only from Sanity; the repo ships no photograph of a real person.
    portraitUrl: f.portraitUrl || null,
    portraitAlt: or(f.portraitAlt, `${or(f.name, D.FOUNDER.name)}, founder`),
  }
  const HADITH = {
    narration: D.HADITH.narration, // never editable
    attribution: or(hp.hadith?.attribution, D.HADITH.attribution),
    note: or(hp.hadith?.note, D.HADITH.note),
  }
  const HERITAGE = {
    title: or(hp.title, D.HERITAGE.title),
    paragraphs: or(hp.paragraphs, D.HERITAGE.paragraphs),
    names: pairs(hp.names, D.HERITAGE.names || null, 'name', 'meaning'),
  }
  const COA = { title: or(co.title, D.COA.title), body: or(co.body, D.COA.body), panel: or(co.panel, D.COA.panel || null), howToRead: qa(co.howToRead, D.COA.howToRead) }
  const PRACTITIONERS = { lede: or(pr.lede, D.PRACTITIONERS.lede), points: pairs(pr.points, D.PRACTITIONERS.points), eligible: or(pr.eligible, D.PRACTITIONERS.eligible) }
  const SAFETY_FAQ = qa(c.safety?.faq, D.SAFETY_FAQ)
  const SITE_FAQ = Array.isArray(c.faq) && c.faq.length ? c.faq.map((g) => ({ group: g.group, items: qa(g.items, []) })) : D.SITE_FAQ
  const POLICIES = Array.isArray(c.policies) && c.policies.length ? Object.fromEntries(c.policies.filter((p) => p.slug).map((p) => [p.slug, { title: p.title, updated: p.updated, sections: pairs(p.sections, []) }])) : D.POLICIES
  const TRUST = Array.isArray(s.trust) && s.trust.length ? s.trust.filter((t) => t.label).map((t) => ({ label: t.label, to: t.to, external: !!t.external })) : D.TRUST
  const BOTANICALS = Array.isArray(c.botanicals) && c.botanicals.length ? { ...BOTANICAL_DEFAULTS, ...Object.fromEntries(c.botanicals.filter((b) => b.key).map((b) => [b.key, { ...BOTANICAL_DEFAULTS[b.key], ...Object.fromEntries(Object.entries(b).filter(([k, v]) => k !== 'key' && v)) }])) } : BOTANICAL_DEFAULTS
  const PRODUCT_CONTENT = Object.fromEntries(
    (c.products || []).filter((p) => p.slug).map((p) => [
      p.slug,
      {
        tagline: p.tagline, short: p.short, long: p.long, intendedUse: p.intendedUse, sensoryLine: p.sensoryLine, sensory: p.sensory,
        howTo: Array.isArray(p.howTo) && p.howTo.length ? p.howTo.map((x) => [x.title, x.body]) : undefined,
        directions: Array.isArray(p.directions) && p.directions.length ? p.directions : undefined,
        why: Array.isArray(p.why) && p.why.length ? p.why : undefined,
        storage: p.storage, shelfLife: p.shelfLife,
        faq: Array.isArray(p.faq) && p.faq.length ? p.faq.map((x) => [x.q, x.a]) : undefined,
        galleryUrls: Array.isArray(p.gallery) ? p.gallery.filter((g) => g?.url) : [],
      },
    ])
  )
  return {
    ...D,
    HOME, FOUNDER, HADITH, HERITAGE, COA, PRACTITIONERS, SAFETY_FAQ, SITE_FAQ, POLICIES, TRUST, BOTANICALS, PRODUCT_CONTENT,
    FDA_DISCLAIMER: or(s.fdaDisclaimer, D.FDA_DISCLAIMER),
    NO_MEDICAL_SERVICES: or(s.noMedicalServices, D.NO_MEDICAL_SERVICES),
    SAFETY_LINE: or(s.safetyLine, D.SAFETY_LINE),
    CONTACT: { email: or(s.contactEmail, D.CONTACT.email) },
  }
}

// Overlay Sanity editorial fields onto a catalog product (only non-empty values win).
export function applyProductContent(product, content) {
  if (!content) return product
  const out = { ...product }
  for (const k of ['tagline', 'short', 'long', 'intendedUse', 'sensoryLine', 'sensory', 'howTo', 'directions', 'why', 'storage', 'shelfLife', 'faq']) {
    if (content[k] !== undefined && content[k] !== null && content[k] !== '') out[k] = content[k]
  }
  if (content.galleryUrls?.length) out.galleryUrls = content.galleryUrls
  return out
}

const ContentContext = createContext({ site: shapeSite(null), source: 'static', loading: Boolean(sanity) })

export function ContentProvider({ children }) {
  const [state, setState] = useState({ site: shapeSite(null), source: 'static', loading: Boolean(sanity) })

  useEffect(() => {
    if (!sanity) return
    let cancelled = false
    sanity
      .fetch(QUERY)
      .then((data) => {
        if (cancelled) return
        setState({ site: shapeSite(data), source: 'sanity', loading: false })
      })
      .catch((err) => {
        console.warn('[content] falling back to repo copy:', err?.message || err)
        if (!cancelled) setState((s) => ({ ...s, loading: false }))
      })
    // Inside the Studio's Presentation tool we skip the CDN so edits show on
    // the next load. Click-to-edit overlays (@sanity/visual-editing) need
    // React 19 and are a follow-up.
    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(() => state, [state])
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useSite() {
  return useContext(ContentContext).site
}
export function useContentState() {
  return useContext(ContentContext)
}

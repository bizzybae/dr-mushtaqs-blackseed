import { defineField, defineType } from 'sanity'
import { findBannedDeep } from '../../shared/claims.mjs'

// Every document type carries the same document-level rule: no banned term
// anywhere in its content. The same list runs in CI (scripts/check-claims.mjs),
// so what the Studio blocks, the build also blocks.
const claims = (Rule) =>
  Rule.custom((doc) => {
    if (!doc) return true
    const { _id, _type, _rev, _createdAt, _updatedAt, ...content } = doc
    const hits = findBannedDeep(content)
    return hits.length ? `Contains banned term(s): ${hits.join(', ')}. See COMPLIANCE.md for the rule.` : true
  })

const str = (name, title, opts = {}) => defineField({ name, title, type: 'string', ...opts })
const txt = (name, title, opts = {}) => defineField({ name, title, type: 'text', rows: 4, ...opts })
const list = (name, title, of, opts = {}) => defineField({ name, title, type: 'array', of, ...opts })
const strings = (name, title, opts = {}) => list(name, title, [{ type: 'string' }], opts)

const titledBody = defineType({
  name: 'titledBody',
  title: 'Title and body',
  type: 'object',
  fields: [str('title', 'Title', { validation: (R) => R.required() }), txt('body', 'Body', { rows: 3 })],
  preview: { select: { title: 'title', subtitle: 'body' } },
})

const qa = defineType({
  name: 'qa',
  title: 'Question and answer',
  type: 'object',
  fields: [str('q', 'Question', { validation: (R) => R.required() }), txt('a', 'Answer', { rows: 4, validation: (R) => R.required() })],
  preview: { select: { title: 'q', subtitle: 'a' } },
})

const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [str('label', 'Label'), str('to', 'Path or URL'), defineField({ name: 'external', title: 'Opens outside the site', type: 'boolean', initialValue: false })],
  preview: { select: { title: 'label', subtitle: 'to' } },
})

const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  validation: claims,
  fields: [
    str('announcementPrelaunch', 'Announcement bar (prelaunch)'),
    str('announcementLive', 'Announcement bar (live)'),
    str('contactEmail', 'Contact email'),
    txt('safetyLine', 'Safety line (shown beside every buy button)'),
    txt('fdaDisclaimer', 'FDA disclaimer (footer, verbatim)', { rows: 5 }),
    str('noMedicalServices', 'No medical services line'),
    list('trust', 'Trust strip items', [{ type: 'link' }], { description: 'Shipping, returns, support. Leave out anything not yet decided. No location.' }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
})

const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  validation: claims,
  fields: [
    str('eyebrow', 'Hero eyebrow'),
    str('eyebrowTested', 'Hero eyebrow once a lot is published'),
    str('h1a', 'Headline, line 1'),
    str('h1b', 'Headline, line 2 (italic)'),
    txt('sub', 'Hero paragraph'),
    str('ctaPrelaunchPrimary', 'Primary CTA (prelaunch)'),
    str('ctaPrelaunchSecondary', 'Secondary CTA (prelaunch)'),
    str('ctaLivePrimary', 'Primary CTA (live)'),
    str('ctaLiveSecondary', 'Secondary CTA (live)'),
    list('values', 'Value row (three items)', [{ type: 'titledBody' }], { validation: (R) => R.max(3) }),
    defineField({
      name: 'founderTeaser',
      title: 'Founder teaser',
      type: 'object',
      fields: [str('title', 'Title'), txt('body', 'Body', { rows: 3 }), strings('points', 'Bullet points')],
    }),
    defineField({
      name: 'heritageTeaser',
      title: 'Heritage teaser (two sentences at most)',
      type: 'object',
      fields: [str('title', 'Title'), txt('body', 'Body', { rows: 3, validation: (R) => R.custom((v) => (!v || (v.match(/[.!?](\s|$)/g) || []).length <= 2 ? true : 'Keep the teaser to two sentences.')) })],
    }),
    defineField({
      name: 'seed',
      title: 'The Seed (Nigella sativa section)',
      type: 'object',
      fields: [
        str('eyebrow', 'Eyebrow'),
        str('title', 'Title'),
        txt('body', 'Body', { rows: 4 }),
        list('steps', 'Three steps: flower, capsule, oil (images are fixed)', [{ type: 'titledBody' }], { validation: (R) => R.max(3) }),
        txt('founderNote', 'Founder note (signed)', { rows: 3 }),
      ],
    }),
    defineField({ name: 'journalTeaser', title: 'Journal teaser', type: 'object', fields: [str('title', 'Title'), txt('body', 'Body', { rows: 2 })] }),
    defineField({
      name: 'practitionerTeaser',
      title: 'Practitioner band',
      type: 'object',
      fields: [str('title', 'Title'), txt('body', 'Body', { rows: 3 }), strings('points', 'Points'), str('cta', 'Button label')],
    }),
    defineField({ name: 'subscription', title: 'Monthly delivery option', type: 'object', fields: [str('label', 'Checkbox label'), str('note', 'Note under the checkbox')] }),
    list('whoFor', 'Who it is for (four tiles)', [{ type: 'titledBody' }], { validation: (R) => R.max(4) }),
    str('finalCtaPrelaunch', 'Final CTA (prelaunch)'),
    str('finalCtaLive', 'Final CTA (live)'),
  ],
  preview: { prepare: () => ({ title: 'Home page' }) },
})

const founderPage = defineType({
  name: 'founderPage',
  title: 'Dr. Mushtaq (about)',
  type: 'document',
  validation: claims,
  fields: [
    str('name', 'Full name with credentials'),
    str('shortName', 'Short name'),
    str('role', 'Role line'),
    list('credentials', 'Credentials (from public records only)', [{ type: 'object', name: 'cred', fields: [str('label', 'Label'), str('detail', 'Detail')], preview: { select: { title: 'label', subtitle: 'detail' } } }]),
    txt('short', 'One-paragraph introduction'),
    str('lede', 'Lede (one line)'),
    list('why', 'Why I started it (paragraphs)', [{ type: 'text' }]),
    defineField({ name: 'tested', title: 'What gets tested', type: 'object', fields: [str('title', 'Title'), list('items', 'Items', [{ type: 'titledBody' }])] }),
    defineField({ name: 'never', title: 'What never goes on the label', type: 'object', fields: [str('title', 'Title'), strings('items', 'Items')] }),
    defineField({ name: 'training', title: 'How my training shows up', type: 'object', fields: [str('title', 'Title'), list('items', 'Items', [{ type: 'titledBody' }])] }),
    list('principles', 'Five rules', [{ type: 'titledBody' }], { validation: (R) => R.max(5) }),
    str('noMedical', 'No medical services line'),
    txt('disclosure', 'Founder disclosure', { rows: 5 }),
    list('qa', 'Straight answers', [{ type: 'qa' }]),
    defineField({ name: 'portrait', title: 'Portrait photograph', type: 'image', options: { hotspot: true }, fields: [str('alt', 'Alt text')], description: 'A real photograph of the founder. Shown on the home page and the founder page when set.' }),
  ],
  preview: { prepare: () => ({ title: 'Dr. Mushtaq (about)' }) },
})

const heritagePage = defineType({
  name: 'heritagePage',
  title: 'Heritage',
  type: 'document',
  validation: claims,
  fields: [
    str('title', 'Title'),
    list('paragraphs', 'Paragraphs', [{ type: 'text' }]),
    defineField({
      name: 'hadith',
      title: 'The narration',
      type: 'object',
      description: 'Quoted for heritage, labelled as not a claim. Do not edit the wording of the narration itself.',
      fields: [str('narration', 'Narration', { readOnly: true }), str('attribution', 'Attribution'), txt('note', 'Framing note')],
    }),
    list('names', 'Where the names come from', [{ type: 'object', name: 'nm', fields: [str('name', 'Name'), str('meaning', 'Meaning')], preview: { select: { title: 'name', subtitle: 'meaning' } } }]),
  ],
  preview: { prepare: () => ({ title: 'Heritage' }) },
})

const coaGuide = defineType({
  name: 'coaGuide',
  title: 'Lab reports page',
  type: 'document',
  validation: claims,
  fields: [str('title', 'Title'), txt('body', 'Intro'), strings('panel', 'Panel items'), list('howToRead', 'How to read this (chemistry only)', [{ type: 'qa' }])],
  preview: { prepare: () => ({ title: 'Lab reports page' }) },
})

const practitionersPage = defineType({
  name: 'practitionersPage',
  title: 'Practitioners',
  type: 'document',
  validation: claims,
  fields: [txt('lede', 'Lede', { rows: 2 }), list('points', 'Points', [{ type: 'titledBody' }]), txt('eligible', 'Who is eligible', { rows: 3 })],
  preview: { prepare: () => ({ title: 'Practitioners' }) },
})

const safetyPage = defineType({
  name: 'safetyPage',
  title: 'Safety',
  type: 'document',
  validation: claims,
  fields: [list('faq', 'Safety questions', [{ type: 'qa' }])],
  preview: { prepare: () => ({ title: 'Safety' }) },
})

const faqGroup = defineType({
  name: 'faqGroup',
  title: 'FAQ group',
  type: 'document',
  validation: claims,
  fields: [str('group', 'Group title', { validation: (R) => R.required() }), defineField({ name: 'order', title: 'Order', type: 'number' }), list('items', 'Questions', [{ type: 'qa' }])],
  preview: { select: { title: 'group' } },
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
})

const policy = defineType({
  name: 'policy',
  title: 'Policy',
  type: 'document',
  validation: claims,
  fields: [
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (R) => R.required() }),
    str('title', 'Title', { validation: (R) => R.required() }),
    str('updated', 'Updated (shown to customers)'),
    list('sections', 'Sections', [{ type: 'titledBody' }]),
  ],
  preview: { select: { title: 'title', subtitle: 'updated' } },
})

const botanical = defineType({
  name: 'botanical',
  title: 'Botanical',
  type: 'document',
  validation: claims,
  fields: [
    str('key', 'Key (matches the catalog)', { validation: (R) => R.required() }),
    str('name', 'Name'),
    str('latin', 'Latin binomial'),
    str('part', 'Part used'),
    str('ayurveda', 'Ayurveda'),
    str('unani', 'Unani / Tibb'),
    str('tcm', 'Chinese medicine'),
    txt('note', 'Note (material facts only, no uses)', { rows: 3 }),
  ],
  preview: { select: { title: 'name', subtitle: 'latin' } },
})

const productContent = defineType({
  name: 'productContent',
  title: 'Product copy',
  type: 'document',
  validation: claims,
  description: 'Editorial fields only. Prices, sizes, status, and lot data live in the commerce database.',
  fields: [
    str('slug', 'Product slug (matches the catalog)', { validation: (R) => R.required() }),
    str('name', 'Product name (reference only)', { readOnly: true }),
    str('tagline', 'Tagline'),
    txt('short', 'Short description', { rows: 3 }),
    txt('long', 'Long description', { rows: 6 }),
    str('intendedUse', 'What it is for (one line)', { description: 'Rendered as the "What it’s for" block under the price.' }),
    str('sensoryLine', 'Sensory line (one line)'),
    txt('sensory', 'Sensory notes', { rows: 3 }),
    list('howTo', 'How to enjoy it (cards)', [{ type: 'titledBody' }], { validation: (R) => R.max(3) }),
    strings('directions', 'How to use (numbered steps)'),
    strings('why', 'Why it suits your skin (one line per hero botanical)', { description: 'Appearance and feel only: how skin or hair looks and feels. No health or medical language; the banned-word rule applies. Overrides the approved cosmetic claims in the commerce database for this product.' }),
    str('storage', 'Storage'),
    str('shelfLife', 'Shelf life'),
    list('faq', 'Questions about this one', [{ type: 'qa' }]),
    list('gallery', 'Gallery images', [{ type: 'image', options: { hotspot: true }, fields: [str('alt', 'Alt text')] }], { description: 'Front label, back label, oil macro, in hand, packaging. Replace AI renders with photographs before launch.' }),
  ],
  preview: { select: { title: 'name', subtitle: 'slug' } },
})

// Journal: one post per botanical or topic. Body is plain paragraphs (no rich
// text) so the claims rule can read every sentence. Repo posts in
// src/data/journal.js are the floor; a Sanity post with the same slug replaces it.
const journalPost = defineType({
  name: 'journalPost',
  title: 'Journal post',
  type: 'document',
  validation: claims,
  fields: [
    str('title', 'Title', { validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (R) => R.required() }),
    txt('deck', 'Deck (one or two sentences)', { rows: 2 }),
    str('botanical', 'Botanical key', { description: 'blackseed, saffron, grapevine, rose, amla, sesame, oud, sandalwood, vetiver, frankincense, rosemary. Leave empty for a topic post.' }),
    strings('products', 'Product slugs where this botanical is used'),
    defineField({ name: 'published', title: 'Published date', type: 'date' }),
    defineField({ name: 'order', title: 'Order (lower first)', type: 'number' }),
    str('readingTime', 'Reading time (e.g. 4 min)'),
    strings('body', 'Body paragraphs'),
    txt('founderNote', 'A note from Dr. Mushtaq', { rows: 3 }),
    list('sources', 'Sources', [{ type: 'object', name: 'src', fields: [str('label', 'Label'), str('url', 'URL')], preview: { select: { title: 'label', subtitle: 'url' } } }]),
    str('imageSlug', 'Repo image slug', { description: 'A slug from public/products (e.g. saffron). Ignored when a photograph is uploaded below.' }),
    defineField({ name: 'image', title: 'Photograph', type: 'image', options: { hotspot: true }, fields: [str('alt', 'Alt text')] }),
  ],
  preview: { select: { title: 'title', subtitle: 'botanical' } },
})

export const SINGLETONS = [
  { id: 'siteSettings', type: 'siteSettings', title: 'Site settings' },
  { id: 'homePage', type: 'homePage', title: 'Home page' },
  { id: 'founderPage', type: 'founderPage', title: 'Dr. Mushtaq (about)' },
  { id: 'heritagePage', type: 'heritagePage', title: 'Heritage' },
  { id: 'coaGuide', type: 'coaGuide', title: 'Lab reports page' },
  { id: 'practitionersPage', type: 'practitionersPage', title: 'Practitioners' },
  { id: 'safetyPage', type: 'safetyPage', title: 'Safety' },
]

export const schemaTypes = [titledBody, qa, link, siteSettings, homePage, founderPage, heritagePage, coaGuide, practitionersPage, safetyPage, faqGroup, policy, botanical, productContent, journalPost]

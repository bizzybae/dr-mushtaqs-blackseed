// Source of truth for the five-product catalog.
// `scripts/seed-sql.mjs` turns this file into SQL for Supabase, and the
// storefront falls back to it whenever Supabase is unreachable, so the site
// never renders an empty shelf.

export const BRAND = {
  name: 'Dr. Mushtaq’s',
  line: 'Blackseed',
  tagline: 'The Molecule, Not the Myth.',
  spec: 'Standardized to 4.64% thymoquinone',
  origin: 'Ethiopian Nigella sativa',
}

// The three label marks printed on every product, in label order.
export const LABEL_BADGES = [
  { key: 'cold_pressed', label: 'Cold-Pressed', detail: 'Pressed below 40 °C, unrefined, unfiltered beyond settling.' },
  { key: 'ethiopian_origin', label: 'Ethiopian Origin', detail: 'Single-origin Nigella sativa seed from Ethiopian growers.' },
  { key: 'third_party_tested', label: 'Third-Party Tested', detail: 'Every lot is tested by an independent laboratory.' },
]

export const IMAGES = {
  'blackseed-oil': { aspect: 1.8333, alt: 'Dr. Mushtaq’s Blackseed Oil, 100 mL amber dropper bottle on marble beside Nigella sativa flowers and seeds' },
  'travel-ritual': { aspect: 1.4906, alt: 'Dr. Mushtaq’s Blackseed Oil Travel Ritual: black and gold box with five 10 mL vials and a walnut stand' },
  'blackseed-oil-softgels': { aspect: 1.4906, alt: 'Dr. Mushtaq’s Blackseed Oil Softgels, 90 count at 500 mg, amber bottle beside a brass dish of softgels' },
  'blackseed-balm': { aspect: 1.4906, alt: 'Dr. Mushtaq’s Blackseed Balm, 50 mL amber jar with the lid off showing the salve' },
  'scalp-beard-serum': { aspect: 1.8333, alt: 'Dr. Mushtaq’s Scalp & Beard Serum, 60 mL dropper bottle with a drop suspended, beside a black comb' },
  'culinary-finishing-oil': { aspect: 1.4906, alt: 'Dr. Mushtaq’s Culinary Finishing Oil, 250 mL amber bottle with gold pour spout beside a dish of oil and seeds' },
  'collection-flatlay': { aspect: 1.8338, alt: 'Dr. Mushtaq’s collection on marble: oil, balm, sample vials, botanical card, brass dishes and mortar' },
  'collection-gift-set': { aspect: 1.7917, alt: 'Dr. Mushtaq’s gift presentation: black box with gold interior, oil, balm, vials and botanical card' },
}

export const PRODUCTS = [
  {
    slug: 'blackseed-oil',
    sort: 1,
    name: 'Blackseed Oil',
    subtitle: 'Cold-pressed Nigella sativa seed oil',
    tagline: 'The original. One seed, one press, one number on the label.',
    category: 'oil',
    productType: 'supplement',
    featured: true,
    image: 'blackseed-oil',
    gallery: ['blackseed-oil', 'collection-gift-set', 'collection-flatlay'],
    short:
      'Single-origin Ethiopian Nigella sativa, cold-pressed and standardized to 4.64% thymoquinone. Amber glass, glass dropper, lot number on every bottle.',
    long:
      'Most blackseed oil is sold on folklore. Ours is sold on a number. Every lot of Dr. Mushtaq’s Blackseed Oil is pressed from a single Ethiopian harvest, held below 40 °C, and released only after an independent laboratory confirms thymoquinone at 4.64%. The oil is unrefined and unblended, so the color, aroma, and peppery finish are the seed’s own.',
    ingredients: 'Nigella sativa (black seed) oil.',
    specs: [
      ['Botanical', 'Nigella sativa L., seed'],
      ['Origin', 'Ethiopia, single harvest per lot'],
      ['Process', 'Cold-pressed below 40 °C, unrefined'],
      ['Standardization', 'Thymoquinone 4.64% by HPLC'],
      ['Packaging', 'Amber glass, glass dropper, tamper band'],
      ['Storage', 'Cool, dark place. Refrigerate after opening.'],
    ],
    howToUse: [
      'Shake gently. The oil is unfiltered and may show natural sediment.',
      'Take one full dropper (about 1 mL) daily, or as directed by your clinician.',
      'Hold under the tongue for a moment before swallowing, or stir into warm water with honey.',
    ],
    faq: [
      ['Why 4.64%?', 'Thymoquinone is the most studied constituent of Nigella sativa oil and the clearest marker of seed quality and pressing care. 4.64% is the concentration our Ethiopian seed consistently reaches when pressed cold and released fresh. We print it so you can compare.'],
      ['Does it taste strong?', 'Yes. Honest blackseed oil is peppery, slightly bitter, and aromatic. A bland oil has usually been refined, diluted, or stored too long.'],
      ['How long does a bottle last?', 'At one dropper a day, the 100 mL bottle lasts roughly three months. Refrigerate after opening.'],
    ],
    safety:
      'For adults. Consult a qualified clinician before use if you are pregnant or nursing, taking medication, managing a medical condition, scheduled for a procedure, or considering use for a child. Discontinue and seek advice if any adverse reaction occurs.',
    variants: [
      { sku: 'DM-BSO-100', label: '100 mL', format: 'Dropper bottle', sizeMl: 100, priceCents: 3800, default: true, image: 'blackseed-oil', description: 'The full-size bottle. About 100 droppers.' },
      { sku: 'DM-BSO-TR5', label: 'Travel Ritual', format: '5 × 10 mL', sizeMl: 50, priceCents: 3400, image: 'travel-ritual', description: 'Five 10 mL vials in a rigid magnetic box with a walnut stand. For travel, gifting, or a first trial.' },
    ],
  },
  {
    slug: 'blackseed-oil-softgels',
    sort: 2,
    name: 'Blackseed Oil Softgels',
    subtitle: '90 softgels · 500 mg',
    tagline: 'The same oil, measured.',
    category: 'softgel',
    productType: 'supplement',
    featured: true,
    image: 'blackseed-oil-softgels',
    gallery: ['blackseed-oil-softgels', 'collection-flatlay'],
    short:
      'Our 4.64% thymoquinone oil, 500 mg per softgel, for people who want the measure without the taste. Ninety softgels per amber bottle.',
    long:
      'The softgel exists for one reason: not everyone wants to taste blackseed oil every morning. Each softgel carries 500 mg of the same lot-tested, cold-pressed Ethiopian oil that goes into the dropper bottle, sealed in a shell that protects it from light and air until you take it.',
    ingredients: 'Nigella sativa (black seed) oil. Softgel shell: bovine gelatin (halal), glycerin, purified water.',
    specs: [
      ['Count', '90 softgels'],
      ['Fill', '500 mg Nigella sativa seed oil per softgel'],
      ['Standardization', 'Thymoquinone 4.64% by HPLC (oil fill)'],
      ['Shell', 'Halal bovine gelatin, glycerin, water'],
      ['Free from', 'Fillers, flow agents, artificial colors'],
      ['Packaging', 'Amber glass, induction seal, desiccant'],
    ],
    howToUse: [
      'Take two softgels daily with food, or as directed by your clinician.',
      'Store below 25 °C with the lid tight. Do not refrigerate; condensation softens the shell.',
    ],
    faq: [
      ['Is the shell halal?', 'Yes. The gelatin is bovine and halal-certified. Certification documents are available on request and will be attached to each lot record.'],
      ['Two softgels equals how much oil?', 'Two softgels deliver 1,000 mg of oil, roughly one full dropper of the liquid.'],
    ],
    safety:
      'For adults. Consult a qualified clinician before use if you are pregnant or nursing, taking medication, managing a medical condition, scheduled for a procedure, or considering use for a child. Keep out of reach of children.',
    variants: [
      { sku: 'DM-SG-90', label: '90 softgels', format: 'Amber bottle', priceCents: 3200, default: true, image: 'blackseed-oil-softgels', description: 'A 45-day supply at two softgels daily.' },
    ],
  },
  {
    slug: 'blackseed-balm',
    sort: 3,
    name: 'Blackseed Balm',
    subtitle: 'Concentrated skin salve · 50 mL',
    tagline: 'A dense, slow-melting salve for dry places.',
    category: 'topical',
    productType: 'cosmetic',
    featured: true,
    image: 'blackseed-balm',
    gallery: ['blackseed-balm', 'collection-gift-set'],
    short:
      'Blackseed oil folded into beeswax, shea, and jojoba. A rich, anhydrous balm for hands, elbows, heels, cuticles, and anywhere skin runs dry.',
    long:
      'The balm is our oil in its most patient form. Beeswax and shea slow it down so it stays where you put it; jojoba carries it in. There is no water, so there is no need for preservatives, and no fragrance beyond the seed’s own warm, peppery note.',
    ingredients:
      'Butyrospermum parkii (shea) butter, Simmondsia chinensis (jojoba) seed oil, Cera alba (beeswax), Nigella sativa (black seed) oil, Tocopherol (vitamin E).',
    specs: [
      ['Format', 'Anhydrous balm'],
      ['Net contents', '50 mL / 1.7 fl oz'],
      ['Blackseed oil', 'Thymoquinone-standardized 4.64% oil'],
      ['Fragrance', 'None added'],
      ['Water', 'None; no preservatives required'],
      ['Packaging', 'Amber glass jar, black ribbed cap'],
    ],
    howToUse: [
      'Warm a small amount between fingertips until it melts.',
      'Press into clean, dry skin wherever it feels tight: hands, heels, elbows, cuticles, lips.',
      'Use after washing and before bed for the longest contact time.',
    ],
    faq: [
      ['Will it stain?', 'The balm is amber-tinted but absorbs within a few minutes. Let it sink in before dressing.'],
      ['Is it safe for the face?', 'Yes, as a cosmetic moisturizer on dry patches. Patch test first and avoid the eye area.'],
    ],
    safety:
      'For external use only. Patch test before first use. Avoid contact with eyes and broken or irritated skin. Discontinue if irritation occurs. Keep out of reach of children.',
    variants: [
      { sku: 'DM-BALM-50', label: '50 mL', format: 'Glass jar', sizeMl: 50, priceCents: 2600, default: true, image: 'blackseed-balm', description: 'Several months of daily hand and heel care.' },
    ],
  },
  {
    slug: 'scalp-beard-serum',
    sort: 4,
    name: 'Scalp & Beard Serum',
    subtitle: 'Blackseed · Rosemary · 60 mL',
    tagline: 'Light enough for the scalp, rich enough for the beard.',
    category: 'hair',
    productType: 'cosmetic',
    featured: true,
    image: 'scalp-beard-serum',
    gallery: ['scalp-beard-serum', 'collection-flatlay'],
    short:
      'Our blackseed oil cut with jojoba and grapeseed and finished with rosemary leaf oil. A fast-absorbing conditioning serum for scalp, beard, and the skin beneath.',
    long:
      'A grooming oil has two jobs: condition the hair and leave the skin under it calm. Jojoba mirrors the skin’s own sebum, grapeseed keeps the texture light, blackseed brings its warm aroma, and rosemary gives the finish its clean herbal lift. It absorbs without a film and does not weigh fine hair down.',
    ingredients:
      'Simmondsia chinensis (jojoba) seed oil, Vitis vinifera (grape) seed oil, Nigella sativa (black seed) oil, Rosmarinus officinalis (rosemary) leaf oil, Tocopherol (vitamin E).',
    specs: [
      ['Format', 'Leave-on oil serum'],
      ['Net contents', '60 mL / 2 fl oz'],
      ['Blackseed oil', 'Thymoquinone-standardized 4.64% oil'],
      ['Aroma', 'Rosemary leaf oil and the seed’s own note; no synthetic fragrance'],
      ['Finish', 'Dry, non-greasy'],
      ['Packaging', 'Amber glass, glass dropper'],
    ],
    howToUse: [
      'Beard: dispense 3 to 5 drops into palms, rub to warm, work from skin outward, then comb.',
      'Scalp: part hair and apply a few drops directly to the scalp. Massage for a minute. Leave in or rinse after 30 minutes.',
      'Use daily or as needed. A little goes a long way.',
    ],
    faq: [
      ['Does it help hair grow?', 'We do not make that claim. This is a cosmetic conditioning serum. It softens hair, calms the skin beneath, and leaves a clean rosemary finish.'],
      ['Can I use it on my face after shaving?', 'Yes, sparingly, as a conditioning oil. Patch test first.'],
    ],
    safety:
      'For external use only. Patch test before first use. Avoid contact with eyes. Do not apply to broken or irritated skin. Discontinue if irritation occurs.',
    variants: [
      { sku: 'DM-SRM-60', label: '60 mL', format: 'Dropper bottle', sizeMl: 60, priceCents: 3000, default: true, image: 'scalp-beard-serum', description: 'Two to three months of daily beard use.' },
    ],
  },
  {
    slug: 'culinary-finishing-oil',
    sort: 5,
    name: 'Culinary Finishing Oil',
    subtitle: 'Cold-pressed blackseed · 250 mL',
    tagline: 'Peppery, warm, meant to be tasted.',
    category: 'culinary',
    productType: 'food',
    featured: true,
    image: 'culinary-finishing-oil',
    gallery: ['culinary-finishing-oil', 'collection-flatlay'],
    short:
      'The same cold-pressed Ethiopian oil in a kitchen bottle with a gold pour spout. Finish lentils, flatbreads, labneh, roasted vegetables, and eggs.',
    long:
      'Blackseed has been a pantry oil for far longer than it has been a supplement. This is the pressing we are proudest of, in a 250 mL bottle made to live beside your olive oil. It is not for frying. A thin thread over a finished plate is where it belongs: on hummus, over dal, into a yogurt dip, across warm bread.',
    ingredients: 'Nigella sativa (black seed) oil.',
    specs: [
      ['Use', 'Finishing oil; do not heat'],
      ['Net contents', '250 mL / 8.4 fl oz'],
      ['Origin', 'Ethiopia, single harvest per lot'],
      ['Process', 'Cold-pressed below 40 °C, unrefined'],
      ['Flavor', 'Peppery, warm, faint oregano and cumin'],
      ['Packaging', 'Amber glass, stainless pour spout'],
    ],
    howToUse: [
      'Drizzle over finished dishes just before serving.',
      'Pairs with lentils, chickpeas, labneh, roasted squash, eggs, and flatbread.',
      'Store sealed in a cool cupboard. Use within three months of opening.',
    ],
    faq: [
      ['Can I cook with it?', 'Treat it like a delicate extra-virgin oil: finish with it, do not fry with it. Heat dulls the aroma.'],
      ['Is it the same oil as the dropper bottle?', 'Yes. Same seed, same press, same lot testing. The difference is the bottle and the spout.'],
    ],
    safety: 'Contains no major allergens. Store away from heat and light. Natural sediment is normal.',
    variants: [
      { sku: 'DM-CFO-250', label: '250 mL', format: 'Pour-spout bottle', sizeMl: 250, priceCents: 2400, default: true, image: 'culinary-finishing-oil', description: 'About fifty servings of a finishing drizzle.' },
    ],
  },
]

export const PROTOCOL = [
  { step: '01', time: 'Morning', product: 'blackseed-oil', note: 'One dropper, under the tongue or in warm water.' },
  { step: '02', time: 'With breakfast', product: 'blackseed-oil-softgels', note: 'Two softgels on days you travel or skip the dropper.' },
  { step: '03', time: 'After the shower', product: 'scalp-beard-serum', note: 'A few drops through the beard or into the scalp.' },
  { step: '04', time: 'At the table', product: 'culinary-finishing-oil', note: 'A thread over lentils, eggs, or warm bread.' },
  { step: '05', time: 'Before bed', product: 'blackseed-balm', note: 'Pressed into hands, heels, and cuticles.' },
]

export function getProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || null
}

export function defaultVariant(product) {
  return product.variants.find((v) => v.default) || product.variants[0]
}

export function priceFrom(product) {
  return Math.min(...product.variants.map((v) => v.priceCents))
}

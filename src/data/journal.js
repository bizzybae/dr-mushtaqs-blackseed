// The Journal: one short, sourced note per botanical in the shelf. Each post
// says what the plant is, where it grows, which part we use, and which
// products it goes into. Nothing here is a health claim; see COMPLIANCE.md.
// Sanity (journalPost) can replace any post by slug or add new ones; this file
// is the floor the storefront always has.
//
//   image      a slug in public/products (IMAGES in catalog.js)
//   botanical  key in BOTANICALS; posts for a product's botanicals show on its page
//   covers     extra botanical keys the post also speaks for (the resins post)
//   products   product slugs where the botanical is used (the "where it goes" list)
//   body       plain paragraphs; the claims check reads every sentence
//   sources    [label, url] pairs rendered under the post

export const JOURNAL = [
  {
    slug: 'nigella-sativa-from-flower-to-oil',
    title: 'Nigella sativa, from flower to oil',
    deck: 'The plant behind every bottle: a small annual in the buttercup family, its horned capsule, the black seed inside it, and what happens between the field and the press.',
    botanical: 'blackseed',
    products: ['blackseed-oil', 'blackseed-oil-softgels', 'culinary-finishing-oil'],
    published: '2026-10-11',
    readingTime: '5 min',
    image: 'seed-flower',
    body: [
      'Nigella sativa is an annual herb in the buttercup family, Ranunculaceae. Kew’s Plants of the World Online gives its native range as Romania to western and south-western Iran, and it has long since been grown far beyond that, across the Middle East, North Africa, and South Asia. It is a modest plant: twenty to thirty centimetres tall, with finely divided leaves and a single flower per stem.',
      'The flower is the part most people have never seen. It opens pale blue to white, with five to ten petals around a ring of stamens, and lasts only a few days. When it fades it leaves a swollen, horned capsule made of several fused follicles. The capsule dries on the plant and the seeds, matte black and sharply angular, sit in chambers inside it. They are harvested when the capsule is dry and before it splits.',
      'The names tell you how far it has travelled: kalonji in Hindi and Urdu, habbat al-sauda in Arabic, çörek otu in Turkish, black cumin or black caraway in English, though it is related to neither cumin nor caraway. In the Greco-Arabic tradition it was melanthion. The seed appears in Islamic tradition as well; we keep that story on its own page, in its own words.',
      'We press the seed cold, below 40 °C, with nothing added and nothing removed afterwards. The oil that comes off the press is dark amber, peppery, and faintly of oregano. That aroma is largely thymoquinone and its relatives, which is why thymoquinone is the first line on every lot certificate. The amount varies with the seed, the harvest, and the press, which is why we publish the number per lot rather than printing one figure for all time.',
      'What a certificate adds to the plant is a way to judge it. Fatty-acid profile confirms the oil is what it says; peroxide value says how fresh it is; the metals and microbial lines say it is clean. Together they are the difference between a bottle you take on faith and a bottle you can read.',
    ],
    founderNote: 'If you learn one plant on this site, learn this one. Once you can picture the flower, the capsule, and the seed, and you know what a certificate measures, you can judge any blackseed oil, including mine.',
    sources: [
      ['Kew Science, Plants of the World Online: Nigella sativa L.', 'https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:711687-1'],
      ['GBIF: Nigella sativa L., description and distribution', 'https://www.gbif.org/species/165712447'],
    ],
  },
  {
    slug: 'saffron-forty-days-in-the-oil',
    title: 'Saffron, forty days in the oil',
    deck: 'Three stigmas per flower, picked at dawn for a few weeks each autumn. Why we buy whole threads and how they end up in blackseed oil.',
    botanical: 'saffron',
    products: ['golden-hour-saffron-infusion', 'saffron-radiance-face-oil', 'saffron-blackseed-eye-concentrate', 'kesar-rose-attar', 'saffron-sesame-body-oil'],
    published: '2026-10-11',
    readingTime: '4 min',
    image: 'saffron',
    body: [
      'Saffron is the dried stigma of Crocus sativus, a corm-grown crocus in the iris family. Kew records it as a cultigen from Greece: a plant known only in cultivation, with no wild population. It is sterile, so it is never grown from seed; every field is planted by dividing corms by hand.',
      'The flower opens in autumn, lilac to mauve, and each one carries exactly three red stigmas. They are picked at dawn before the flower opens fully, then the stigmas are separated and dried the same day. Around 150,000 flowers go into a kilogram of dried saffron, which is why it has been the most expensive spice by weight for as long as there have been price lists.',
      'We buy whole threads, never powder, because a thread can be inspected and a powder cannot. Colour comes from crocin, bitterness from picrocrocin, and the hay-like aroma from safranal; we ask the grower for the grade and keep the paperwork with the lot.',
      'In the shelf saffron appears as an infusion: the threads sit in cold-pressed blackseed oil for forty days, out of the light, and are then strained out. That is the base of Golden Hour, the Saffron Radiance Face Oil, and the Eye Concentrate. In Kesar Rose it is a note rather than an ingredient, carried on sandalwood and rose. The infusion is a colour and an aroma; the blackseed oil underneath it is still the one tested on every lot.',
    ],
    founderNote: 'Saffron is the ingredient most often faked, so it is the one I document hardest. Whole threads, a named grower, a grade on paper, and forty days in oil that was already tested.',
    sources: [
      ['Kew Science, Plants of the World Online: Crocus sativus L.', 'https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:436688-1'],
      ['Osmetheca, perfumery raw materials: Saffron', 'https://osmetheca.be/en/encyclopedia/safran.html'],
    ],
  },
  {
    slug: 'amla-the-sunday-oiling',
    title: 'Amla, the Sunday oiling',
    deck: 'A small green fruit from a tree native to tropical Asia, dried in the sun and infused slowly in oil the way a hair oil has always been made.',
    botanical: 'amla',
    products: ['amla-blackseed-hair-oil', 'the-hair-ritual'],
    published: '2026-10-11',
    readingTime: '3 min',
    image: 'amla',
    body: [
      'Amla is the fruit of Phyllanthus emblica, a tree of one to eight metres with a wide, low canopy, native to tropical and subtropical Asia from Pakistan and India east to southern China and Indonesia. The leaves are small and close-set along long branchlets, so a branch looks feathered. Kew describes the fruit as round, about two centimetres across, green-yellow with six lighter vertical stripes; cut one open and the stone shows a six-point star.',
      'In Ayurveda it is amalaki; in Unani, amla; in Chinese materia medica, yu gan zi. In every one of those traditions the fruit was dried and worked into oil, and that is exactly what the Amla Blackseed Hair Oil is: sun-dried fruit, infused slowly in cold-pressed sesame and blackseed oil, then strained.',
      'Fresh amla is sharply sour and astringent. Dried, it loses most of that bite and gives the oil a faint fruit note under the pepper of the seed. It goes on the scalp and lengths before washing, left for twenty minutes or overnight, which is the weekly rhythm people mean when they say Sunday oiling.',
    ],
    founderNote: 'My grandmother’s hair oil was amla in sesame. We kept the method and added the seed, and we test the seed.',
    sources: [
      ['Kew Science, Plants of the World Online: Phyllanthus emblica L.', 'https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:353838-1'],
      ['Kew: Indian gooseberry, plant description', 'https://www.kew.org/plants/indian-gooseberry'],
    ],
  },
  {
    slug: 'damask-rose-petal-otto-and-infusion',
    title: 'Damask rose: petal, otto, and infusion',
    deck: 'A hybrid rose grown for its scent, harvested before sunrise, and used two ways in the shelf.',
    botanical: 'rose',
    products: ['rose-blackseed-cleansing-oil', 'kesar-rose-attar', 'the-skin-ritual'],
    published: '2026-10-11',
    readingTime: '3 min',
    image: 'rose',
    body: [
      'The Damask rose is written Rosa × damascena, the cross marking it as a hybrid. Kew gives the parentage as Rosa gallica × Rosa moschata. It is a shrub rose with loose, many-petalled pink flowers and a scent strong enough that whole valleys in Bulgaria, Turkey, and Iran are planted with it for distillation.',
      'The flowers are picked by hand in the early morning, before the sun lifts the volatile oils out of the petals. Steam distillation of the fresh petals yields rose otto, a pale oil that solidifies in the cold, and rose water as a by-product. It takes a great many petals to make a little otto, so it is sold by the gram.',
      'We use the rose two ways. In the Rose Blackseed Cleansing Oil, whole dried petals are infused in the oil and strained, so the rose is a soft note under the seed. In Kesar Rose, a small amount of otto sits on sandalwood with the saffron infusion; the rose there is the heart of the fragrance.',
    ],
    founderNote: 'Rose is the one ingredient I let be beautiful for its own sake. It still rides on the same tested oil.',
    sources: [
      ['Kew Science, Plants of the World Online: Rosa × damascena Herrm.', 'https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:2968261-4'],
    ],
  },
  {
    slug: 'grapevine-seed-leaf-and-shoot',
    title: 'Grapevine: seed, leaf, and shoot',
    deck: 'The same liana that carries wine gives a light seed oil and a vine-shoot extract. Where each goes in the line.',
    botanical: 'grapevine',
    products: ['grapevine-renewal-serum', 'vigne-verte-attar', 'rose-blackseed-cleansing-oil', 'saffron-radiance-face-oil', 'scalp-beard-serum'],
    published: '2026-10-11',
    readingTime: '3 min',
    image: 'grapevine',
    body: [
      'Vitis vinifera is a woody climbing vine, a liana, that can reach fourteen metres along whatever it can grip with its tendrils. Kew notes flaky bark, leaves with three to five lobes, small green-white flowers in clusters, and fruit that ranges from green to deep red depending on the cultivar, of which there are more than five thousand.',
      'We use three parts of the plant. Grape seeds, a by-product of pressing the fruit, are cold-pressed for a thin, dry oil that spreads easily and leaves little behind; it lightens the Renewal Serum and the face oil. The leaf lends the green note that names Vigne Verte. The vine shoot, pruned every winter, is extracted for resveratrol and the related viniferins, which is where most of the plant’s stilbenes sit.',
      'The grapevine is the second most common botanical in the shelf after the seed itself. It is there for texture and for the green, not for a story, and the blackseed oil it is blended into is the oil that was tested.',
    ],
    founderNote: 'Grapeseed is the quiet ingredient. It is how a face oil can feel like nothing while still carrying the seed.',
    sources: [
      ['Kew: Grape vine (Vitis vinifera), plant description', 'https://www.kew.org/plants/grape-vine'],
    ],
  },
  {
    slug: 'sesame-the-carrier',
    title: 'Sesame, the carrier',
    deck: 'One of the oldest oilseed crops, native to the Indian subcontinent, pressed cold and unroasted so the aroma stays quiet.',
    botanical: 'sesame',
    products: ['saffron-sesame-body-oil', 'amla-blackseed-hair-oil', 'scalp-beard-serum', 'the-hair-ritual'],
    published: '2026-10-11',
    readingTime: '3 min',
    image: 'sesame',
    body: [
      'Sesamum indicum is an annual of the seasonally dry tropics; Kew gives its native range as the Indian subcontinent. It grows a metre or so tall with tubular flowers and upright capsules that split along their seams when ripe, which is why the crop was traditionally cut and dried standing, pods upward, before threshing. The seeds are small, flat, and teardrop-shaped, ivory when hulled, and range to black in some types.',
      'It is among the oldest oilseeds people have pressed. Our sesame is cold-pressed from unroasted seed, which keeps the colour pale and the aroma faint; roasted sesame oil, the kind used for cooking, is a different product with a strong nutty smell that would overwhelm the seed.',
      'Sesame is the traditional carrier of abhyanga, the warm oil massage, and that is its role here. In the Body Oil it carries the saffron infusion; in the Hair Oil it is the base the amla is infused into. In both, blackseed oil sits alongside it as the tested constant.',
    ],
    founderNote: 'A carrier is not filler. Sesame decides how the oil feels on skin; the seed decides what is in it.',
    sources: [
      ['Kew Science, Plants of the World Online: Sesamum indicum L.', 'https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:675971-1'],
    ],
  },
  {
    slug: 'resins-and-roots-the-attar-materials',
    title: 'Resins and roots: the attar materials',
    deck: 'Agarwood, frankincense, sandalwood, vetiver. Four slow materials that give the attars their depth, and what we ask about each one.',
    botanical: 'oud',
    covers: ['oud', 'frankincense', 'sandalwood', 'vetiver'],
    products: ['oud-noir-attar', 'kesar-rose-attar', 'vigne-verte-attar', 'fragrance-discovery-set', 'blackseed-bath-soak', 'saffron-sesame-body-oil'],
    published: '2026-10-11',
    readingTime: '5 min',
    image: 'resins',
    body: [
      'An attar is a fragrance carried in oil rather than alcohol. Ours are carried in blackseed oil, which means the base of each one is the same tested lot as the dropper bottle. What differs is the material on top, and the four below are the slowest to make.',
      'Agarwood, or oud, is not a wood that grows fragrant. It is resin that Aquilaria trees lay down in their heartwood in response to injury, and only a fraction of wild trees ever form it. Because of that, every Aquilaria species has been listed on CITES Appendix II since 1995, and international trade requires permits. We buy plantation-grown, hydro-distilled agarwood oil with its documentation, and Oud Noir is the only place it appears.',
      'Frankincense is the resin of Boswellia sacra, a small tree of the dry country of northern Somalia, southern Yemen, and south-western Oman. The bark is cut and the sap hardens into pale tears that are gathered by hand. Distilled, it is bright and resinous with a citrus edge; we use it in trace in the Body Oil and the Bath Soak.',
      'Sandalwood oil comes from the mature heartwood of Santalum album, a slow-growing tree that is a root hemiparasite, drawing part of its water and minerals from the roots of its neighbours. The oil is mostly santalols, creamy and long-lasting. It is the anchor of Kesar Rose.',
      'Vetiver is a tall grass, Chrysopogon zizanioides, whose roots grow straight down and are dug, washed, dried, and distilled. The oil is earthy, green, and cool, and it grounds the grapevine leaf in Vigne Verte. Of the four it is the only one grown as an annual field crop, and the least constrained.',
    ],
    founderNote: 'The attars are the one place I let the shelf be luxurious. Every material in them has a paper trail, and the oil they sit in has a certificate.',
    sources: [
      ['CITES: Introduction to CITES and agarwood overview (Aquilaria malaccensis, Appendix II)', 'https://cites.org/sites/default/files/common/com/pc/20/inf_docs/E20-07i-A09.pdf'],
      ['ITTO and CITES, agarwood report workshop, 2022', 'https://www.itto.int/news/2022/06/28/itto_cites_hold_workshop_to_discuss_agarwood_report/'],
      ['Kew Science, Plants of the World Online: Boswellia sacra Flück.', 'https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:127065-1'],
      ['Diaz-Chavez et al., Biosynthesis of sandalwood oil, PLoS ONE (PMC)', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3854609/'],
    ],
  },
  {
    slug: 'how-to-read-a-lot-certificate',
    title: 'How to read a lot certificate',
    deck: 'Thymoquinone, fatty-acid profile, peroxide value, metals, microbial screen. What each line on the certificate means and what a good one looks like.',
    botanical: null,
    products: ['blackseed-oil', 'practitioner-case'],
    published: '2026-10-11',
    readingTime: '4 min',
    image: 'seed-oil',
    body: [
      'Every lot of our oil goes to an independent laboratory before it is bottled, and the certificate it comes back with is published on the Lab Reports page under the lot code printed on the bottle. Until lot one exists there is a specimen there instead: the layout and every field, with no results, so the format is public before the first number is.',
      'Thymoquinone is reported as a percentage of the oil by weight. It is the molecule most associated with the seed and it varies with harvest and press, so a brand-wide figure would be a guess; a lot figure is a measurement. Read it as a property of that bottle, not of blackseed oil in general.',
      'The fatty-acid profile is a fingerprint. Blackseed oil is mostly linoleic and oleic acids with smaller amounts of palmitic and stearic; a profile that matches the reference range says the oil is what the label says and nothing was blended in. Peroxide value measures oxidation, which is to say freshness; lower is fresher, and we print the lab’s result rather than a target.',
      'Heavy metals, lead, arsenic, cadmium, and mercury, are reported against the laboratory’s detection limits. The microbial screen reports counts for total aerobic bacteria and yeast and mould, and absence for E. coli, Salmonella, and Staphylococcus aureus in the stated sample size.',
      'The issued certificate carries the laboratory’s name, accreditation, report number, and signature. If a certificate you are shown anywhere lacks those four things, it is a brochure.',
    ],
    founderNote: 'I wrote this so a reader can hold our certificate to the same standard they would hold anyone else’s. If ours ever fails that reading, say so.',
    sources: [
      ['Dr. Mushtaq’s, specimen certificate of analysis (PDF)', '/coa/specimen.pdf'],
    ],
  },
]

export const journalBySlug = (slug) => JOURNAL.find((p) => p.slug === slug) || null
// The post that speaks for a botanical key, if any.
export const journalForBotanical = (posts, key) => (posts || []).find((p) => p.botanical === key || (Array.isArray(p.covers) && p.covers.includes(key))) || null

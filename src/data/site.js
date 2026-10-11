export const NAV = [
  { label: 'Within', to: '/collections/within', collection: 'within' },
  { label: 'Skin', to: '/collections/skin', collection: 'skin' },
  { label: 'Hair', to: '/collections/hair', collection: 'hair' },
  { label: 'Body', to: '/collections/body', collection: 'body' },
  { label: 'Fragrance', to: '/collections/fragrance', collection: 'fragrance' },
  { label: 'Ritual Sets', to: '/collections/ritual-sets', collection: 'ritual-sets' },
  {
    label: 'Learn',
    to: '/dr-mushtaq',
    children: [
      { label: 'Dr. Mushtaq', to: '/dr-mushtaq', note: 'The physician behind the label' },
      { label: 'Lab Reports', to: '/coa', note: 'Every lot, tested. Every number, published.' },
      { label: 'The Molecule', to: '/science', note: 'What we measure and how' },
      { label: 'Botanicals', to: '/botanicals', note: 'Materia medica across three traditions' },
      { label: 'Heritage', to: '/heritage', note: 'A seed with a long story' },
      { label: 'The Protocol', to: '/protocol', note: 'A day with the shelf' },
      { label: 'Practitioners', to: '/practitioners', note: 'Dispensing and documentation' },
      { label: 'Safety', to: '/safety', note: 'Who should check with a clinician first' },
      { label: 'Questions', to: '/faq', note: 'Ordering, sizes, the guarantee' },
    ],
  },
]

export const FOOTER_LINKS = {
  Shop: [
    { label: 'Within', to: '/collections/within' },
    { label: 'Skin', to: '/collections/skin' },
    { label: 'Hair', to: '/collections/hair' },
    { label: 'Body', to: '/collections/body' },
    { label: 'Fragrance', to: '/collections/fragrance' },
    { label: 'Ritual Sets', to: '/collections/ritual-sets' },
    { label: 'Coming soon', to: '/coming-soon' },
  ],
  Learn: [
    { label: 'Dr. Mushtaq', to: '/dr-mushtaq' },
    { label: 'Lab Reports (COA)', to: '/coa' },
    { label: 'The Molecule', to: '/science' },
    { label: 'Botanicals', to: '/botanicals' },
    { label: 'Heritage', to: '/heritage' },
    { label: 'Practitioners', to: '/practitioners' },
  ],
  Help: [
    { label: 'Safety', to: '/safety' },
    { label: 'The 60-Day Standard', to: '/policies/guarantee' },
    { label: 'Shipping & Returns', to: '/policies/shipping-returns' },
    { label: 'Privacy', to: '/policies/privacy' },
    { label: 'Terms', to: '/policies/terms' },
    { label: 'Questions', to: '/faq' },
    { label: 'Contact', to: 'mailto:hello@drmushtaqs.com', external: true },
  ],
}

export const CONTACT = { email: 'hello@drmushtaqs.com' }

// Trust strip: only values that are actually set. No location.
export const TRUST = [
  { label: 'Free US shipping over $150', to: '/policies/shipping-returns' },
  { label: 'The 60-Day Standard', to: '/policies/guarantee' },
  { label: CONTACT.email, to: `mailto:${CONTACT.email}`, external: true },
]

// Homepage copy (prelaunch). Live-state strings are kept beside them so the
// switch is a data change, not a rewrite.
export const HOME = {
  announcement: { prelaunch: 'First lot coming soon. Join the list.', live: 'Complimentary shipping on orders over $150' },
  eyebrow: 'Single origin · Cold pressed',
  eyebrowTested: 'Single origin · Cold pressed · Lot tested',
  h1: ['Pressed cold.', 'Measured honestly.'],
  sub: 'Single-ingredient Nigella sativa seed oil, cold pressed and bottled in amber glass. Every lot comes with a published lab certificate, so you know exactly what is inside.',
  cta: { prelaunch: ['Join the first-lot list', 'See how we test'], live: ['Shop the Original', 'See a lab report'] },
  values: [
    ['One ingredient', 'No carriers, blends, or flavorings. The Original is Nigella sativa seed oil and nothing else.'],
    ['Cold pressed', 'Never heated, refined, or solvent extracted. The color, aroma, and pepper are the seed’s own.'],
    ['Lot tested', 'An independent lab panel on every pressing, published online before the lot ships.'],
  ],
  founderTeaser: {
    title: 'Made by a physician who got tired of guessing what is in the bottle.',
    body: 'Dr. Quddarat U. Mushtaq, MD, MS started this company with one rule: say exactly what is inside, test every lot, and publish the results.',
    points: ['Single-origin seed from a documented supplier', 'Thymoquinone, freshness, metals, and microbial screen on every lot', 'Plain labels. No blends. No hype.'],
  },
  heritageTeaser: {
    title: 'A seed with a long story.',
    body: 'Black seed has been pressed, eaten, and shared across the Middle East, North Africa, and South Asia for centuries, and holds a special place in Islamic tradition.',
  },
  whoFor: [
    ['Morning ritual', 'A dropper before the kettle boils.'],
    ['Post-workout smoothie', 'Stirred in cold, never blended hot.'],
    ['Home kitchen', 'A finishing oil for lentils, labneh, and eggs.'],
    ['Family tradition', 'The seed your grandmother kept beside the salt.'],
  ],
  finalCta: { prelaunch: 'Be first to try the Original.', live: 'Start with the Original.' },
}

export const COA = {
  title: 'Every lot, tested. Every number, published.',
  body: 'Each pressing gets an independent lab panel covering thymoquinone, fatty-acid profile, freshness, heavy metals, and microbial screen. Scan the lot code on your bottle to see its full certificate.',
  panel: ['Thymoquinone, with the method named', 'Fatty-acid profile', 'Peroxide value (freshness)', 'Heavy metals: lead, arsenic, cadmium, mercury', 'Microbial screen'],
  howToRead: [
    ['What thymoquinone is', 'Thymoquinone is a small aromatic molecule, a quinone, that gives Nigella sativa seed oil much of its peppery character. Laboratories report it as a percentage of the oil by weight, measured by gas chromatography or liquid chromatography against a reference standard.'],
    ['Why it varies by harvest', 'The seed’s chemistry depends on the cultivar, the soil, the season, how long the seed was stored, and how warm the press ran. Two honest lots from the same farm can differ. That is why we publish a number per lot rather than printing one number for all time.'],
    ['What peroxide value measures', 'Peroxide value, in milliequivalents of active oxygen per kilogram, counts the primary oxidation products in an oil. It is a freshness measure: a low value means the oil has not begun to go rancid. It rises with heat, light, air, and age, which is why the bottle is amber and the storage line says cool and dark.'],
    ['The fatty-acid profile', 'Gas chromatography separates the oil into its fatty acids, mostly linoleic and oleic in Nigella sativa, and reports each as a percentage. It is a fingerprint of the seed and a check that nothing else was blended in.'],
    ['Heavy metals and microbial screen', 'The laboratory reports lead, arsenic, cadmium, and mercury against its detection limits, and screens for total plate count, yeast and mold, and specified organisms. We show the laboratory’s wording and figures as issued.'],
  ],
}

// Founder facts are drawn from public professional records; see the
// disclosure line, which follows NAD guidance on founder endorsements.
export const FOUNDER = {
  name: 'Dr. Quddarat U. Mushtaq, MD, MS',
  shortName: 'Dr. Mushtaq',
  role: 'Founder, formulator, and owner',
  credentials: [
    ['MD', 'Doctor of Medicine, Ross University School of Medicine'],
    ['MS', 'Master of Science in Biological Sciences, Mississippi College'],
    ['BS', 'Bachelor of Science in Biology, Francis Marion University'],
    ['Training', 'Postgraduate training in family medicine'],
    ['Since 2016', 'Founder of Start With You, the company behind Dr. Mushtaq’s'],
  ],
  short: 'A physician with a master’s in biological sciences who grew up with black seed in the kitchen cupboard and got tired of guessing what was in the bottle.',
  lede: 'Say exactly what is inside. Test every lot. Publish the results.',
  why: [
    'Black seed was in my house before I knew what a molecule was. My mother kept it next to the salt. In my master’s work and then in medical school I kept running into the same gap: a seed with centuries of use across Unani, Ayurvedic, and Chinese practice, and almost no honest labeling. Bottles sold on a saying with no lot number. Oils refined until they were pale and tasteless. No certificate anywhere.',
    'This company is my answer to that gap. We buy one harvest from one documented supplier. We press it cold. We send every lot to an independent laboratory, and we publish what the laboratory found, in the laboratory’s own words.',
    'If a bottle does not match its certificate, or you simply do not love it, I would rather refund you than have you keep it. That is the whole standard.',
  ],
  tested: {
    title: 'What gets tested',
    items: [
      ['Thymoquinone', 'Reported as a percentage of the oil, with the method named.'],
      ['Fatty-acid profile', 'The seed’s fingerprint, and proof nothing was blended in.'],
      ['Peroxide value', 'Freshness. Low means the oil has not begun to oxidize.'],
      ['Heavy metals', 'Lead, arsenic, cadmium, mercury, reported against detection limits.'],
      ['Microbial screen', 'Plate count, yeast and mold, specified organisms.'],
    ],
  },
  never: {
    title: 'What never goes on the label',
    items: ['A number we did not get from a laboratory for that lot.', 'A benefit, outcome, or promise about your body.', 'A traditional use dressed up as evidence.', 'An origin we cannot document with supplier paperwork.', 'A certification we do not hold.'],
  },
  training: {
    title: 'How my training shows up',
    items: [
      ['In the method, not the marketing', 'Medical training teaches you to ask what the measurement was, who ran it, and what the error is. That is the whole lab-report page.'],
      ['In what I refuse to say', 'I know how claims get made and how thin the evidence under most of them is. So this site makes specification claims only: what is in the bottle, how it was pressed, what the lab measured.'],
      ['In the safety line', 'The reminder near every buy button to talk to your own clinician is there because I would say the same thing to anyone who asked me in person.'],
      ['In reading the certificate', 'I write the plain-language notes beside each lab report so a customer can read it the way I would.'],
    ],
  },
  principles: [
    ['One origin per lot', 'One harvest from one documented supplier per lot, named on that lot’s certificate.'],
    ['Measure what matters', 'Thymoquinone, fatty-acid profile, freshness, heavy metals, and a microbial screen on every lot of oil, reported by an independent laboratory.'],
    ['Say less', 'Specification claims only: ingredient, process, origin, testing. No outcome promises, anywhere.'],
    ['Respect the traditions', 'Kalonji, Habbat al-Sauda, Hei Zhong Cao Zi: the same seed, three medical traditions. We list the classical names so practitioners can place our materials in their own frameworks.'],
    ['Stand behind every bottle', 'The 60-Day Standard: full refund, opened or not, no questions beyond what we could do better.'],
  ],
  noMedical: 'Dr. Mushtaq does not provide medical services through this company.',
  disclosure:
    'Dr. Quddarat U. Mushtaq, MD, MS is the founder and owner of Dr. Mushtaq’s and has a financial interest in every product sold here. His statements are his professional opinion as a formulator, not medical advice, and not a substitute for care from your own licensed clinician. Nothing on this site creates a physician-patient relationship, and Dr. Mushtaq does not provide medical services through this company.',
  qa: [
    ['Why would a physician start a botanical company?', 'Because the gap between how much people use these materials and how little they are told about them bothered me more than it seemed to bother anyone selling them. I cannot fix the folklore. I can fix the label.'],
    ['Why publish a certificate for every lot instead of one number?', 'Because the seed changes with the harvest and the press. One number printed for all time would be a marketing decision. A certificate per lot is a laboratory result.'],
    ['Do you use your own products?', 'The oil most mornings, and the culinary bottle on most dinners. That is a preference, not a recommendation.'],
    ['Will you ever make health claims?', 'No. If a claim is ever supportable enough to print, it will come with the study, the dose, and the population it applied to, and even then I would rather you heard it from your own clinician.'],
    ['Why list Ayurvedic and Chinese names?', 'Because the practitioners who have used these botanicals longest work in those frameworks. If an Ayurvedic doctor wants Kalonji oil with a certificate of analysis, I want them to recognise what we make.'],
  ],
}

export const HADITH = {
  narration: '“There is healing in black seed for all diseases except death.”',
  attribution: 'Narrated by Abu Hurairah, Sahih al-Bukhari 5688, Book 76 (Medicine)',
  note:
    'We quote this narration because it is why black seed has been kept in homes across the Muslim world for fourteen centuries. We quote it for heritage, not as evidence. It is not a product claim and not medical advice, and we have not evaluated it as either.',
}

export const HERITAGE = {
  title: 'A seed with a long story.',
  paragraphs: [
    'Nigella sativa is a small annual in the buttercup family, grown for its black, angular seeds across the Middle East, North Africa, and South Asia. Seeds were found in Tutankhamun’s tomb, and the plant appears in the Old Testament under the name ketzah, where the prophet Isaiah describes it being threshed with a stick rather than a sledge.',
    'In the kitchen it is kalonji, habbat al-barakah, çörek otu, or siyah daneh depending on where you are standing. It is pressed into naan and sprinkled over simit, tempered in hot oil for dal, folded into Bengali panch phoron, and stirred into string cheese in the Levant. The oil was pressed for the table long before it was bottled for anything else.',
    'In Islamic tradition the seed holds a place of its own. The narration quoted below is why a jar of it sits in so many homes, passed from one generation to the next with the salt and the honey. We keep that tradition by getting the seed itself right. The seed is a food and a story; we make no claim beyond that.',
  ],
  names: [
    ['Kalonji', 'Hindi and Urdu, the kitchen name across South Asia'],
    ['Habbat al-barakah', 'Arabic, “the seed of blessing”'],
    ['Habbat al-sauda', 'Arabic, “the black seed”'],
    ['Çörek otu', 'Turkish, the seed on simit and börek'],
    ['Siyah daneh', 'Persian, “black grain”'],
    ['Ketzah', 'Hebrew, the name in Isaiah 28'],
  ],
}

export const PRACTITIONERS = {
  lede: 'Dispense materials you can place in your own framework, with the documentation to back them.',
  points: [
    ['Classical names on every page', 'Each botanical lists its Ayurvedic, Unani, and Chinese names beside the Latin binomial and the part used.'],
    ['Certificate of analysis per lot', 'Thymoquinone, fatty-acid profile, peroxide value, heavy metals, and microbial screen for every lot of oil, published on the lot page and enclosed with every case.'],
    ['Dispensing sizes', '500 mL apothecary bottles with glass pipettes and the six-bottle Practitioner Case, with further formats as each launches.'],
    ['Practitioner pricing', 'Practitioner pricing and terms are shared after verification. Write to us with your credential.'],
    ['No claims to police', 'Our labels and pages make specification claims only, so nothing we print conflicts with the guidance you give your own patients.'],
  ],
  eligible: 'Licensed acupuncturists and herbalists, Ayurvedic practitioners (BAMS or NAMA-certified), Unani hakims, naturopathic doctors, pharmacists, physicians, nurse practitioners, registered dietitians, and dispensaries.',
}

// /safety: the questions that matter most, kept where they can be found.
export const SAFETY_FAQ = [
  ['Is anything on this site medical advice?', 'No. The site, the founder’s pages, and the product information are general consumer information only. They do not create a physician-patient relationship or replace care from your own licensed clinician. Dr. Mushtaq does not provide medical services through this company.'],
  ['Do you make health claims?', 'No. We make specification claims only: what is in the bottle, how it was pressed, where that lot came from, and what an independent laboratory measured. We make no outcome promises.'],
  ['Who should check with a clinician first?', 'Anyone pregnant or nursing, taking medication, managing a health condition, scheduled for a procedure, or considering use for a child. Read the full label before use.'],
  ['What if I have a reaction?', 'Stop using the product and contact your clinician. Then write to hello@drmushtaqs.com with the lot number from the base of the bottle so we can log it against that lot.'],
  ['Is the oil for adults only?', 'Yes. Our products are formulated and labeled for adults.'],
  ['Where is the full label?', 'The front and back label images appear in the product gallery as each product launches, and the same text is printed on the bottle.'],
]

export const SITE_FAQ = [
  {
    group: 'The products',
    items: [
      ['What does “lot tested” mean?', 'Every lot of oil goes to an independent laboratory for thymoquinone, fatty-acid profile, peroxide value, heavy metals, and a microbial screen. We publish the certificate on the lot page before the lot ships, and the lot code is printed on the bottle.'],
      ['Why is there no thymoquinone number on the label?', 'Because the honest number belongs to a lot, not a brand. Thymoquinone varies with the harvest and the press. We publish each lot’s result on its certificate page rather than printing one figure for all time.'],
      ['Is blackseed oil in every product?', 'Yes. Everything we make, from the dropper bottle to the attars, begins with the same cold-pressed, lot-tested blackseed oil. Saffron, grapevine, rose, amla, sesame, and the resins are added by purpose.'],
      ['Where do the botanicals come from?', 'One origin and one harvest per lot. We name the origin on the lot’s certificate once we hold the supplier documentation for it, not before.'],
      ['Are the products certified?', 'We do not claim certifications we do not hold. We publish the heavy-metal and microbial panel for every lot instead, and name the laboratory that ran it.'],
    ],
  },
  {
    group: 'Sizes and pricing',
    items: [
      ['Why do the larger sizes cost less per millilitre?', 'Bottling and testing cost roughly the same for a 125 mL and a 500 mL bottle, so we pass the difference on. The product page shows the price per millilitre and per fluid ounce for each size.'],
      ['Which size should I start with?', 'The smallest. Every product is covered by the 60-Day Standard, so start small, decide, then move up when you reorder.'],
      ['How do sets save money?', 'Sets are priced 10% to 20% below the sum of their parts, and the Fragrance Discovery Set is credited in full against any 30 mL attar.'],
    ],
  },
  {
    group: 'Ordering',
    items: [
      ['When can I buy?', 'The Original ships when its first lot clears the laboratory. Join the first-lot list and we will email you the day it opens, with the certificate attached. Other products open as they are finalised.'],
      ['How will checkout work?', 'Checkout is handled by Stripe. We never see or store your card details. You can pay by card, Apple Pay, Google Pay, or Link.'],
      ['How much is shipping?', 'Shipping within the United States is complimentary on orders over $150 and a flat $9 below that. Orders ship Monday through Friday and most arrive in two to five business days with a tracking link by email.'],
      ['What is the guarantee?', 'The 60-Day Standard: use any product for up to 60 days and, if you do not love it, write to us for a full refund of the product price. Opened or not.'],
      ['Do you ship internationally?', 'Not yet. We are starting with the United States while we finalise labeling for other markets.'],
    ],
  },
  { group: 'Safety', items: SAFETY_FAQ.slice(0, 3) },
]

export const POLICIES = {
  guarantee: {
    title: 'The 60-Day Standard',
    updated: 'October 2026',
    sections: [
      ['The promise', 'Use any Dr. Mushtaq’s product for up to 60 days from delivery. If it does not match the certificate for its lot, or you simply do not love it, we refund the full product price to your original payment method. Opened or unopened.'],
      ['How to claim', 'Email hello@drmushtaqs.com with your order number and one sentence on what we could do better. We reply within one business day and issue the refund within five. We may ask you to return the bottle so we can examine the lot; if so, we pay the postage.'],
      ['What it covers', 'Every product sold on this site, including sets. Shipping charges are refunded if the product was defective or did not match its certificate.'],
      ['Limits', 'One claim per product per household, and a maximum of three claims per order. We reserve the right to decline future orders where the guarantee is used repeatedly.'],
    ],
  },
  'shipping-returns': {
    title: 'Shipping & Returns',
    updated: 'October 2026',
    sections: [
      ['Shipping', 'We ship within the United States Monday through Friday. Orders placed before noon Eastern usually leave the same day. Shipping is complimentary on orders over $150 and a flat $9 below that. Most orders arrive in two to five business days by USPS or UPS, and you will receive a tracking link by email when your order ships.'],
      ['Returns', 'Every product is covered by the 60-Day Standard: a full refund of the product price within 60 days of delivery, opened or not. Write to hello@drmushtaqs.com with your order number.'],
      ['Damaged or incorrect items', 'If anything arrives damaged, leaking, or different from what you ordered, email a photo within seven days of delivery and we will replace it at no cost.'],
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    updated: 'October 2026',
    sections: [
      ['What we collect', 'When you place an order we collect your name, email, shipping address, and the items you bought. Payment details are collected and stored by Stripe, not by us. If you join a list or apply for a practitioner account we collect what you enter in that form.'],
      ['The first-lot list', 'Joining the list stores your email and the product you asked about. We send one confirmation email and nothing else until you confirm. Every email we send carries a one-click unsubscribe link, and you can also write to hello@drmushtaqs.com to be removed.'],
      ['How we use it', 'To fulfil your order, to send order and shipping notices, to verify practitioner credentials, and, if you confirmed a list, to send occasional notes about new lots and products. We do not sell or rent personal information.'],
      ['Who we share it with', 'Stripe for payment processing, our shipping carriers for delivery, Resend for transactional email, and Supabase and Vercel, which host our store and database in the United States.'],
      ['Your choices', 'Unsubscribe from any email with one click. To access, correct, or delete your information, write to hello@drmushtaqs.com.'],
      ['Cookies and analytics', 'The store uses a small amount of local storage to remember your bag between visits. Usage events contain no personal information. We do not run advertising trackers.'],
    ],
  },
  terms: {
    title: 'Terms of Sale',
    updated: 'October 2026',
    sections: [
      ['Products', 'Dr. Mushtaq’s products are sold as foods, dietary supplements, and cosmetics according to their labels. They are not intended to diagnose, treat, cure, or prevent any disease. Read the full label before use and consult a qualified clinician with any health question.'],
      ['Founder disclosure', 'Dr. Quddarat U. Mushtaq, MD, MS is the founder and owner of this company. Statements attributed to him on this site are his opinions as formulator and owner and are not medical advice. Dr. Mushtaq does not provide medical services through this company.'],
      ['Pricing and availability', 'Prices are in US dollars and may change without notice. Prices shown at checkout are final. Products marked coming soon or first lot coming soon cannot be purchased until they are released. We may limit quantities or decline an order where we suspect resale or fraud.'],
      ['Information on this site', 'Content on this site is general information only. Traditional names and uses are listed for education and practitioner reference, not as indications.'],
    ],
  },
}

export const FDA_DISCLAIMER =
  'These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease. Dr. Quddarat U. Mushtaq, MD, MS is the founder and owner of Dr. Mushtaq’s; his statements are opinion, not medical advice, and do not create a physician-patient relationship. Consult a qualified clinician about your own health.'

export const NO_MEDICAL_SERVICES = 'Dr. Mushtaq does not provide medical services through this company.'

export const SAFETY_LINE = 'For adults. Read the full label. Talk to your clinician first if pregnant, nursing, taking medication, or managing a health condition.'

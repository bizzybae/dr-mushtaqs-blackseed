export const product = {
  name: 'Blackseed Oil',
  botanical: 'Nigella sativa seed oil',
  size: '2 fl oz / 59 mL',
  price: 28,
  summary:
    'One ingredient, cold pressed and bottled in amber glass. No blends, no added fragrance, and no health, disease, or performance claims anywhere on this page.',
  details: [
    { label: 'Ingredient', value: 'Nigella sativa (black cumin) seed oil' },
    { label: 'Process', value: 'Cold pressed, unrefined' },
    { label: 'Packaging', value: 'Amber glass with glass dropper' },
    { label: 'Batch record', value: 'Lot number printed on every bottle' },
    { label: 'Testing', value: 'Third party testing program' },
    { label: 'Storage', value: 'Cool, dark place, away from direct sun' }
  ]
}

export const standards = [
  {
    index: '01',
    title: 'Name the ingredient',
    body: 'Nigella sativa seed oil is stated plainly. You should never have to decode a label to know what you are buying.'
  },
  {
    index: '02',
    title: 'Respect the process',
    body: 'Cold pressing and amber glass protect a delicate oil from heat and light between press and shelf.'
  },
  {
    index: '03',
    title: 'Keep claims out',
    body: 'No disease, cure, prevention, diagnosis, or treatment language is used in our marketing, packaging, or social content.'
  }
]

export const collection = [
  { index: '01', name: 'Pure Oils', status: 'Available', body: 'Single ingredient cold pressed oils, starting with the original blackseed oil.' },
  { index: '02', name: 'Capsules', status: 'In development', body: 'Encapsulated botanicals with the same plain labeling standard.' },
  { index: '03', name: 'Skin and Soap', status: 'In development', body: 'Cleansing bars and simple topical care for daily routines.' },
  { index: '04', name: 'Hair Care', status: 'In development', body: 'Scalp and hair oils built around ritual rather than promises.' },
  { index: '05', name: 'Herbal Teas', status: 'In development', body: 'Loose leaf blends for an unhurried part of the day.' },
  { index: '06', name: 'Honey and Pantry', status: 'In development', body: 'Kitchen staples chosen with the same sourcing discipline.' }
]

export const hadith = {
  narration:
    'Narrated Khalid bin Sa’d: We went out and Ghalib bin Abjar was accompanying us. He fell ill on the way, and when we arrived at Medina he was still ill. Ibn Abi ‘Atiq came to visit him and said to us, “Treat him with black cumin. Take five or seven seeds and crush them, then mix the powder with oil and drop the resulting mixture into both nostrils, for ‘Aishah has narrated to me that she heard the Prophet saying, ‘This black cumin is healing for all diseases except As-Sam.’ ‘Aishah said, ‘What is As-Sam?’ He said, ‘Death.’”',
  reference: 'Sahih al-Bukhari 5687, Book 76 (Medicine), Hadith 20'
}

export const faqs = [
  {
    question: 'Is anything on this site medical advice?',
    answer:
      'No. The site, the founder biography, and the product information are general consumer information only. Nothing here creates a physician-patient relationship or replaces care from your own licensed clinician.'
  },
  {
    question: 'Does this product make health claims?',
    answer:
      'No. We do not claim that this product diagnoses, treats, cures, mitigates, or prevents any disease, and we make no efficacy or outcome claims.'
  },
  {
    question: 'Why is a hadith quoted here?',
    answer:
      'Black seed carries deep cultural and religious significance. We quote the narration in full for heritage and education, not as evidence for the product and not as guidance for any health decision.'
  },
  {
    question: 'What should I consider before using it?',
    answer:
      'For adults. Read the full label and use only as directed. If you are pregnant or nursing, taking medication, managing a medical condition, scheduled for a procedure, or considering use for a child, speak with a qualified clinician first. Stop use and seek advice if any adverse reaction occurs.'
  },
  {
    question: 'Can I order right now?',
    answer:
      'Not yet. This build is a demonstration storefront. Checkout, payments, accounts, and email capture are intentionally disabled until fulfillment, policies, and compliance review are complete.'
  }
]

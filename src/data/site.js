export const NAV = [
  { label: 'Shop', to: '/shop' },
  { label: 'The Molecule', to: '/science' },
  { label: 'Our Story', to: '/story' },
  { label: 'Questions', to: '/faq' },
]

export const FOOTER_LINKS = {
  Shop: [
    { label: 'Blackseed Oil', to: '/shop/blackseed-oil' },
    { label: 'Softgels', to: '/shop/blackseed-oil-softgels' },
    { label: 'Balm', to: '/shop/blackseed-balm' },
    { label: 'Scalp & Beard Serum', to: '/shop/scalp-beard-serum' },
    { label: 'Culinary Finishing Oil', to: '/shop/culinary-finishing-oil' },
  ],
  Learn: [
    { label: 'The Molecule', to: '/science' },
    { label: 'Our Story', to: '/story' },
    { label: 'Questions', to: '/faq' },
  ],
  Help: [
    { label: 'Shipping & Returns', to: '/policies/shipping-returns' },
    { label: 'Privacy', to: '/policies/privacy' },
    { label: 'Terms', to: '/policies/terms' },
    { label: 'Contact', to: 'mailto:hello@drmushtaqs.com', external: true },
  ],
}

export const FOUNDER = {
  name: 'Dr. Quddarat Mushtaq, MD',
  role: 'Founder',
  short:
    'A family-medicine-trained physician in South Carolina who grew up with black seed in the kitchen cupboard and spent his training learning why most of what is said about it cannot be substantiated.',
  body: [
    'Black seed was in my house before I knew what a molecule was. My mother kept it next to the salt. In medical school I kept running into the same gap: a plant with a long record of human use and a thin record of honest labeling. Bottles sold on a hadith with no lot number. Oils that were pale and tasteless because they had been refined to nothing.',
    'This company is my answer to that gap. We measure the one constituent worth measuring, we print the number, and we stop there. No cures. No promises. A clean oil you can taste, from a seed you can trace, with a certificate you can read.',
  ],
  disclaimer:
    'This biography is factual background about the founder. It is not a product endorsement, not advice for any individual, and not a substitute for care from your own licensed clinician. Nothing on this site creates a physician-patient relationship.',
}

export const HADITH = {
  narration:
    '“There is healing in black seed for all diseases except death.”',
  attribution: 'Narrated by Abu Hurairah, Sahih al-Bukhari 5688, Book 76 (Medicine)',
  note:
    'We quote this narration because it is why black seed has been kept in homes across the Muslim world for fourteen centuries. We quote it for heritage, not as evidence. It is not a product claim and not medical advice, and we have not evaluated it as either.',
}

export const SITE_FAQ = [
  {
    group: 'The products',
    items: [
      ['What does “standardized to 4.64% thymoquinone” mean?', 'Thymoquinone is the most studied constituent of Nigella sativa seed oil and the clearest marker of seed quality and pressing care. We test every lot by HPLC and release it only when it meets our 4.64% specification. The number is printed so you can compare it to anything else on the shelf.'],
      ['Is the oil in every product the same?', 'Yes. The dropper bottle, the softgel fill, the balm, the serum, and the culinary bottle all begin with the same single-origin Ethiopian pressing. The format changes; the oil does not.'],
      ['Why Ethiopia?', 'Ethiopian Nigella sativa consistently yields a darker, more aromatic oil with higher thymoquinone than seed from most other origins. We buy one harvest per lot from growers we have visited.'],
      ['Do you make health claims?', 'No. We do not claim that any product diagnoses, treats, cures, mitigates, or prevents any disease, and we make no outcome promises. We tell you what is in the bottle and how it was made.'],
    ],
  },
  {
    group: 'Ordering',
    items: [
      ['How does checkout work?', 'Checkout is handled by Stripe. We never see or store your card details. You can pay by card, Apple Pay, Google Pay, or Link.'],
      ['How much is shipping?', 'Shipping within the United States is complimentary on orders over $75 and a flat $6.95 below that. We ship Monday through Friday from South Carolina.'],
      ['What is your return policy?', 'Unopened products may be returned within 30 days for a full refund. If something arrives damaged, write to us within seven days with a photo and we will replace it.'],
      ['Do you ship internationally?', 'Not yet. We are starting with the United States while we finalize labeling for other markets.'],
    ],
  },
  {
    group: 'Safety',
    items: [
      ['Who should check with a clinician first?', 'Anyone pregnant or nursing, taking medication, managing a medical condition, scheduled for a procedure, or considering use for a child. Read the full label before use.'],
      ['Is anything on this site medical advice?', 'No. The site, the founder biography, and the product information are general consumer information only. They do not create a physician-patient relationship or replace care from your own licensed clinician.'],
    ],
  },
]

export const POLICIES = {
  'shipping-returns': {
    title: 'Shipping & Returns',
    updated: 'October 2026',
    sections: [
      ['Shipping', 'We ship within the United States Monday through Friday from Myrtle Beach, South Carolina. Orders placed before noon Eastern usually leave the same day. Shipping is complimentary on orders over $75 and a flat $6.95 below that. Most orders arrive in two to five business days by USPS or UPS, and you will receive a tracking link by email when your order ships.'],
      ['Returns', 'Unopened products in original packaging may be returned within 30 days of delivery for a full refund of the product price. Write to hello@drmushtaqs.com with your order number and we will send a prepaid label. Refunds are issued to the original payment method within five business days of receipt.'],
      ['Damaged or incorrect items', 'If anything arrives damaged, leaking, or different from what you ordered, email a photo within seven days of delivery and we will replace it at no cost.'],
      ['Opened products', 'For safety reasons we cannot resell opened products, so opened items are not eligible for refund unless they are defective. If an opened product is not what you expected, write to us anyway; we would rather hear about it.'],
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    updated: 'October 2026',
    sections: [
      ['What we collect', 'When you place an order we collect your name, email, shipping address, and the items you bought. Payment details are collected and stored by Stripe, not by us. If you join our list we collect your email address and the page you joined from.'],
      ['How we use it', 'To fulfill and support your order, to send order and shipping notices, and, if you opted in, to send occasional notes about new lots and products. We do not sell or rent personal information.'],
      ['Who we share it with', 'Stripe for payment processing, our shipping carriers for delivery, and Supabase and Vercel, which host our store and database in the United States. Each is bound by its own privacy terms.'],
      ['Your choices', 'Unsubscribe from any email with one click. To access, correct, or delete your information, write to hello@drmushtaqs.com.'],
      ['Cookies', 'The store uses a small amount of local storage to remember your bag between visits. We do not run advertising trackers.'],
    ],
  },
  terms: {
    title: 'Terms of Sale',
    updated: 'October 2026',
    sections: [
      ['Products', 'Dr. Mushtaq’s products are sold as foods, dietary supplements, and cosmetics according to their labels. They are not intended to diagnose, treat, cure, or prevent any disease. Read the full label before use and consult a qualified clinician with any health question.'],
      ['Pricing and availability', 'Prices are in US dollars and may change without notice. Prices shown at checkout are final. We may limit quantities or decline an order where we suspect resale or fraud.'],
      ['Information on this site', 'Content on this site is general information only. It is not medical advice and does not create a physician-patient relationship with the founder or anyone else.'],
      ['Governing law', 'These terms are governed by the laws of the State of South Carolina.'],
    ],
  },
}

export const FDA_DISCLAIMER =
  'These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease. Information on this site is general in nature, is not medical advice, and does not create a physician-patient relationship. Consult a qualified clinician about your own health.'

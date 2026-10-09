# Content and compliance guardrails

This storefront is written to sell a product without making health claims.

## Rules baked into the copy

1. No disease, cure, treatment, prevention, diagnosis, or mitigation language anywhere in product or marketing copy.
2. No efficacy or outcome promises, including implied ones through testimonials or before and after framing.
3. The founder’s MD credential and family medicine training appear only as factual background, paired with explicit
   statements that they are not an endorsement, not individualized advice, and do not create a physician-patient
   relationship.
4. The quoted hadith appears in a separate heritage section with a note that it is not product evidence and not
   medical advice. It is never placed next to purchase copy as substantiation.
5. The FDA disclaimer appears in the footer, alongside a general information disclaimer.

## Before selling

- Finalize the manufacturer, specifications, and certificates of analysis
- Produce compliant labeling for the product category you actually sell
- Establish lot traceability, complaint handling, and adverse event reporting
- Shipping, returns, privacy, and terms pages exist under `/policies/*`; have counsel review them before launch
- Stripe Checkout is wired (`api/checkout.js`); enable Stripe Tax and set `STRIPE_AUTOMATIC_TAX=true` before launch
- Have counsel review the label, the website, ads, influencer scripts, and social captions

A disclaimer does not rescue a claim that is not permitted in the first place. Review the full net impression of the
label and marketing together, not individual sentences in isolation.

## Provisional content to confirm before launch

The following were written to make the storefront complete and must be verified against real supplier and lab documents:

- Prices on every variant (`product_variants.price_cents`)
- Ingredient lists for the Softgels, Balm, and Scalp & Beard Serum (`products.inci_ingredients`)
- The halal certification statement for the softgel shell
- Lot data in `batches` (none published yet; the product page shows the specification until a lot is inserted)
- Contact address hello@drmushtaqs.com

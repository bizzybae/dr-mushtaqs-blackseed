// Basis for each cosmetic claim, keyed by the exact claim text in product-detail.js.
// Written to claims.evidence by seed:sql. Internal record kept outside src/ so the storefront
// never bundles it and the customer-copy banned-word check does not scan paper titles.
// Full review: COMPLIANCE-CLAIMS.md.
export const CLAIM_EVIDENCE = {
  "Rose: damask petals infused for 21 days plus rose otto, chosen for how soft skin feels after rinsing.":
    "Rosa damascena oil: citronellol and geraniol dominant, antioxidant constituents (PMC12617808, https://pmc.ncbi.nlm.nih.gov/articles/PMC12617808/). 'Soft skin feels' is a sensory statement. Formulation or sensory statement about this product; no efficacy implied. Verify against the finished formula and supplier specification before sale.",
  "Blackseed: a light seed oil, high in linoleic acid, that lifts sunscreen and makeup and rinses clean.":
    "Rewritten: 'low-comedogenic' had no primary source. N. sativa oil is ~58% linoleic acid (Clinical Uses of Nigella sativa in Pediatrics, PMC12533698, https://pmc.ncbi.nlm.nih.gov/articles/PMC12533698/). Topical linoleic acid reduced acne microcomedones (Letawe et al., Clin Exp Dermatol 1998, PMID 9692305, https://pubmed.ncbi.nlm.nih.gov/9692305/). Rinse-off performance depends on the finished formula.",
  "Grapeseed: a thin, fast-rinsing carrier that keeps the formula from feeling heavy.":
    "Grape seed oil is linoleic-acid dominant, a light cosmetic carrier (Sci Rep 2025, https://www.nature.com/articles/s41598-025-06283-4). Formulation or sensory statement about this product; no efficacy implied. Verify against the finished formula and supplier specification before sale.",
  "Blackseed: cold-pressed seed oil rich in linoleic acid that supports the moisture barrier of the skin.":
    "N. sativa oil is ~58% linoleic acid (Clinical Uses of Nigella sativa in Pediatrics, PMC12533698, https://pmc.ncbi.nlm.nih.gov/articles/PMC12533698/). Linoleate-rich oils accelerated skin-barrier recovery while olive, mustard and soybean oils delayed it (Darmstadt et al., Acta Paediatr 2002, PMID 12113324, https://pubmed.ncbi.nlm.nih.gov/12113324/).",
  "Grapevine: vine polyphenols that help skin look smoother and more even in tone.":
    "Resveratrol-containing nighttime antioxidant improved hyperpigmentation, radiance and fine lines at 12 weeks (Farris et al., J Drugs Dermatol 2014, PMID 25607790, https://pubmed.ncbi.nlm.nih.gov/25607790/). Vitis vinifera shoot extracts show anti-tyrosinase activity (Molecules 2023, https://www.mdpi.com/1420-3049/28/19/6868); shoots are a source of resveratrol and viniferins (J Sci Food Agric 2014, https://scijournals.onlinelibrary.wiley.com/doi/10.1002/jsfa.6341).",
  "Saffron: Grade I threads, 40-day infusion, for a brighter, more even-looking complexion.":
    "Saffron review: depigmenting activity; used in anti-spot, moisturiser and anti-aging formulations (Dermoprotective Effects of Saffron: A Mini Review, PMID 34544335, https://pubmed.ncbi.nlm.nih.gov/34544335/). Colour from crocin. Process facts (grade, 40-day infusion) are the brand's own specification.",
  "Caffeine and rose hydrosol: a cooling, refreshed feel on application; rose water replaces fragrance so the formula stays fragrance-free near the eyes.":
    "Topical caffeine increases skin microcirculation (Herman & Herman, Skin Pharmacol Physiol 2013, PMID 23075568, https://pubmed.ncbi.nlm.nih.gov/23075568/). Cooling feel is sensory (metal tip, gel-cream). Fragrance-free is a formulation fact.",
  "Niacinamide 4%: vitamin B3, one of the best-studied cosmetic ingredients. In published trials it improved the look of uneven tone and fine lines and helped skin feel more resilient.":
    "Rewritten: removed 'for the eye area' (trials were on facial skin). 5% niacinamide twice daily for 12 weeks reduced fine lines, hyperpigmented spots, red blotchiness and sallowness and improved elasticity (Bissett et al., Dermatol Surg 2005, PMID 16029679, https://pubmed.ncbi.nlm.nih.gov/16029679/). Our formula is 4%; wording limited to 'in published trials'.",
  "Saffron: Crocus sativus stigma, the botanical behind Golden Hour and the Radiance oil, used in traditional cosmetics for a brighter-looking complexion; here it is carried in a light gel for the same brighter look under the eyes.":
    "Rewritten: 'lifts the dull, shadowed look under the eyes' was a product-specific result no study supports. Saffron review: depigmenting activity; used in anti-spot, moisturiser and anti-aging formulations (Dermoprotective Effects of Saffron: A Mini Review, PMID 34544335, https://pubmed.ncbi.nlm.nih.gov/34544335/). Colour from crocin.",
  "Blackseed: cold-pressed Nigella sativa, the constant across every product. Fatty acids that leave the skin’s moisture barrier feeling comfortable, so thin under-eye skin feels hydrated for longer.":
    "N. sativa oil is ~58% linoleic acid (Clinical Uses of Nigella sativa in Pediatrics, PMC12533698, https://pmc.ncbi.nlm.nih.gov/articles/PMC12533698/). Linoleate-rich oils accelerated skin-barrier recovery while olive, mustard and soybean oils delayed it (Darmstadt et al., Acta Paediatr 2002, PMID 12113324, https://pubmed.ncbi.nlm.nih.gov/12113324/). Wording limited to feel.",
  "Grapevine: Vitis vinifera shoot, the same botanical as the Renewal Serum. Polyphenols from the vine help even the appearance of skin tone and support a smoother-looking surface.":
    "Resveratrol-containing nighttime antioxidant improved hyperpigmentation, radiance and fine lines at 12 weeks (Farris et al., J Drugs Dermatol 2014, PMID 25607790, https://pubmed.ncbi.nlm.nih.gov/25607790/). Vitis vinifera shoot extracts show anti-tyrosinase activity (Molecules 2023, https://www.mdpi.com/1420-3049/28/19/6868); shoots are a source of resveratrol and viniferins (J Sci Food Agric 2014, https://scijournals.onlinelibrary.wiley.com/doi/10.1002/jsfa.6341).",
  "Blackseed: a light seed oil that leaves a dry, weightless finish.":
    "Formulation or sensory statement about this product; no efficacy implied. Verify against the finished formula and supplier specification before sale.",
  "Fragrance-free: nothing added that the skin does not need at night.":
    "Formulation or sensory statement about this product; no efficacy implied. Verify against the finished formula and supplier specification before sale.",
  "Grapevine shoot: standardized stilbenes, the family that includes resveratrol and viniferins, for skin that looks smoother and more even in tone.":
    "Resveratrol-containing nighttime antioxidant improved hyperpigmentation, radiance and fine lines at 12 weeks (Farris et al., J Drugs Dermatol 2014, PMID 25607790, https://pubmed.ncbi.nlm.nih.gov/25607790/). Vitis vinifera shoot extracts show anti-tyrosinase activity (Molecules 2023, https://www.mdpi.com/1420-3049/28/19/6868); shoots are a source of resveratrol and viniferins (J Sci Food Agric 2014, https://scijournals.onlinelibrary.wiley.com/doi/10.1002/jsfa.6341). 'Standardized' is a specification the supplier must certify.",
  "Blackseed: cold-pressed oil in an anhydrous base, so there is no water and no need for a preservative.":
    "Rewritten for precision ('no need for a preservative'; tocopherol is an antioxidant, not a preservative). Anhydrous products are the standard example of microbiologically low-risk cosmetics that do not require antimicrobial preservation (ISO 29621:2017, https://www.iso.org/standard/68310.html).",
  "Frankincense resin oil: the only aroma, chosen for its dry, resinous warmth.":
    "Formulation or sensory statement about this product; no efficacy implied. Verify against the finished formula and supplier specification before sale.",
  "Anhydrous base: a slow-melting seal that helps hold moisture in dry places.":
    "Rewritten: removed 'for hours' (duration not measured for this formula). Oils and waxes form an inert layer that physically blocks transepidermal water loss (Vehicles for Drug Delivery and Cosmetic Moisturizers, PMC8703425, https://pmc.ncbi.nlm.nih.gov/articles/PMC8703425/).",
  "Amla: sun-dried fruit infused for 21 days, long used in oiling traditions for hair that looks glossy and feels soft.":
    "Hair oiling tradition with amla and sesame, and the belief that it brings shine (Hair Oils: Indigenous Knowledge Revisited, PMC9231528, https://pmc.ncbi.nlm.nih.gov/articles/PMC9231528/); amla listed as hair conditioning and moisturising agent (PMC10685248, https://pmc.ncbi.nlm.nih.gov/articles/PMC10685248/). Claim limited to look and feel.",
  "Blackseed: softens the scalp before washing without leaving residue.":
    "N. sativa oil is ~58% linoleic acid (Clinical Uses of Nigella sativa in Pediatrics, PMC12533698, https://pmc.ncbi.nlm.nih.gov/articles/PMC12533698/). Emollient effect; wording limited to feel.",
  "Sesame: unroasted, cold-pressed carrier that spreads easily through the lengths.":
    "Sesame oil: emollient, valued for sensory characteristics and oxidative stability (Sesame: A Comprehensive Review, PMC9573514, https://pmc.ncbi.nlm.nih.gov/articles/PMC9573514/; PMC7914952). Formulation or sensory statement about this product; no efficacy implied. Verify against the finished formula and supplier specification before sale.",
  "Blackseed: light conditioning for the skin under the beard.":
    "N. sativa oil is ~58% linoleic acid (Clinical Uses of Nigella sativa in Pediatrics, PMC12533698, https://pmc.ncbi.nlm.nih.gov/articles/PMC12533698/). Emollient effect; wording limited to feel.",
  "Grapevine: a dry-touch finish with no greasy feel.":
    "Grape seed oil is linoleic-acid dominant, a light cosmetic carrier (Sci Rep 2025, https://www.nature.com/articles/s41598-025-06283-4). Formulation or sensory statement about this product; no efficacy implied. Verify against the finished formula and supplier specification before sale.",
  "Rosemary leaf oil: a bright, cooling note on the scalp.":
    "1,8-cineole and camphor are principal rosemary oil constituents and typical trigeminal (cooling) stimuli (PMC10973528, https://pmc.ncbi.nlm.nih.gov/articles/PMC10973528/; PMC12987288, https://pmc.ncbi.nlm.nih.gov/articles/PMC12987288/).",
  "Blackseed oil: leaves skin feeling supple after the soak.":
    "N. sativa oil is ~58% linoleic acid (Clinical Uses of Nigella sativa in Pediatrics, PMC12533698, https://pmc.ncbi.nlm.nih.gov/articles/PMC12533698/). Sensory statement.",
  "Frankincense: the only scent, resinous and quiet.":
    "Formulation or sensory statement about this product; no efficacy implied. Verify against the finished formula and supplier specification before sale.",
  "Dead Sea and Epsom salts: coarse, magnesium-rich minerals; bathing in Dead Sea salt solution has been shown to leave skin smoother and better hydrated.":
    "Rewritten: 'soften the water' was technically wrong (magnesium is a hardness ion). Bathing in magnesium-rich Dead Sea salt solution enhanced skin hydration and significantly reduced roughness; barrier function improved in the elevated-TEWL subgroup (Proksch et al., Int J Dermatol 2005, https://onlinelibrary.wiley.com/doi/10.1111/j.1365-4632.2005.02079.x).",
  "Saffron: 40-day infusion for a warm, golden look on the skin.":
    "Saffron review: depigmenting activity; used in anti-spot, moisturiser and anti-aging formulations (Dermoprotective Effects of Saffron: A Mini Review, PMID 34544335, https://pubmed.ncbi.nlm.nih.gov/34544335/). Colour from crocin. Colour statement.",
  "Sesame: unroasted and cold-pressed; a light slip that absorbs on damp skin.":
    "Sesame oil: emollient, valued for sensory characteristics and oxidative stability (Sesame: A Comprehensive Review, PMC9573514, https://pmc.ncbi.nlm.nih.gov/articles/PMC9573514/; PMC7914952). Formulation or sensory statement about this product; no efficacy implied. Verify against the finished formula and supplier specification before sale.",
  "Blackseed: supports the moisture barrier of the skin day to day.":
    "N. sativa oil is ~58% linoleic acid (Clinical Uses of Nigella sativa in Pediatrics, PMC12533698, https://pmc.ncbi.nlm.nih.gov/articles/PMC12533698/). Linoleate-rich oils accelerated skin-barrier recovery while olive, mustard and soybean oils delayed it (Darmstadt et al., Acta Paediatr 2002, PMID 12113324, https://pubmed.ncbi.nlm.nih.gov/12113324/).",
}

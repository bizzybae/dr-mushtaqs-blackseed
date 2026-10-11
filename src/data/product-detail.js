// Generated from the Supabase catalog on 2026-10-11 (products + cosmetic claims).
// Per-product detail that the product page renders as "What it's for", "How to use",
// and "Why it suits your skin". Hand-edited fields in catalog.js take precedence;
// seed:sql writes these back to the database, so edit here, not only in Supabase.
// Keep every line free of the banned terms in shared/claims.mjs.
export const PRODUCT_DETAIL = {
  "blackseed-oil": {
    intendedUse: "A daily spoonful of seed oil, taken straight or stirred into food.",
    sensoryLine: "Bold, peppery, unapologetically seed-y.",
    sensory: "Bold, peppery, a little bitter. Deep amber-gold. A big herbal aroma. This is an unrefined seed oil, not a neutral one.",
    storage: "Cool, dark place. Refrigerate after opening.",
    servingMl: 1,
    directions: [
      "Shake gently. The oil is unfiltered and may show natural sediment.",
      "Take one dropper, about 1 mL, with or after a meal.",
      "Never heat it. Stir into food after cooking, not during.",
    ],
    howTo: [
      ["Straight up", "One dropper, with or after a meal. Let it sit on the tongue a moment before swallowing."],
      ["In food", "Stir into honey, yogurt, or a smoothie, or drizzle over salad, labneh, or warm bread. Never heat it."],
    ],
  },
  "blackseed-oil-softgels": {
    intendedUse: "The same cold-pressed oil, measured at 500 mg per softgel, for travel or for anyone who would rather not taste it.",
    sensoryLine: "No taste, no aftertaste; swallow with water.",
    directions: [
      "Take two softgels daily with food, or as directed by your clinician or practitioner.",
      "Store below 25 °C with the lid tight. Do not refrigerate; condensation softens the shell.",
    ],
    howTo: [
      ["Daily", "Two softgels with a meal, at the same time each day."],
      ["Travel", "Induction-sealed jar; decant a week into a vial for the road."],
    ],
  },
  "golden-hour-saffron-infusion": {
    intendedUse: "Blackseed oil with whole saffron threads steeped for forty days, taken by the spoon or poured over food.",
    sensoryLine: "Honeyed and floral, with the pepper of the seed underneath.",
    directions: [
      "Shake. Take one teaspoon daily, straight or stirred into warm milk or tea.",
      "Finish rice, dal, or roasted vegetables with a thread of it.",
      "Store sealed in a cool cupboard; use within four months of opening.",
    ],
    howTo: [
      ["By the spoon", "One teaspoon in the late afternoon, the golden hour it is named for."],
      ["Over food", "Drizzle over rice, yogurt, or warm milk after cooking. Never heat it."],
    ],
  },
  "culinary-finishing-oil": {
    intendedUse: "A finishing oil for the table, drizzled over finished dishes and never heated.",
    sensoryLine: "Peppery and warm, with faint oregano and cumin.",
    directions: [
      "Drizzle over finished dishes just before serving.",
      "Pairs with lentils, chickpeas, labneh, roasted squash, eggs, and flatbread.",
      "Store sealed in a cool cupboard. Use within three months of opening.",
    ],
    howTo: [
      ["At the table", "A thin ribbon over labneh, lentils, roasted vegetables, or warm bread."],
      ["In the kitchen", "Whisk into dressings and dips; add after cooking, not during."],
    ],
  },
  "rose-blackseed-cleansing-oil": {
    intendedUse: "A rinse-off cleansing oil that dissolves makeup, sunscreen, and the day without stripping the skin.",
    sensoryLine: "Silky oil that turns milky with water; a trace of rose, then nothing.",
    directions: [
      "Press two pumps into dry palms and massage over a dry face for one minute.",
      "Add a splash of warm water and keep massaging; the oil turns milky.",
      "Rinse and follow with the face oil or serum.",
    ],
    howTo: [
      ["Evening", "Two pumps on dry skin, massage one minute, add warm water until milky, rinse."],
      ["Morning", "Optional: one pump as a quick rinse before the face oil."],
    ],
    why: [
      "Rose: damask petals infused for 21 days plus rose otto, chosen for how soft skin feels after rinsing.",
      "Blackseed: a light seed oil, high in linoleic acid, that lifts sunscreen and makeup and rinses clean.",
      "Grapeseed: a thin, fast-rinsing carrier that keeps the formula from feeling heavy.",
    ],
  },
  "saffron-blackseed-eye-concentrate": {
    intendedUse: "A light, cooling concentrate for the thin skin around the eyes, brightening the look of the under-eye and helping it look rested and hydrated.",
    sensoryLine: "Cool gel-cream, matte-satin finish, no scent.",
    sensory: "Cool gel-cream that sinks in within a minute. Matte-satin finish. No scent.",
    storage: "Cool, dry place or refrigerator. Keep the cap on; wipe the tip dry after use.",
    shelfLife: "12 months unopened; 6 months after opening.",
    directions: [
      "Start on clean, dry skin. Press the tube once; a rice-grain amount is enough for both eyes.",
      "Glide the cooling tip from the inner corner outward along the orbital bone; do not pull the skin.",
      "Roll upward over the brow bone and tap any remainder in with the ring finger.",
      "Wait 30 seconds, then follow with face oil or concealer.",
      "Morning: keep the tube in the refrigerator for a stronger cooling effect.",
    ],
    howTo: [
      ["Morning", "Keep the tube in the refrigerator; one pass per eye before concealer."],
      ["Night", "After the Grapevine Renewal Serum, before the Saffron Radiance Face Oil."],
      ["The tip", "Wipe with a dry tissue after use; never rinse under water."],
    ],
    why: [
      "Caffeine and rose hydrosol: a cooling, refreshed feel on application; rose water replaces fragrance so the formula stays fragrance-free near the eyes.",
      "Niacinamide 4%: vitamin B3, one of the best-studied cosmetic ingredients. In published trials it improved the look of uneven tone and fine lines and helped skin feel more resilient.",
      "Saffron: Crocus sativus stigma, the botanical behind Golden Hour and the Radiance oil, used in traditional cosmetics for a brighter-looking complexion; here it is carried in a light gel for the same brighter look under the eyes.",
      "Blackseed: cold-pressed Nigella sativa, the constant across every product. Fatty acids that leave the skin’s moisture barrier feeling comfortable, so thin under-eye skin feels hydrated for longer.",
      "Grapevine: Vitis vinifera shoot, the same botanical as the Renewal Serum. Polyphenols from the vine help even the appearance of skin tone and support a smoother-looking surface.",
    ],
  },
  "saffron-radiance-face-oil": {
    intendedUse: "A leave-on face oil for a brighter, more even-looking complexion, morning and night.",
    sensoryLine: "Golden in the bottle, sheer on skin, dry within ninety seconds.",
    directions: [
      "Warm six drops between fingertips.",
      "Press onto a clean, slightly damp face and neck, morning and night.",
      "Follow with the Blackseed Balm on dry areas, or sunscreen by day.",
    ],
    howTo: [
      ["Morning", "Six drops on damp skin, then sunscreen."],
      ["Night", "Six drops after the serum; seal dry areas with the balm."],
    ],
    why: [
      "Blackseed: cold-pressed seed oil rich in linoleic acid that supports the moisture barrier of the skin.",
      "Grapevine: vine polyphenols that help skin look smoother and more even in tone.",
      "Saffron: Grade I threads, 40-day infusion, for a brighter, more even-looking complexion.",
    ],
  },
  "grapevine-renewal-serum": {
    intendedUse: "An evening serum for skin that looks smoother and more even in tone.",
    sensoryLine: "Weightless, dry-touch, no scent.",
    directions: [
      "In the evening, after cleansing, press four to six drops onto face and neck.",
      "Layer the Saffron Radiance Face Oil on top if skin is dry.",
      "Use nightly.",
    ],
    howTo: [
      ["Night", "Four to six drops on face and neck after cleansing."],
      ["Layering", "Face oil on top if skin is dry; the eye concentrate last."],
    ],
    why: [
      "Blackseed: a light seed oil that leaves a dry, weightless finish.",
      "Fragrance-free: nothing added that the skin does not need at night.",
      "Grapevine shoot: standardized stilbenes, the family that includes resveratrol and viniferins, for skin that looks smoother and more even in tone.",
    ],
  },
  "blackseed-balm": {
    intendedUse: "A dense anhydrous balm to seal moisture into dry places: hands, elbows, heels, lips, and over the face oil at night.",
    sensoryLine: "Slow-melting, amber-tinted, faint frankincense.",
    directions: [
      "Warm a small amount between fingertips until it melts.",
      "Press into clean, dry skin wherever it feels tight, or over the face oil as a final seal at night.",
      "Use after washing and before bed for the longest contact time.",
    ],
    howTo: [
      ["Spot use", "Warm a pea-sized amount and press into dry patches."],
      ["Night seal", "A thin layer over the face oil on the driest areas."],
    ],
    why: [
      "Blackseed: cold-pressed oil in an anhydrous base, so there is no water and no need for a preservative.",
      "Frankincense resin oil: the only aroma, chosen for its dry, resinous warmth.",
      "Anhydrous base: a slow-melting seal that helps hold moisture in dry places.",
    ],
  },
  "amla-blackseed-hair-oil": {
    intendedUse: "A pre-wash hair oil for scalp and lengths, left on for an hour or overnight before shampooing.",
    sensoryLine: "Rich but not sticky; warm, nutty amla.",
    directions: [
      "Warm a tablespoon of oil in your palms.",
      "Part the hair and massage into the scalp for five minutes, then work through the lengths.",
      "Leave for an hour, or overnight under a towel, then shampoo twice.",
    ],
    howTo: [
      ["Sunday oiling", "Part the hair, apply to the scalp with the nozzle, massage, then work through the lengths. Leave one hour or overnight."],
      ["Quick version", "Lengths only, twenty minutes before washing."],
    ],
    why: [
      "Amla: sun-dried fruit infused for 21 days, long used in oiling traditions for hair that looks glossy and feels soft.",
      "Blackseed: softens the scalp before washing without leaving residue.",
      "Sesame: unroasted, cold-pressed carrier that spreads easily through the lengths.",
    ],
  },
  "scalp-beard-serum": {
    intendedUse: "A leave-on serum for scalp and beard that softens without a greasy finish.",
    sensoryLine: "Dry finish; rosemary and the note of the seed itself.",
    directions: [
      "Beard: dispense 3 to 5 drops into palms, rub to warm, work from skin outward, then comb.",
      "Scalp: part hair and apply a few drops directly to the scalp. Massage for a minute. Leave in.",
      "Use daily or as needed.",
    ],
    howTo: [
      ["Scalp", "Four to six drops along the parting, massaged in, morning or night."],
      ["Beard", "Three drops warmed in the palms, worked through to the skin beneath."],
    ],
    why: [
      "Blackseed: light conditioning for the skin under the beard.",
      "Grapevine: a dry-touch finish with no greasy feel.",
      "Rosemary leaf oil: a bright, cooling note on the scalp.",
    ],
  },
  "blackseed-bath-soak": {
    intendedUse: "A weekly mineral bath with blackseed oil and frankincense for a twenty-minute soak.",
    sensoryLine: "Coarse salts, soft water, resinous frankincense.",
    directions: [
      "Add two scoops to a warm bath as it fills.",
      "Soak for twenty minutes.",
      "Pat dry and follow with the Saffron & Sesame Body Oil on damp skin.",
    ],
    howTo: [
      ["Weekly", "Two scoops under running warm water; soak twenty minutes."],
      ["Foot soak", "Half a scoop in a basin for the quick version."],
    ],
    why: [
      "Blackseed oil: leaves skin feeling supple after the soak.",
      "Frankincense: the only scent, resinous and quiet.",
      "Dead Sea and Epsom salts: coarse, magnesium-rich minerals; bathing in Dead Sea salt solution has been shown to leave skin smoother and better hydrated.",
    ],
  },
  "saffron-sesame-body-oil": {
    intendedUse: "A daily body oil for after the shower, applied to damp skin.",
    sensoryLine: "Light sesame slip, saffron warmth, frankincense.",
    directions: [
      "Stand the bottle in a bowl of hot water for five minutes.",
      "Massage warm oil over the whole body with long strokes toward the heart; circles over joints.",
      "Rest ten minutes, then shower without soap on the oiled areas.",
    ],
    howTo: [
      ["After the shower", "Two pumps on damp skin in upward strokes before towel-drying fully."],
      ["Massage", "Warm in the palms for a slower evening application."],
    ],
    why: [
      "Saffron: 40-day infusion for a warm, golden look on the skin.",
      "Sesame: unroasted and cold-pressed; a light slip that absorbs on damp skin.",
      "Blackseed: supports the moisture barrier of the skin day to day.",
    ],
  },
  "oud-noir-attar": {
    intendedUse: "An alcohol-free attar for pulse points: dark wood and warm seed.",
    sensoryLine: "Oud, labdanum, frankincense; 8 to 10 hours close to the skin.",
    directions: [
      "Touch the dabber to wrists, behind the ears, and the hollow of the throat.",
      "Do not rub; let it warm.",
      "Layer under Kesar Rose for a softer edge.",
    ],
    howTo: [
      ["Wear", "One dab on wrists and behind the ears; the glass dabber measures it."],
      ["Layer", "Over the body oil on the same points for longer wear."],
    ],
  },
  "kesar-rose-attar": {
    intendedUse: "An alcohol-free attar of damask rose with saffron and sandalwood.",
    sensoryLine: "Rose, saffron, sandalwood; 6 to 8 hours.",
    directions: [
      "Touch the dabber to wrists and throat.",
      "Wear alone, or over Oud Noir for depth.",
    ],
    howTo: [
      ["Wear", "One dab on wrists and behind the ears."],
      ["Layer", "Over the body oil on the same points for longer wear."],
    ],
  },
  "vigne-verte-attar": {
    intendedUse: "An alcohol-free green attar of grapevine leaf and vetiver.",
    sensoryLine: "Green and woody with bright bergamot; 5 to 7 hours.",
    directions: [
      "Touch the dabber to wrists and the back of the neck.",
      "Best in daylight and warm weather.",
    ],
    howTo: [
      ["Wear", "One dab on wrists and behind the ears."],
      ["Layer", "Over the body oil on the same points for longer wear."],
    ],
  },
  "fragrance-discovery-set": {
    intendedUse: "Three 3 mL attars to wear for a week each before choosing; the set price is credited toward any 30 mL.",
    sensoryLine: "Three vials, one rigid black box.",
    directions: [
      "Wear one attar per week on the pulse points.",
      "Use the code inside the lid toward a full bottle.",
    ],
    howTo: [
      ["Week by week", "Wear one attar for a week, then the next."],
      ["Choose", "Use the enclosed credit toward the 30 mL you keep reaching for."],
    ],
  },
  "the-travel-ritual": {
    intendedUse: "Blackseed Oil portioned into five 10 mL vials for the road.",
    directions: [
      "One vial is about ten days at 1 mL daily.",
      "Keep sealed vials in the box, away from light.",
    ],
    howTo: [
      ["Pack", "One vial is about ten days of the daily dropper."],
      ["At home", "The walnut stand keeps the vials upright on the shelf."],
    ],
  },
  "the-morning-protocol": {
    intendedUse: "The dropper bottle for home and the softgels for away, bought together.",
    directions: [
      "One dropper or two softgels daily, not both.",
    ],
    howTo: [
      ["Home", "One dropper with breakfast."],
      ["Away", "Two softgels in the travel case."],
    ],
  },
  "the-skin-ritual": {
    intendedUse: "The full three-step skin routine: cleanse, nourish, seal.",
    directions: [
      "Morning: cleanse, six drops of face oil, sunscreen.",
      "Evening: cleanse, face oil, balm on dry areas.",
    ],
    howTo: [
      ["Evening", "Cleansing Oil, Face Oil, Balm on dry areas."],
      ["Morning", "Face Oil, then sunscreen."],
    ],
  },
  "the-hair-ritual": {
    intendedUse: "The Sunday pre-wash oiling and the everyday leave-on serum.",
    directions: [
      "Oil once a week before washing; serum daily after.",
    ],
    howTo: [
      ["Sunday", "Hair Oil for one hour or overnight, then wash."],
      ["Daily", "Serum along the parting or through the beard."],
    ],
  },
  "the-founders-set": {
    intendedUse: "What Dr. Mushtaq gives: the oil, the balm, and the three attars, boxed.",
    directions: [
      "Add a gift note at checkout.",
    ],
    howTo: [
      ["Within", "One dropper daily."],
      ["Skin and scent", "Balm on dry places; attars on pulse points."],
    ],
  },
  "the-complete-shelf": {
    intendedUse: "Nine products in starting sizes across Within, Skin, Hair, and Body.",
    directions: [
      "Follow the Protocol page for a day with the shelf.",
    ],
    howTo: [
      ["A day", "Oil at breakfast, cleanse and nourish at night, hair on Sunday, a soak once a week."],
      ["Pricing", "20% against buying separately."],
    ],
  },
  "practitioner-case": {
    intendedUse: "Six 500 mL bottles from one lot with one certificate, for clinics and dispensaries.",
    directions: [
      "Dispense as your practice sees fit. Lot number is printed on every bottle for your records.",
    ],
    howTo: [
      ["Dispense", "Twelve glass pipettes included; the lot number goes on each dispensed bottle."],
      ["Certificate", "The COA for the lot is enclosed and published on /coa."],
    ],
  },
}

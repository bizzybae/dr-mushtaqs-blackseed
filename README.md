# Dr. Mushtaq’s Blackseed

Storefront for Dr. Mushtaq’s, a physician-formulated botanical line organized by purpose: Within (taken daily), Skin,
Hair, Body, Fragrance (alcohol-free attars), and Ritual Sets. 23 products across 6 collections, most in two or three
sizes with per-mL savings on larger bottles, starting at $80 for 125 mL. Blackseed (Nigella sativa, standardized to
4.64% thymoquinone) is the constant; saffron, grapevine, rose, amla, sesame, oud, sandalwood, vetiver, frankincense,
and rosemary join it by use case. Built with Vite, React 18, Tailwind CSS, Supabase, and Stripe Checkout, deployed on
Vercel.

Marketing follows the physician-as-brand approach: the founder page (`/dr-mushtaq`) carries factual credentials and a
disclosure, every product makes specification claims only, and the Botanicals and Practitioners pages name each
material in Ayurvedic, Unani, and Chinese medicine terms for practitioner reference without indications.

## Stack

| Layer | Where |
| --- | --- |
| Frontend | `src/` (Vite + React Router). Reads the catalog from Supabase; falls back to `src/data/catalog.js`. |
| Photography | `public/products/*.{webp,jpg}` at 1600 and 800 px, served from Vercel’s CDN with immutable caching. |
| Database | Supabase project `dr-mushtaqs-blackseed` (`zssbavhybjmfybjugrfz`). Migrations in `supabase/migrations/`, seed in `supabase/seed.sql`. |
| Checkout | `api/checkout.js` creates a Stripe Checkout Session from database prices. `api/webhook.js` records paid orders. |
| Brand mark | `src/components/Logo.jsx` is the only place the hexagon-and-drop mark is drawn. `public/favicon.svg` mirrors it. |

## Local development

```bash
npm install
cp .env.example .env.local   # fill in the Supabase publishable key
npm run dev
```

Serverless functions in `api/` do not run under `vite dev`; use `vercel dev` to exercise checkout locally.

## Environment variables

| Variable | Scope | Purpose |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | build | Supabase API URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | build | Public key for catalog reads and newsletter inserts |
| `STRIPE_SECRET_KEY` | server | Creates Checkout Sessions |
| `STRIPE_WEBHOOK_SECRET` | server | Verifies `/api/webhook` signatures |
| `SUPABASE_SERVICE_ROLE_KEY` | server | Lets the webhook write `orders` and `order_items` |
| `STRIPE_AUTOMATIC_TAX` | server | `true` once Stripe Tax is enabled |
| `PUBLIC_SITE_URL` | server | Canonical origin for success and cancel URLs |

Until `STRIPE_SECRET_KEY` is set, `/api/checkout` returns `503 checkout_not_configured` and the storefront shows a
friendly notice instead of a payment page.

## Updating the catalog

Prices, copy, variants, and images live in Supabase. Edit `src/data/catalog.js` (products, botanicals, collections)
or `src/data/site.js` (navigation, founder page, FAQ, policies), run `npm run seed:sql`, commit so the generated
`supabase/seed.json` is on `main`, then run `supabase/seed.sql` in the SQL editor (it needs the `http` extension and
fetches the JSON from GitHub); or edit rows directly in the Supabase dashboard. Anything not in the seed is unpublished,
not deleted. The site reads the database at
runtime, so no redeploy is needed for price or copy changes.

To publish lot results, insert a row in `batches` (lot number, press date, thymoquinone %, COA path). The product page
shows the batch table automatically.

## Compliance

See `COMPLIANCE.md`. The copy makes specification claims only (origin, process, thymoquinone %, testing). No disease,
treatment, or outcome language is used anywhere.

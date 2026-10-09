# Dr. Mushtaq’s Blackseed

Storefront for the five Dr. Mushtaq’s products: Blackseed Oil (100 mL and the Travel Ritual), Blackseed Oil Softgels,
Blackseed Balm, Scalp & Beard Serum, and Culinary Finishing Oil. Built with Vite, React 18, Tailwind CSS, Supabase,
and Stripe Checkout, deployed on Vercel.

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

Prices, copy, variants, and images live in Supabase. Edit `src/data/catalog.js`, run `npm run seed:sql`, and apply
`supabase/seed.sql` in the SQL editor; or edit rows directly in the Supabase dashboard. The site reads the database at
runtime, so no redeploy is needed for price or copy changes.

To publish lot results, insert a row in `batches` (lot number, press date, thymoquinone %, COA path). The product page
shows the batch table automatically.

## Compliance

See `COMPLIANCE.md`. The copy makes specification claims only (origin, process, thymoquinone %, testing). No disease,
treatment, or outcome language is used anywhere.

# Dr. Mushtaq’s Blackseed

Storefront for Dr. Mushtaq’s, a physician-formulated botanical line organized by purpose: Within (taken daily), Skin,
Hair, Body, Fragrance (alcohol-free attars), and Ritual Sets. 23 products across 6 collections, most in two or three
sizes with per-mL savings on larger bottles, starting at $80 for 125 mL. Blackseed (Nigella sativa, standardized to
4.64% thymoquinone) is the constant; saffron, grapevine, rose, amla, sesame, oud, sandalwood, vetiver, frankincense,
and rosemary join it by use case. Built with Vite, React 18, Tailwind CSS, Supabase, and Stripe Checkout, deployed on
Vercel.

Launch state: every product carries a lifecycle `status` (`concept`, `prelaunch`, `available`, `sold_out`). Nothing is
purchasable until the owner flips a product to `available`; until then the storefront collects a double-opt-in waitlist
and the checkout function refuses non-available SKUs server-side. Concepts live on `/coming-soon` only. Lab results
render only from published rows in `batches` (`/coa`, `/coa/:lot`, and the BatchBadge); no number appears anywhere
until a lot is published.

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

## Content (Sanity)

Editorial copy comes from Sanity when `VITE_SANITY_PROJECT_ID` (and optionally `VITE_SANITY_DATASET`) is set; the
storefront falls back to `src/data/site.js` and the editorial fields in `src/data/catalog.js` otherwise, field by field,
so a half-filled Studio never blanks a section. `src/lib/content.jsx` shapes Sanity documents into exactly the objects
`site.js` exports (`useSite()`), and `CatalogProvider` overlays `productContent` documents onto products by slug.

- Studio: `studio/` is its own package (Sanity v6, React 19, Node 22). `npm run studio` for local, `npm run
  studio:deploy` to host it at `dr-mushtaqs.sanity.studio` (set `SANITY_STUDIO_PROJECT_ID`).
- Schemas: `studio/schemas/index.js`. Singletons for site settings, home, founder, heritage, lab-reports guide,
  practitioners, safety; collections for FAQ groups, policies, botanicals, and product copy. Every document type runs
  the banned-word rule from `shared/claims.mjs` as document-level validation, so the Studio refuses to publish a term
  the build would also reject.
- Import: `npm run sanity:import` writes `sanity/import.ndjson` from the repo copy; add `--push` with
  `SANITY_PROJECT_ID` and `SANITY_API_TOKEN` to upsert (use `--no-overwrite` once editors have made changes).
- Commerce facts (prices, sizes, status, lots, waitlist) never live in Sanity.

## Owner console

`/owner` is a Supabase-authenticated console for lots and certificates (with PDF upload to the public `coa` bucket),
product status, the waitlist (CSV export), and practitioner inquiries. Access is an email allow-list in
`public.owners`, enforced by RLS policies that call `public.is_owner()`; everyone else gets empty tables. Sign-in is a
magic link, so add the site URL and `/owner` redirect to Supabase Auth → URL Configuration.

## Waitlist email

`api/waitlist.js` inserts the row with the publishable key (public-insert RLS) and sends the confirmation through Resend
when `RESEND_API_KEY` is set (`WAITLIST_FROM` optional). Confirm and unsubscribe links hit `GET /api/waitlist?confirm=`
and `?unsubscribe=` and need `SUPABASE_SERVICE_ROLE_KEY`. Without the Resend key the row is still stored and the UI
shows the no-email success copy.

## Publishing a lot

Insert a row in `batches` with `published = true` (and `is_current = true` for the shipping lot). Fill only the fields the
laboratory reported; the lot page hides empty rows. The QR code on the bottle should point at `/coa/<lot_number>`.

## Claims check

`npm run check:claims` (also runs before every build and in CI) scans `src/`, `index.html`, `studio/schemas`, and
`public/favicon.svg` for the banned-word list in `shared/claims.mjs`, which the Sanity Studio also enforces. Only the FDA disclaimer, the safety line, and the labelled hadith
quotation are allowlisted.

## Compliance

See `COMPLIANCE.md`. The copy makes specification claims only (origin, process, thymoquinone %, testing). No disease,
treatment, or outcome language is used anywhere.

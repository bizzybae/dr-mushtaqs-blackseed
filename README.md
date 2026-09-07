# Dr. Mushtaq’s Blackseed

A responsive storefront for Dr. Mushtaq’s Blackseed Oil, built with Vite, React 18, and Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploying to Vercel

The repository is deployment ready. Import it as a Vercel project and keep the defaults:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

Every push to `main` then produces a production deployment.

## Project structure

- `src/App.jsx` composes the page and owns bag state
- `src/components` holds the header, hero, product, standards, collection, heritage, founder, FAQ, newsletter, cart drawer, and footer
- `src/data/site.js` holds all product copy, category copy, the quoted narration, and FAQ content
- `src/components/BottleArt.jsx` renders the original product illustration as inline SVG

## What is intentionally not built

Checkout, payments, accounts, analytics, and email capture are disabled. The bag and newsletter are interface
demonstrations that store nothing. See COMPLIANCE.md before enabling commerce.

## Optional Supabase layer

If you later add Supabase, scope it to opt in leads, inventory, orders, and consent records. Enable Row Level Security
on every public table, keep the service role key server side only, and leave payment card data with a PCI compliant
processor.

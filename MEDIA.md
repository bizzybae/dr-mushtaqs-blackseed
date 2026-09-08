# Product photography

Eleven studio shots cover the full catalog. Filenames are slugs, so the registry
in `src/data/productImages.js` resolves them without any per-page wiring.

## Confirmed mapping

| Source file | Slug | Shot |
| --- | --- | --- |
| IMG_3561 | `culinary-finishing-oil` | Culinary Finishing Oil, 250 ml, gold pour spout |
| IMG_3562 | `blackseed-immunity-tea` | Immunity Tea tin, 40 sachets |
| IMG_3560 | `blackseed-miswak-oral-gel` | Blackseed & Miswak Oral Gel, 75 ml |
| IMG_3563 | `gift-set` | Gift set: dropper bottle, balm, vials, card |
| IMG_3559 | `blackseed-cleansing-bar` | Cleansing Bar, 120 g charcoal |
| IMG_3556 | `blackseed-sidr-honey` | Blackseed & Sidr Honey, 250 g |
| IMG_3557 | `scalp-beard-serum` | Scalp & Beard Serum, 60 ml |
| IMG_3555 | `blackseed-balm` | Blackseed Balm, 50 ml |
| IMG_3558 | `travel-ritual-set` | Travel Ritual, five 10 ml vials |
| IMG_3554 | `blackseed-oil-softgels` | Softgels, 90 count, 500 mg |
| IMG_3553 | `collection-flatlay` | Full collection flat-lay (hero) |

No standalone shot of the flagship 100 ml Blackseed Oil dropper bottle exists
yet; it only appears inside `gift-set` and `collection-flatlay`.

## Asset variants

Each slug ships four files: `<slug>.webp`, `<slug>.jpg` (1600 px wide) and
`<slug>@800.webp`, `<slug>@800.jpg`. WebP at 1600 px runs 43-118 KB per shot.

## Option A: serve from /public (no Supabase needed)

1. Copy the optimized files into `public/products/`.
2. Commit and push. Vercel rebuilds and serves them from its CDN.
3. Leave `VITE_MEDIA_BASE` unset; the registry defaults to `/products`.

## Option B: serve from Supabase Storage

1. Apply `supabase/migrations/20260907_product_images.sql`.
2. Run the uploader:

   ```bash
   npm i -D @supabase/supabase-js
   SUPABASE_URL=https://<ref>.supabase.co \
   SUPABASE_SERVICE_ROLE_KEY=<service-role-key> \
   node scripts/upload-product-images.mjs public/products
   ```

3. Set `VITE_MEDIA_BASE` in Vercel to the printed public base URL and redeploy.

## Replacing the placeholder SVG

`ProductPhoto` falls back to `BottleArt` whenever a slug has no photo, so the
swap is a one-line change per surface:

```jsx
import ProductPhoto from './ProductPhoto'

// was: <BottleArt />
<ProductPhoto slug={product.slug} priority />
```

Apply it in `ProductCard.jsx`, `ProductPage.jsx`, `Product.jsx`, and `Hero.jsx`
(use `slug="collection-flatlay"` for the hero). Once every surface is converted,
`public/bottle.svg` and `BottleArt.jsx` can be deleted.

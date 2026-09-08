#!/usr/bin/env node
// Uploads optimized product photography to Supabase Storage and registers each
// file in public.product_images.
//
// Usage:
//   npm i -D @supabase/supabase-js
//   SUPABASE_URL=https://<ref>.supabase.co \
//   SUPABASE_SERVICE_ROLE_KEY=<service-role-key> \
//   node scripts/upload-product-images.mjs public/products
//
// The service-role key bypasses RLS. Never commit it and never expose it to the
// browser bundle.

import { readdir, readFile } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'
import { createClient } from '@supabase/supabase-js'

const DIR = process.argv[2] || 'public/products'
const BUCKET = process.env.SUPABASE_BUCKET || 'product-media'
const URL_ = process.env.SUPABASE_URL
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!URL_ || !KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const CONTENT_TYPES = {
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.avif': 'image/avif',
}

const sb = createClient(URL_, KEY, { auth: { persistSession: false } })

const { error: bucketError } = await sb.storage.createBucket(BUCKET, {
  public: true,
  fileSizeLimit: '10MB',
  allowedMimeTypes: Object.values(CONTENT_TYPES),
})
if (bucketError && !/exist/i.test(bucketError.message)) {
  console.error(`Bucket error: ${bucketError.message}`)
  process.exit(1)
}

const files = (await readdir(DIR)).filter((f) => CONTENT_TYPES[extname(f).toLowerCase()])
if (!files.length) {
  console.error(`No images found in ${DIR}`)
  process.exit(1)
}

let ok = 0
let failed = 0

for (const file of files.sort()) {
  const ext = extname(file).toLowerCase()
  const body = await readFile(join(DIR, file))

  const { error: uploadError } = await sb.storage.from(BUCKET).upload(file, body, {
    contentType: CONTENT_TYPES[ext],
    cacheControl: '31536000',
    upsert: true,
  })

  if (uploadError) {
    failed += 1
    console.error(`FAIL  ${file}  ${uploadError.message}`)
    continue
  }

  const stem = basename(file, ext)
  const { error: rowError } = await sb.from('product_images').upsert(
    {
      slug: stem.replace(/@\d+$/, ''),
      bucket: BUCKET,
      path: file,
      width: /@800$/.test(stem) ? 800 : 1600,
      format: ext.slice(1),
    },
    { onConflict: 'bucket,path' },
  )

  ok += 1
  console.log(`ok    ${file}${rowError ? `  (row skipped: ${rowError.message})` : ''}`)
}

console.log(`\n${ok} uploaded, ${failed} failed`)
console.log(`Public base URL:\n  ${URL_}/storage/v1/object/public/${BUCKET}`)
console.log('\nSet this in Vercel to serve photos from Supabase:')
console.log(`  VITE_MEDIA_BASE=${URL_}/storage/v1/object/public/${BUCKET}`)

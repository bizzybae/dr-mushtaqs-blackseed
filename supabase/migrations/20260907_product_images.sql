-- Registry of product photography stored in Supabase Storage.
-- Storage objects themselves live in the public 'product-media' bucket; this
-- table records which file belongs to which product and at which width.

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  bucket text not null default 'product-media',
  path text not null,
  width integer,
  format text,
  alt text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint product_images_bucket_path_key unique (bucket, path)
);

create index if not exists product_images_slug_idx
  on public.product_images (slug, sort_order, width);

alter table public.product_images enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'product_images'
      and policyname = 'product_images_public_read'
  ) then
    create policy product_images_public_read
      on public.product_images
      for select
      using (true);
  end if;
end $$;

-- v2: five-product catalog adjustments
alter table public.products drop constraint if exists products_category_check;
alter table public.products add constraint products_category_check
  check (category = any (array['oil','softgel','topical','hair','culinary','bundle']));

alter table public.products add column if not exists tagline text;
alter table public.products add column if not exists sort_order integer default 0;
alter table public.products add column if not exists badges text[] default '{}'::text[];
alter table public.products add column if not exists specs jsonb default '[]'::jsonb;

alter table public.product_images add column if not exists aspect numeric;

alter table public.product_variants add column if not exists sort_order integer default 0;
alter table public.product_variants add column if not exists image_storage_path text;
alter table public.product_variants add column if not exists description text;

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);
alter table public.site_settings enable row level security;
drop policy if exists "public read settings" on public.site_settings;
create policy "public read settings" on public.site_settings for select using (true);

insert into public.site_settings (key, value) values
  ('free_shipping_threshold_cents', '7500'::jsonb),
  ('flat_shipping_cents', '695'::jsonb),
  ('announcement', '"Complimentary shipping on orders over $75"'::jsonb),
  ('currency', '"usd"'::jsonb)
on conflict (key) do update set value = excluded.value, updated_at = now();

-- orders: allow webhook (service role) inserts implicitly; add helpful index
create index if not exists orders_stripe_session_idx on public.orders (stripe_session_id);
create index if not exists product_variants_sku_idx on public.product_variants (sku);

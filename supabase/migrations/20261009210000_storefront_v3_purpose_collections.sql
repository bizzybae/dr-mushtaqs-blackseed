-- v3: purpose-led collections, botanicals, sets, practitioner inquiries
alter table public.products drop constraint if exists products_category_check;
alter table public.products add constraint products_category_check
  check (category = any (array['oil','softgel','topical','hair','culinary','fragrance','bundle']));

alter table public.products add column if not exists collection_slug text references public.collections(slug) on update cascade;
alter table public.products add column if not exists step text;
alter table public.products add column if not exists botanicals text[] default '{}'::text[];
alter table public.products add column if not exists mosaic text[] default '{}'::text[];
alter table public.products add column if not exists is_bestseller boolean default false;
create index if not exists products_collection_idx on public.products (collection_slug, sort_order);

alter table public.collections add column if not exists short_label text;
alter table public.collections add column if not exists steps text[] default '{}'::text[];

create table if not exists public.botanicals (
  key text primary key,
  name text not null,
  latin text not null,
  part text,
  origin text,
  ayurveda text,
  unani text,
  tcm text,
  note text
);
alter table public.botanicals enable row level security;
drop policy if exists "public read botanicals" on public.botanicals;
create policy "public read botanicals" on public.botanicals for select using (true);

create table if not exists public.practitioner_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  practice text,
  credential text,
  note text,
  status text default 'new' check (status in ('new','verified','declined')),
  created_at timestamptz default now()
);
alter table public.practitioner_inquiries enable row level security;
drop policy if exists "anyone can apply" on public.practitioner_inquiries;
create policy "anyone can apply" on public.practitioner_inquiries for insert with check (true);

insert into public.site_settings (key, value) values
  ('free_shipping_threshold_cents', '15000'::jsonb),
  ('flat_shipping_cents', '900'::jsonb),
  ('announcement', '"Complimentary shipping on orders over $150"'::jsonb)
on conflict (key) do update set value = excluded.value, updated_at = now();

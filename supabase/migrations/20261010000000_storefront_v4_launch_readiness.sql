-- v4: launch readiness. Additive only.
--   * batches: full lab panel columns + publish flag; public read limited to published rows
--   * products: lifecycle status, use/directions/sensory/storage fields
--   * waitlist: double opt-in list, public insert only

-- Batches -------------------------------------------------------------------
alter table public.batches add column if not exists press_date date;
alter table public.batches add column if not exists origin_country text;
alter table public.batches add column if not exists origin_region text;
alter table public.batches add column if not exists tq_method text;
alter table public.batches add column if not exists fatty_acid_profile jsonb;
alter table public.batches add column if not exists heavy_metals_result text;
alter table public.batches add column if not exists micro_result text;
alter table public.batches add column if not exists lab_name text;
alter table public.batches add column if not exists coa_pdf_url text;
alter table public.batches add column if not exists published boolean not null default false;
alter table public.batches add column if not exists is_current boolean not null default false;
create unique index if not exists batches_lot_number_key on public.batches (lot_number);
create index if not exists batches_published_idx on public.batches (published, press_date desc);

-- keep the legacy pressed_date column in step with press_date
update public.batches set press_date = pressed_date where press_date is null and pressed_date is not null;

drop policy if exists "public read batches" on public.batches;
drop policy if exists "public read published batches" on public.batches;
create policy "public read published batches" on public.batches for select using (published = true);

-- Products ------------------------------------------------------------------
alter table public.products add column if not exists status text not null default 'concept'
  check (status in ('concept', 'prelaunch', 'available', 'sold_out'));
alter table public.products add column if not exists intended_use text;
alter table public.products add column if not exists directions text[] default '{}'::text[];
alter table public.products add column if not exists sensory_notes text;
alter table public.products add column if not exists storage text;
alter table public.products add column if not exists shelf_life text;
alter table public.products add column if not exists serving text;
alter table public.products add column if not exists serving_ml numeric(6,2);
alter table public.products add column if not exists how_to jsonb default '[]'::jsonb;
alter table public.products add column if not exists sensory_line text;
create index if not exists products_status_idx on public.products (status);

-- Waitlist ------------------------------------------------------------------
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  sku text,
  source text,
  confirmed boolean not null default false,
  confirm_token uuid not null default gen_random_uuid(),
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (email, sku)
);
alter table public.waitlist enable row level security;
drop policy if exists "public insert" on public.waitlist;
create policy "public insert" on public.waitlist for insert with check (true);
-- no public select, update, or delete: confirmation and unsubscribe run with the service role
revoke select, update, delete on public.waitlist from anon, authenticated;
revoke truncate, trigger, references on public.waitlist from anon, authenticated;
revoke truncate, trigger, references on public.practitioner_inquiries from anon, authenticated;

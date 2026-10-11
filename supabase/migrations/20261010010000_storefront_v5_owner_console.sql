-- v5: owner console. Additive only.
-- An allow-list of owner emails, a helper that checks the signed-in user's
-- email against it, and policies that let owners read and manage lots,
-- waitlist rows, and practitioner inquiries from the storefront's /owner route.
-- Public access is unchanged: published batches read-only, inserts only on
-- waitlist and practitioner_inquiries.

create table if not exists public.owners (
  email text primary key,
  added_at timestamptz not null default now()
);
alter table public.owners enable row level security;
revoke all on public.owners from anon, authenticated;

create or replace function public.is_owner()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.owners o
    where lower(o.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
revoke all on function public.is_owner() from public;
grant execute on function public.is_owner() to authenticated;

insert into public.owners (email) values
  ('quddaratmushtaq@startwithyou.ventures'),
  ('shahbaz@startwithyou.ventures')
on conflict (email) do nothing;

-- Batches: owners see every lot (published or not) and can create and edit.
drop policy if exists "owners read batches" on public.batches;
create policy "owners read batches" on public.batches for select to authenticated using (public.is_owner());
drop policy if exists "owners insert batches" on public.batches;
create policy "owners insert batches" on public.batches for insert to authenticated with check (public.is_owner());
drop policy if exists "owners update batches" on public.batches;
create policy "owners update batches" on public.batches for update to authenticated using (public.is_owner()) with check (public.is_owner());
grant select, insert, update on public.batches to authenticated;

-- Products: owners may read every row (already public) and flip status.
drop policy if exists "owners update products" on public.products;
create policy "owners update products" on public.products for update to authenticated using (public.is_owner()) with check (public.is_owner());
grant update (status) on public.products to authenticated;

-- Waitlist: owners read; nobody else.
drop policy if exists "owners read waitlist" on public.waitlist;
create policy "owners read waitlist" on public.waitlist for select to authenticated using (public.is_owner());
grant select on public.waitlist to authenticated;

-- Practitioner inquiries: owners read and update status.
drop policy if exists "owners read inquiries" on public.practitioner_inquiries;
create policy "owners read inquiries" on public.practitioner_inquiries for select to authenticated using (public.is_owner());
drop policy if exists "owners update inquiries" on public.practitioner_inquiries;
create policy "owners update inquiries" on public.practitioner_inquiries for update to authenticated using (public.is_owner()) with check (public.is_owner());
grant select, update on public.practitioner_inquiries to authenticated;

-- Storage bucket for certificate PDFs: public read, owner upload.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('coa', 'coa', true, 20971520, array['application/pdf'])
on conflict (id) do nothing;
drop policy if exists "public read coa" on storage.objects;
create policy "public read coa" on storage.objects for select using (bucket_id = 'coa');
drop policy if exists "owners upload coa" on storage.objects;
create policy "owners upload coa" on storage.objects for insert to authenticated with check (bucket_id = 'coa' and public.is_owner());
drop policy if exists "owners update coa" on storage.objects;
create policy "owners update coa" on storage.objects for update to authenticated using (bucket_id = 'coa' and public.is_owner());

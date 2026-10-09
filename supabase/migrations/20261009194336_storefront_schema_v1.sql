create extension if not exists "pgcrypto";

create table collections (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  hero_image_url text,
  sort_order int default 0,
  is_published boolean default false,
  created_at timestamptz default now()
);

create table products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  subtitle text,
  category text check (category in ('oil','topical','oral_care','tea','exfoliant','accessory','bundle')),
  product_type text check (product_type in ('supplement','cosmetic','food','device','bundle')),
  short_description text,
  long_description text,
  inci_ingredients text,
  is_featured boolean default false,
  is_new boolean default false,
  is_published boolean default false,
  seo_title text,
  seo_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  sku text unique not null,
  label text not null,
  size_ml numeric,
  price_cents int not null,
  compare_at_cents int,
  subscription_price_cents int,
  stock int default 0,
  is_default boolean default false,
  stripe_price_id text,
  created_at timestamptz default now()
);

create table collection_products (
  collection_id uuid references collections(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  sort_order int default 0,
  primary key (collection_id, product_id)
);

create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  storage_path text not null,
  alt text,
  sort_order int default 0
);

create table product_sections (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  section_type text not null check (section_type in ('badges','how_to_use','protocol','key_points','origin_story','faq','press','batch_spec')),
  content jsonb not null,
  sort_order int default 0
);

create table claims (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  text text not null,
  claim_type text not null check (claim_type in ('structure_function','cosmetic','spec','education')),
  requires_dshea_disclaimer boolean default true,
  approved_by text,
  approved_at timestamptz
);

create table batches (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id),
  lot_number text unique not null,
  harvest_date date,
  pressed_date date,
  best_by date,
  thymoquinone_pct numeric,
  acid_value numeric,
  peroxide_value numeric,
  coa_storage_path text,
  created_at timestamptz default now()
);

create table bundle_items (
  bundle_product_id uuid references products(id) on delete cascade,
  variant_id uuid references product_variants(id) on delete cascade,
  quantity int default 1,
  primary key (bundle_product_id, variant_id)
);

create table reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  author_name text,
  rating int check (rating between 1 and 5),
  title text,
  body text,
  is_verified_buyer boolean default false,
  is_approved boolean default false,
  created_at timestamptz default now()
);

create table subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  source text,
  created_at timestamptz default now()
);

create table quiz_responses (
  id uuid primary key default gen_random_uuid(),
  email text,
  answers jsonb not null,
  recommended_product_ids uuid[],
  created_at timestamptz default now()
);

create table customers (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  stripe_customer_id text,
  created_at timestamptz default now()
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id),
  email text not null,
  status text default 'pending' check (status in ('pending','paid','fulfilled','refunded','cancelled')),
  subtotal_cents int not null,
  shipping_cents int default 0,
  tax_cents int default 0,
  total_cents int not null,
  stripe_session_id text unique,
  shipping_address jsonb,
  created_at timestamptz default now()
);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  variant_id uuid references product_variants(id),
  lot_number text,
  quantity int not null,
  unit_price_cents int not null
);

create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body_md text,
  cover_image_url text,
  published_at timestamptz,
  created_at timestamptz default now()
);

alter table collections enable row level security;
alter table products enable row level security;
alter table product_variants enable row level security;
alter table collection_products enable row level security;
alter table product_images enable row level security;
alter table product_sections enable row level security;
alter table claims enable row level security;
alter table batches enable row level security;
alter table bundle_items enable row level security;
alter table reviews enable row level security;
alter table subscribers enable row level security;
alter table quiz_responses enable row level security;
alter table customers enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table blog_posts enable row level security;

create policy "public read collections" on collections for select using (is_published);
create policy "public read products" on products for select using (is_published);
create policy "public read variants" on product_variants for select using (true);
create policy "public read collection_products" on collection_products for select using (true);
create policy "public read images" on product_images for select using (true);
create policy "public read sections" on product_sections for select using (true);
create policy "public read approved claims" on claims for select using (approved_at is not null);
create policy "public read batches" on batches for select using (true);
create policy "public read bundle_items" on bundle_items for select using (true);
create policy "public read approved reviews" on reviews for select using (is_approved);
create policy "public read published posts" on blog_posts for select using (published_at is not null);
create policy "anyone can subscribe" on subscribers for insert with check (true);
create policy "anyone can submit quiz" on quiz_responses for insert with check (true);
create policy "customer reads self" on customers for select using (auth.uid() = id);
create policy "customer reads own orders" on orders for select using (auth.uid() = customer_id);
create policy "customer reads own order items" on order_items for select
  using (exists (select 1 from orders o where o.id = order_id and o.customer_id = auth.uid()));

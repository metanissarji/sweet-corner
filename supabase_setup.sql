-- =============================================
-- 1. Products table (stores all catalog data)
-- =============================================
create table if not exists products_catalog (
  id text primary key,           -- e.g. 'flavors', 'deals', 'freezerDeals' etc.
  data jsonb not null default '[]'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable realtime on the table
alter publication supabase_realtime add table products_catalog;

-- Allow all reads (public can see products)
create policy "Public read products" on products_catalog
  for select using (true);

-- Allow authenticated users (admins) to insert/update
create policy "Auth update products" on products_catalog
  for all using (auth.role() = 'authenticated');

-- Enable row level security
alter table products_catalog enable row level security;

-- =============================================
-- 2. Orders table (if not already created)
-- =============================================
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  order_number integer not null,
  status text not null default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  items jsonb not null default '[]'::jsonb,
  customer jsonb not null default '{}'::jsonb,
  payment text not null,
  total integer not null
);

alter publication supabase_realtime add table orders;

-- Allow authenticated users to manage orders
create policy "Auth manage orders" on orders
  for all using (auth.role() = 'authenticated');

-- Allow anonymous inserts (customers placing orders)
create policy "Anon insert orders" on orders
  for insert with check (true);

alter table orders enable row level security;

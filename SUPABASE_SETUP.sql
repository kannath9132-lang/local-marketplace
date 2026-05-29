-- LocalMart Database Setup Script
-- Run this in your Supabase SQL Editor to set up the database

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  brand TEXT,
  image TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Stores Table
CREATE TABLE IF NOT EXISTS stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  phone TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  description TEXT,
  logo TEXT,
  rating DECIMAL(3, 2) DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Store Products Table
CREATE TABLE IF NOT EXISTS store_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0,
  quantity INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(store_id, product_id)
);

-- 4. Create Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('customer', 'store_owner', 'admin')) DEFAULT 'customer',
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create Favorites Table
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- 7. Create Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  store_id UUID REFERENCES stores(id) ON DELETE SET NULL,
  total DECIMAL(10, 2) NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'delivered', 'cancelled')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Create Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security Policies

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Public Read Access Policies
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Stores are viewable by everyone" ON stores FOR SELECT USING (true);
CREATE POLICY "Store products are viewable by everyone" ON store_products FOR SELECT USING (true);
CREATE POLICY "Users are viewable by everyone" ON users FOR SELECT USING (true);
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Favorites are viewable by everyone" ON favorites FOR SELECT USING (true);
CREATE POLICY "Orders are viewable by everyone" ON orders FOR SELECT USING (true);
CREATE POLICY "Order items are viewable by everyone" ON order_items FOR SELECT USING (true);

-- Authenticated Insert/Update Policies
CREATE POLICY "Authenticated users can insert products" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update products" ON products FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert stores" ON stores FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update stores" ON stores FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert store_products" ON store_products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update store_products" ON store_products FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert reviews" ON reviews FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update reviews" ON reviews FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage their favorites" ON favorites FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert orders" ON orders FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update orders" ON orders FOR UPDATE USING (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_stores_city ON stores(city);
CREATE INDEX idx_store_products_store_id ON store_products(store_id);
CREATE INDEX idx_store_products_product_id ON store_products(product_id);
CREATE INDEX idx_reviews_store_id ON reviews(store_id);
CREATE INDEX idx_favorites_user_id ON favorites(user_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_store_id ON orders(store_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);

-- Insert sample data

-- Sample Products
INSERT INTO products (name, category, brand, image, description) VALUES
('Basmati Rice Premium', 'Groceries', 'India Gate', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', 'Premium quality basmati rice'),
('Fresh Milk', 'Dairy', 'Amul', 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400', 'Fresh toned milk'),
('Whole Wheat Bread', 'Bakery', 'Britannia', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', 'Healthy whole wheat bread'),
('Sugar', 'Groceries', 'Dhampure', 'https://images.unsplash.com/photo-1588842075708-3756f7672e67?w=400', 'Pure cane sugar'),
('Salt', 'Groceries', 'Tata', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400', 'Iodized salt'),
('Refined Oil', 'Groceries', 'Fortune', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', 'Pure refined sunflower oil'),
('Atta', 'Groceries', 'Aashirvaad', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', 'Whole wheat atta');

-- Sample Stores
INSERT INTO stores (name, address, city, state, phone, latitude, longitude, description, rating, is_verified) VALUES
('Fresh Mart', 'Main Market, Sector 12', 'Delhi', 'Delhi', '+91 9876543210', 28.6139, 77.209, 'Fresh produce and groceries', 4.5, true),
('Sharma Grocery', 'Shop 15, Sector 15', 'Delhi', 'Delhi', '+91 9876543211', 28.6239, 77.219, 'Daily essentials', 4.2, true),
('Daily Needs', 'City Center Mall', 'Delhi', 'Delhi', '+91 9876543212', 28.6339, 77.229, 'All your daily needs', 4.3, false),
('Organic Store', 'Green Avenue', 'Delhi', 'Delhi', '+91 9876543213', 28.6439, 77.239, '100% organic products', 4.7, true);

-- Sample Store Products
INSERT INTO store_products (store_id, product_id, price, stock, quantity)
SELECT
  s.id,
  p.id,
  CASE
    WHEN p.name = 'Basmati Rice Premium' THEN 199
    WHEN p.name = 'Fresh Milk' THEN 28
    WHEN p.name = 'Whole Wheat Bread' THEN 35
    WHEN p.name = 'Sugar' THEN 45
    WHEN p.name = 'Salt' THEN 20
    WHEN p.name = 'Refined Oil' THEN 150
    WHEN p.name = 'Atta' THEN 280
    ELSE 100
  END,
  floor(random() * 100 + 1)::int,
  floor(random() * 50 + 1)::int
FROM stores s, products p;

-- Enable Realtime
-- Go to Supabase Dashboard > Database > Replication to enable realtime for these tables
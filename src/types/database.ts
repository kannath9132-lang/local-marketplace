export type UserRole = 'customer' | 'store_owner' | 'admin'

export interface Product {
  id: string
  name: string
  category: string
  brand: string
  image: string
  description: string
  created_at: string
}

export interface Store {
  id: string
  name: string
  address: string
  city: string
  state: string
  phone: string
  latitude: number
  longitude: number
  description: string
  logo: string
  rating: number
  created_at: string
  is_verified?: boolean
}

export interface StoreProduct {
  id: string
  store_id: string
  product_id: string
  price: number
  stock: number
  quantity: number
  updated_at: string
  created_at: string
  product?: Product
  store?: Store
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  phone: string
  created_at: string
  avatar_url?: string
}

export interface Review {
  id: string
  user_id: string
  store_id: string
  rating: number
  comment: string
  created_at: string
  user?: User
}

export interface Favorite {
  id: string
  user_id: string
  product_id: string
  created_at: string
  product?: Product & {
    cheapest_price?: number
    cheapest_store?: Store
  }
}

export interface Order {
  id: string
  user_id: string
  store_id: string
  total: number
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled'
  created_at: string
  user?: User
  store?: Store
  items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  created_at: string
  product?: Product
}

export interface ProductWithPrice extends Product {
  cheapest_price?: number
  cheapest_store?: Store
  all_stores?: (StoreProduct & { store: Store })[]
}
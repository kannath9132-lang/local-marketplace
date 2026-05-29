import { createClient } from '@/lib/supabase-server'
import { User, Favorite, Order } from '@/types/database'

export async function getCurrentUser() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) return null

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  return profile
}

export async function updateUserProfile(userId: string, data: Partial<User>) {
  const supabase = await createClient()

  const { data: profile, error } = await supabase
    .from('users')
    .update(data)
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return profile
}

export async function getFavorites(userId: string) {
  const supabase = await createClient()

  const { data: favorites, error } = await supabase
    .from('favorites')
    .select(`
      *,
      product:products (
        *,
        store_products (
          id,
          price,
          stock,
          store:stores (
            id,
            name,
            logo
          )
        )
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error

  return (favorites || []).map((f: any) => ({
    ...f,
    product: {
      ...f.product,
      cheapest_price: f.product.store_products?.sort((a: any, b: any) => a.price - b.price)[0]?.price,
      cheapest_store: f.product.store_products?.sort((a: any, b: any) => a.price - b.price)[0]?.store
    }
  }))
}

export async function addFavorite(userId: string, productId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('favorites')
    .insert({ user_id: userId, product_id: productId })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function removeFavorite(userId: string, productId: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId)

  if (error) throw error
}

export async function isFavorite(userId: string, productId: string) {
  const supabase = await createClient()

  const { data } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .single()

  return !!data
}

export async function getOrders(userId: string) {
  const supabase = await createClient()

  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      store:stores (
        id,
        name,
        logo,
        address
      ),
      items:order_items (
        *,
        product:products (*)
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return orders || []
}

export async function getAllUsers() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}
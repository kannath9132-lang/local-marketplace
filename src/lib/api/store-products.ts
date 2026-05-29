import { createClient } from '@/lib/supabase-server'

export async function addStoreProduct(data: {
  store_id: string
  product_id: string
  price: number
  stock: number
  quantity: number
}) {
  const supabase = await createClient()

  const { data: storeProduct, error } = await supabase
    .from('store_products')
    .insert(data)
    .select()
    .single()

  if (error) throw error
  return storeProduct
}

export async function updateStoreProduct(
  id: string,
  data: { price?: number; stock?: number; quantity?: number }
) {
  const supabase = await createClient()

  const { data: storeProduct, error } = await supabase
    .from('store_products')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return storeProduct
}

export async function deleteStoreProduct(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('store_products')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function getStoreProductById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('store_products')
    .select(`
      *,
      product:products (*),
      store:stores (*)
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function getStoreInventory(storeId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('store_products')
    .select(`
      *,
      product:products (*)
    `)
    .eq('store_id', storeId)
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function updateProductPrice(productId: string, storeId: string, price: number) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('store_products')
    .update({ price, updated_at: new Date().toISOString() })
    .eq('product_id', productId)
    .eq('store_id', storeId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateProductStock(productId: string, storeId: string, stock: number) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('store_products')
    .update({ stock, updated_at: new Date().toISOString() })
    .eq('product_id', productId)
    .eq('store_id', storeId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Admin: Get all store products
export async function getAllStoreProducts() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('store_products')
    .select(`
      *,
      product:products (*),
      store:stores (name)
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

// Admin: Moderate product
export async function deleteProduct(productId: string) {
  const supabase = await createClient()

  // Delete all store products first
  await supabase
    .from('store_products')
    .delete()
    .eq('product_id', productId)

  // Delete favorites
  await supabase
    .from('favorites')
    .delete()
    .eq('product_id', productId)

  // Delete the product
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)

  if (error) throw error
}
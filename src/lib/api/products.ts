import { createClient } from '@/lib/supabase-server'
import { Product, StoreProduct, ProductWithPrice, Store } from '@/types/database'

export async function searchProducts(query: string, filters?: {
  category?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
}) {
  const supabase = await createClient()

  let productsQuery = supabase
    .from('products')
    .select(`
      *,
      store_products (
        id,
        price,
        stock,
        store:stores (
          id,
          name,
          address,
          city,
          rating,
          logo
        )
      )
    `)
    .ilike('name', `%${query}%`)

  if (filters?.category) {
    productsQuery = productsQuery.eq('category', filters.category)
  }

  const { data: products, error } = await productsQuery

  if (error) throw error

  // Transform and find cheapest prices
  const transformedProducts: ProductWithPrice[] = (products || []).map((p: any) => {
    const storeProducts = p.store_products || []
    const validStores = storeProducts.filter((sp: any) => sp.stock > 0)
    const cheapest = validStores.sort((a: any, b: any) => a.price - b.price)[0]

    return {
      ...p,
      cheapest_price: cheapest?.price,
      cheapest_store: cheapest?.store,
      all_stores: validStores.map((sp: any) => ({
        ...sp,
        store: sp.store
      }))
    }
  })

  // Filter by price range
  let filtered = transformedProducts
  if (filters?.minPrice !== undefined) {
    filtered = filtered.filter(p => (p.cheapest_price || 0) >= filters.minPrice!)
  }
  if (filters?.maxPrice !== undefined) {
    filtered = filtered.filter(p => (p.cheapest_price || 0) <= filters.maxPrice!)
  }
  if (filters?.inStock) {
    filtered = filtered.filter(p => p.all_stores && p.all_stores.length > 0)
  }

  return filtered
}

export async function getProductById(id: string) {
  const supabase = await createClient()

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error

  // Get all store products for this product
  const { data: storeProducts } = await supabase
    .from('store_products')
    .select(`
      *,
      store:stores (*)
    `)
    .eq('product_id', id)

  return {
    ...product,
    all_stores: storeProducts?.map(sp => ({
      ...sp,
      store: sp.store
    })) || []
  }
}

export async function getFeaturedProducts(limit = 10) {
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      store_products (
        id,
        price,
        stock,
        store:stores (
          id,
          name,
          rating,
          logo
        )
      )
    `)
    .limit(limit)

  if (error) throw error

  return (products || []).map((p: any) => {
    const storeProducts = p.store_products || []
    const validStores = storeProducts.filter((sp: any) => sp.stock > 0)
    const cheapest = validStores.sort((a: any, b: any) => a.price - b.price)[0]

    return {
      ...p,
      cheapest_price: cheapest?.price,
      cheapest_store: cheapest?.store
    }
  })
}

export async function getTrendingDeals(limit = 10) {
  const supabase = await createClient()

  // Get products with multiple stores (competition = deals)
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      store_products (
        id,
        price,
        stock,
        store:stores (
          id,
          name,
          rating,
          logo
        )
      )
    `)
    .limit(limit * 2)

  if (error) throw error

  const productsWithMultipleStores = (products || []).filter(
    (p: any) => p.store_products && p.store_products.length > 1
  )

  return productsWithMultipleStores.slice(0, limit).map((p: any) => {
    const storeProducts = p.store_products || []
    const validStores = storeProducts.filter((sp: any) => sp.stock > 0)
    const cheapest = validStores.sort((a: any, b: any) => a.price - b.price)[0]

    return {
      ...p,
      cheapest_price: cheapest?.price,
      cheapest_store: cheapest?.store,
      all_stores: validStores
    }
  })
}

export async function getCategories() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select('category')

  if (error) throw error

  const categories = [...new Set((data || []).map(p => p.category))]
  return categories
}
import { createClient } from '@/lib/supabase-server'
import { Store, Review } from '@/types/database'

export async function getNearbyStores(lat: number, lng: number, radiusKm = 10) {
  const supabase = await createClient()

  // Get all stores and calculate distance client-side
  const { data: stores, error } = await supabase
    .from('stores')
    .select('*')
    .order('rating', { ascending: false })

  if (error) throw error

  // Calculate distance and filter
  const storesWithDistance = (stores || []).map(store => {
    const distance = calculateDistance(lat, lng, store.latitude, store.longitude)
    return { ...store, distance }
  }).filter(store => store.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance)

  return storesWithDistance
}

export async function getStoreById(id: string) {
  const supabase = await createClient()

  const { data: store, error } = await supabase
    .from('stores')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error

  // Get store reviews
  const { data: reviews } = await supabase
    .from('reviews')
    .select(`
      *,
      user:users (
        id,
        name,
        avatar_url
      )
    `)
    .eq('store_id', id)
    .order('created_at', { ascending: false })
    .limit(10)

  // Get store products count
  const { count } = await supabase
    .from('store_products')
    .select('*', { count: 'exact', head: true })
    .eq('store_id', id)

  return {
    ...store,
    reviews: reviews || [],
    products_count: count || 0
  }
}

export async function getStoreProducts(storeId: string) {
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from('store_products')
    .select(`
      *,
      product:products (*)
    `)
    .eq('store_id', storeId)
    .order('price', { ascending: true })

  if (error) throw error

  return products || []
}

export async function getTopStores(limit = 10) {
  const supabase = await createClient()

  const { data: stores, error } = await supabase
    .from('stores')
    .select('*')
    .order('rating', { ascending: false })
    .limit(limit)

  if (error) throw error

  // Get products count for each store
  const storesWithCount = await Promise.all((stores || []).map(async store => {
    const { count } = await supabase
      .from('store_products')
      .select('*', { count: 'exact', head: true })
      .eq('store_id', store.id)

    return { ...store, products_count: count || 0 }
  }))

  return storesWithCount
}

export async function createStore(storeData: Partial<Store>) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('stores')
    .insert(storeData)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateStore(id: string, storeData: Partial<Store>) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('stores')
    .update(storeData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function verifyStore(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('stores')
    .update({ is_verified: true })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

// Haversine formula to calculate distance
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371 // Earth's radius in km
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(deg: number) {
  return deg * (Math.PI / 180)
}

// Extend Array for asyncMap
declare global {
  interface Array<T> {
    asyncMap<U>(fn: (item: T, index: number) => Promise<U>): Promise<U[]>
  }
}
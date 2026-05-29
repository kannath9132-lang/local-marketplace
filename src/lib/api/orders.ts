import { createClient } from '@/lib/supabase-server'
import { Order, OrderItem } from '@/types/database'

export async function createOrder(orderData: {
  user_id: string
  store_id: string
  total: number
  items: { product_id: string; quantity: number; price: number }[]
}) {
  const supabase = await createClient()

  // Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: orderData.user_id,
      store_id: orderData.store_id,
      total: orderData.total,
      status: 'pending'
    })
    .select()
    .single()

  if (orderError) throw orderError

  // Create order items
  const orderItems = orderData.items.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)

  if (itemsError) throw itemsError

  // Update stock in store_products
  for (const item of orderData.items) {
    const { data: storeProduct } = await supabase
      .from('store_products')
      .select('stock')
      .eq('store_id', orderData.store_id)
      .eq('product_id', item.product_id)
      .single()

    if (storeProduct) {
      await supabase
        .from('store_products')
        .update({ stock: storeProduct.stock - item.quantity })
        .eq('store_id', orderData.store_id)
        .eq('product_id', item.product_id)
    }
  }

  return order
}

export async function getOrderById(orderId: string) {
  const supabase = await createClient()

  const { data: order, error } = await supabase
    .from('orders')
    .select(`
      *,
      store:stores (*),
      items:order_items (
        *,
        product:products (*)
      )
    `)
    .eq('id', orderId)
    .single()

  if (error) throw error
  return order
}

export async function updateOrderStatus(orderId: string, status: Order['status']) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getStoreOrders(storeId: string) {
  const supabase = await createClient()

  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      user:users (
        id,
        name,
        email,
        phone
      ),
      items:order_items (
        *,
        product:products (*)
      )
    `)
    .eq('store_id', storeId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return orders || []
}

export async function getAllOrders() {
  const supabase = await createClient()

  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      user:users (
        id,
        name,
        email
      ),
      store:stores (
        id,
        name
      )
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return orders || []
}

// Admin analytics
export async function getAnalytics() {
  const supabase = await createClient()

  // Total users
  const { count: totalUsers } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })

  // Total stores
  const { count: totalStores } = await supabase
    .from('stores')
    .select('*', { count: 'exact', head: true })

  // Total orders
  const { count: totalOrders } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })

  // Total revenue
  const { data: revenueData } = await supabase
    .from('orders')
    .select('total')
    .eq('status', 'delivered')

  const totalRevenue = revenueData?.reduce((sum, o) => sum + o.total, 0) || 0

  // Recent orders
  const { data: recentOrders } = await supabase
    .from('orders')
    .select(`
      *,
      user:users (name),
      store:stores (name)
    `)
    .order('created_at', { ascending: false })
    .limit(10)

  return {
    totalUsers: totalUsers || 0,
    totalStores: totalStores || 0,
    totalOrders: totalOrders || 0,
    totalRevenue,
    recentOrders: recentOrders || []
  }
}
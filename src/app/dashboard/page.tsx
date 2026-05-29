'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { User, Heart, ShoppingBag, MapPin, Settings, LogOut, Package, Store, BarChart3, Plus, Edit, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Suspense } from 'react'

// Mock data
const mockOrders = [
  { id: 'ORD-001', store: 'Fresh Mart', total: 450, status: 'delivered', date: '2024-01-15', items: 3 },
  { id: 'ORD-002', store: 'Sharma Grocery', total: 280, status: 'confirmed', date: '2024-01-18', items: 2 },
  { id: 'ORD-003', store: 'Daily Needs', total: 150, status: 'pending', date: '2024-01-20', items: 1 },
]

const mockFavorites = [
  {
    id: '1',
    name: 'Basmati Rice Premium',
    category: 'Groceries',
    brand: 'India Gate',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    description: 'Premium quality basmati rice',
    created_at: new Date().toISOString(),
    cheapest_price: 199,
    cheapest_store: { id: '1', name: 'Fresh Mart', logo: '', rating: 4.5 },
    all_stores: []
  },
  {
    id: '2',
    name: 'Fresh Milk',
    category: 'Dairy',
    brand: 'Amul',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
    description: 'Fresh toned milk',
    created_at: new Date().toISOString(),
    cheapest_price: 28,
    cheapest_store: { id: '1', name: 'Fresh Mart', logo: '', rating: 4.5 },
    all_stores: []
  },
]

const mockInventory = [
  { id: '1', name: 'Basmati Rice Premium', price: 199, stock: 50, category: 'Groceries' },
  { id: '2', name: 'Fresh Milk', price: 28, stock: 100, category: 'Dairy' },
  { id: '3', name: 'Whole Wheat Bread', price: 38, stock: 20, category: 'Bakery' },
  { id: '4', name: 'Sugar', price: 45, stock: 80, category: 'Groceries' },
]

function DashboardContent() {
  const searchParams = useSearchParams()
  const role = searchParams.get('role') || 'customer'

  const [activeTab, setActiveTab] = useState('overview')

  const tabs = {
    customer: [
      { id: 'overview', label: 'Overview', icon: User },
      { id: 'orders', label: 'My Orders', icon: ShoppingBag },
      { id: 'favorites', label: 'Favorites', icon: Heart },
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
    store_owner: [
      { id: 'overview', label: 'Dashboard', icon: BarChart3 },
      { id: 'inventory', label: 'Inventory', icon: Package },
      { id: 'orders', label: 'Orders', icon: ShoppingBag },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
  }

  const currentTabs = tabs[role as keyof typeof tabs] || tabs.customer

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-surface-secondary pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className="hidden md:block w-64 shrink-0">
              <div className="bg-white rounded-2xl shadow-card p-6 sticky top-24">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-gray-500 capitalize">{role.replace('_', ' ')}</p>
                  </div>
                </div>

                <nav className="space-y-1">
                  {currentTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary/10 text-primary'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  ))}

                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </nav>
              </div>
            </aside>

            {/* Content */}
            <div className="flex-1">
              {/* Customer Dashboard */}
              {role === 'customer' && (
                <>
                  {activeTab === 'overview' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      {/* Stats */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white rounded-2xl shadow-card p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-gray-500">Total Orders</p>
                              <p className="text-3xl font-bold">12</p>
                            </div>
                            <ShoppingBag className="w-10 h-10 text-primary/20" />
                          </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-card p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-gray-500">Favorites</p>
                              <p className="text-3xl font-bold">8</p>
                            </div>
                            <Heart className="w-10 h-10 text-red-400/20" />
                          </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-card p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-gray-500">Saved Stores</p>
                              <p className="text-3xl font-bold">5</p>
                            </div>
                            <Store className="w-10 h-10 text-primary/20" />
                          </div>
                        </div>
                      </div>

                      {/* Recent Orders */}
                      <div className="bg-white rounded-2xl shadow-card p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-lg font-semibold">Recent Orders</h2>
                          <button
                            onClick={() => setActiveTab('orders')}
                            className="text-sm text-primary hover:underline"
                          >
                            View All
                          </button>
                        </div>
                        <div className="space-y-4">
                          {mockOrders.map((order) => (
                            <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium">{order.id}</p>
                                <p className="text-sm text-gray-500">{order.store} • {order.items} items</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">₹{order.total}</p>
                                <p className={`text-sm ${
                                  order.status === 'delivered' ? 'text-green-600' :
                                  order.status === 'confirmed' ? 'text-blue-600' :
                                  'text-yellow-600'
                                }`}>
                                  {order.status}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'orders' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
                      <div className="space-y-4">
                        {mockOrders.map((order) => (
                          <div key={order.id} className="bg-white rounded-2xl shadow-card p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <p className="font-semibold text-lg">{order.id}</p>
                                <p className="text-gray-500">{order.date}</p>
                              </div>
                              <span className={`badge ${
                                order.status === 'delivered' ? 'badge-success' :
                                order.status === 'confirmed' ? 'badge-info' :
                                'badge-warning'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-gray-600">{order.store}</p>
                                <p className="text-sm text-gray-500">{order.items} items</p>
                              </div>
                              <p className="text-xl font-bold">₹{order.total}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'favorites' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <h2 className="text-2xl font-bold mb-6">Favorite Products</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockFavorites.map((product, index) => (
                          <ProductCard 
                            key={product.id}
                            product={product as any}
                            index={index}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </>
              )}

              {/* Store Owner Dashboard */}
              {role === 'store_owner' && (
                <>
                  {activeTab === 'overview' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div className="bg-white rounded-2xl shadow-card p-6">
                          <p className="text-gray-500">Total Products</p>
                          <p className="text-3xl font-bold">150</p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-card p-6">
                          <p className="text-gray-500">Total Orders</p>
                          <p className="text-3xl font-bold">45</p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-card p-6">
                          <p className="text-gray-500">Revenue</p>
                          <p className="text-3xl font-bold">₹12,500</p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-card p-6">
                          <p className="text-gray-500">Rating</p>
                          <p className="text-3xl font-bold">4.5</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'inventory' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Inventory</h2>
                        <button className="btn btn-primary">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Product
                        </button>
                      </div>
                      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Product</th>
                              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Category</th>
                              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Price</th>
                              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Stock</th>
                              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {mockInventory.map((item) => (
                              <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium">{item.name}</td>
                                <td className="px-6 py-4 text-gray-500">{item.category}</td>
                                <td className="px-6 py-4">₹{item.price}</td>
                                <td className="px-6 py-4">
                                  <span className={`badge ${item.stock > 20 ? 'badge-success' : item.stock > 0 ? 'badge-warning' : 'badge-error'}`}>
                                    {item.stock} in stock
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex gap-2">
                                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                                      <Edit className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 hover:bg-red-50 text-red-500 rounded-lg">
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  )
}
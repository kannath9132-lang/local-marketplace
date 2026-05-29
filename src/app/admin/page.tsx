'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Users, Store, Package, DollarSign, TrendingUp, CheckCircle, XCircle, MoreVertical, BarChart3, ShoppingBag, User } from 'lucide-react'
import { motion } from 'framer-motion'

// Mock data
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'customer', created_at: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'store_owner', created_at: '2024-01-10' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'customer', created_at: '2024-01-05' },
  { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', role: 'admin', created_at: '2024-01-01' },
]

const mockStores = [
  { id: '1', name: 'Fresh Mart', owner: 'Jane Smith', status: 'verified', rating: 4.5, products: 150 },
  { id: '2', name: 'Sharma Grocery', owner: 'Rajesh Sharma', status: 'pending', rating: 4.2, products: 200 },
  { id: '3', name: 'Daily Needs', owner: 'Priya Singh', status: 'verified', rating: 4.3, products: 180 },
]

const mockRecentOrders = [
  { id: 'ORD-001', user: 'John Doe', store: 'Fresh Mart', total: 450, status: 'delivered', date: '2024-01-20' },
  { id: 'ORD-002', user: 'Sarah W', store: 'Sharma Grocery', total: 280, status: 'confirmed', date: '2024-01-20' },
  { id: 'ORD-003', user: 'Mike J', store: 'Daily Needs', total: 150, status: 'pending', date: '2024-01-19' },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { label: 'Total Users', value: '1,234', icon: Users, change: '+12%', color: 'text-blue-500' },
    { label: 'Total Stores', value: '567', icon: Store, change: '+8%', color: 'text-green-500' },
    { label: 'Total Products', value: '8,901', icon: Package, change: '+15%', color: 'text-purple-500' },
    { label: 'Total Revenue', value: '₹2.5L', icon: DollarSign, change: '+23%', color: 'text-primary' },
  ]

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-surface-secondary pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-500">Manage your marketplace</p>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className="hidden md:block w-64 shrink-0">
              <div className="bg-white rounded-2xl shadow-card p-6 sticky top-24">
                <nav className="space-y-1">
                  {[
                    { id: 'overview', label: 'Overview', icon: BarChart3 },
                    { id: 'users', label: 'Users', icon: Users },
                    { id: 'stores', label: 'Stores', icon: Store },
                    { id: 'products', label: 'Products', icon: Package },
                    { id: 'orders', label: 'Orders', icon: ShoppingBag },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-primary/10 text-primary'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <div className="flex-1 space-y-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  {/* Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                      <div key={stat.label} className="bg-white rounded-2xl shadow-card p-6">
                        <div className="flex items-center justify-between mb-2">
                          <stat.icon className={`w-8 h-8 ${stat.color}`} />
                          <span className="text-sm text-green-600 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {stat.change}
                          </span>
                        </div>
                        <p className="text-3xl font-bold">{stat.value}</p>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recent Orders */}
                  <div className="bg-white rounded-2xl shadow-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold">Recent Orders</h2>
                      <button onClick={() => setActiveTab('orders')} className="text-sm text-primary hover:underline">
                        View All
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Order ID</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Customer</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Store</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {mockRecentOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 font-medium">{order.id}</td>
                              <td className="px-4 py-3">{order.user}</td>
                              <td className="px-4 py-3">{order.store}</td>
                              <td className="px-4 py-3">₹{order.total}</td>
                              <td className="px-4 py-3">
                                <span className={`badge ${
                                  order.status === 'delivered' ? 'badge-success' :
                                  order.status === 'confirmed' ? 'badge-info' :
                                  'badge-warning'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Users Tab */}
              {activeTab === 'users' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="text-2xl font-bold mb-6">Users Management</h2>
                  <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">User</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Email</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Role</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Joined</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {mockUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                  <User className="w-5 h-5 text-primary" />
                                </div>
                                <span className="font-medium">{user.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-500">{user.email}</td>
                            <td className="px-6 py-4">
                              <span className={`badge ${
                                user.role === 'admin' ? 'badge-error' :
                                user.role === 'store_owner' ? 'badge-info' :
                                'badge-success'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-500">{user.created_at}</td>
                            <td className="px-6 py-4">
                              <button className="p-2 hover:bg-gray-100 rounded-lg">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* Stores Tab */}
              {activeTab === 'stores' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="text-2xl font-bold mb-6">Store Management</h2>
                  <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Store</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Owner</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Products</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Rating</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {mockStores.map((store) => (
                          <tr key={store.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium">{store.name}</td>
                            <td className="px-6 py-4 text-gray-500">{store.owner}</td>
                            <td className="px-6 py-4">{store.products}</td>
                            <td className="px-6 py-4">{store.rating}</td>
                            <td className="px-6 py-4">
                              <span className={`badge ${store.status === 'verified' ? 'badge-success' : 'badge-warning'}`}>
                                {store.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                {store.status === 'pending' && (
                                  <>
                                    <button className="p-2 hover:bg-green-50 text-green-500 rounded-lg">
                                      <CheckCircle className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 hover:bg-red-50 text-red-500 rounded-lg">
                                      <XCircle className="w-4 h-4" />
                                    </button>
                                  </>
                                )}
                                <button className="p-2 hover:bg-gray-100 rounded-lg">
                                  <MoreVertical className="w-4 h-4" />
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

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="text-2xl font-bold mb-6">All Orders</h2>
                  <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Order ID</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Customer</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Store</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Amount</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {mockRecentOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium">{order.id}</td>
                            <td className="px-6 py-4">{order.user}</td>
                            <td className="px-6 py-4">{order.store}</td>
                            <td className="px-6 py-4">₹{order.total}</td>
                            <td className="px-6 py-4">
                              <span className={`badge ${
                                order.status === 'delivered' ? 'badge-success' :
                                order.status === 'confirmed' ? 'badge-info' :
                                'badge-warning'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-500">{order.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
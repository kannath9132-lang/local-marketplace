'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StoreCard from '@/components/StoreCard'
import { StoreGridSkeleton } from '@/components/LoadingSkeleton'
import { Search, MapPin, Filter } from 'lucide-react'
import { motion } from 'framer-motion'

// Mock store data
const mockStores = [
  {
    id: '1',
    name: 'Fresh Mart',
    address: 'Main Market, Sector 12',
    city: 'Delhi',
    state: 'Delhi',
    phone: '+91 9876543210',
    latitude: 28.6139,
    longitude: 77.209,
    description: 'Fresh produce and groceries at best prices',
    logo: '',
    rating: 4.5,
    created_at: new Date().toISOString(),
    is_verified: true,
    distance: 1.2,
    products_count: 150
  },
  {
    id: '2',
    name: 'Sharma Grocery',
    address: 'Shop 15, Sector 15',
    city: 'Delhi',
    state: 'Delhi',
    phone: '+91 9876543211',
    latitude: 28.6239,
    longitude: 77.219,
    description: 'Daily essentials at wholesale prices',
    logo: '',
    rating: 4.2,
    created_at: new Date().toISOString(),
    is_verified: true,
    distance: 2.5,
    products_count: 200
  },
  {
    id: '3',
    name: 'Daily Needs',
    address: 'City Center Mall',
    city: 'Delhi',
    state: 'Delhi',
    phone: '+91 9876543212',
    latitude: 28.6339,
    longitude: 77.229,
    description: 'All your daily needs under one roof',
    logo: '',
    rating: 4.3,
    created_at: new Date().toISOString(),
    is_verified: false,
    distance: 3.0,
    products_count: 180
  },
  {
    id: '4',
    name: 'Organic Store',
    address: 'Green Avenue',
    city: 'Delhi',
    state: 'Delhi',
    phone: '+91 9876543213',
    latitude: 28.6439,
    longitude: 77.239,
    description: '100% organic products',
    logo: '',
    rating: 4.7,
    created_at: new Date().toISOString(),
    is_verified: true,
    distance: 4.5,
    products_count: 100
  },
  {
    id: '5',
    name: 'Super Mart',
    address: 'Metro Station Road',
    city: 'Delhi',
    state: 'Delhi',
    phone: '+91 9876543214',
    latitude: 28.6539,
    longitude: 77.249,
    description: 'One stop shop for everything',
    logo: '',
    rating: 4.1,
    created_at: new Date().toISOString(),
    is_verified: true,
    distance: 5.2,
    products_count: 250
  },
  {
    id: '6',
    name: 'Kirana Corner',
    address: 'Neighborhood Plaza',
    city: 'Delhi',
    state: 'Delhi',
    phone: '+91 9876543215',
    latitude: 28.6639,
    longitude: 77.259,
    description: 'Your friendly neighborhood store',
    logo: '',
    rating: 4.0,
    created_at: new Date().toISOString(),
    is_verified: false,
    distance: 2.8,
    products_count: 120
  },
]

export default function StoresPage() {
  const [stores, setStores] = useState<typeof mockStores>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('distance')
  const [showVerified, setShowVerified] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      let filtered = [...mockStores]

      if (searchQuery) {
        filtered = filtered.filter(s =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.address.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }

      if (showVerified) {
        filtered = filtered.filter(s => s.is_verified)
      }

      switch (sortBy) {
        case 'distance':
          filtered.sort((a, b) => a.distance - b.distance)
          break
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating)
          break
        case 'products':
          filtered.sort((a, b) => b.products_count - a.products_count)
          break
      }

      setStores(filtered)
      setIsLoading(false)
    }, 500)
  }, [searchQuery, sortBy, showVerified])

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-surface-secondary pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nearby Stores
            </h1>
            <p className="text-gray-600">
              Discover local stores in your area and compare prices
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stores..."
                className="input pl-12"
              />
            </div>

            <div className="flex gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input w-auto"
              >
                <option value="distance">Sort by Distance</option>
                <option value="rating">Sort by Rating</option>
                <option value="products">Sort by Products</option>
              </select>

              <button
                onClick={() => setShowVerified(!showVerified)}
                className={`btn ${showVerified ? 'btn-primary' : 'btn-secondary'}`}
              >
                <Filter className="w-4 h-4 mr-2" />
                Verified Only
              </button>
            </div>
          </div>

          {/* Stores Grid */}
          {isLoading ? (
            <StoreGridSkeleton count={6} />
          ) : stores.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500 mb-4">No stores found</p>
              <p className="text-gray-400">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stores.map((store, index) => (
                <StoreCard key={store.id} store={store} index={index} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { Heart, Search } from 'lucide-react'

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
    all_stores: [{ id: '1', price: 199, stock: 50, store: { id: '1', name: 'Fresh Mart', logo: '', rating: 4.5, address: 'Main Market' } }]
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
    all_stores: [{ id: '1', price: 28, stock: 100, store: { id: '1', name: 'Fresh Mart', logo: '', rating: 4.5, address: 'Main Market' } }]
  },
  {
    id: '3',
    name: 'Whole Wheat Bread',
    category: 'Bakery',
    brand: 'Britannia',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    description: 'Healthy whole wheat bread',
    created_at: new Date().toISOString(),
    cheapest_price: 35,
    cheapest_store: { id: '3', name: 'Daily Needs', logo: '', rating: 4.3 },
    all_stores: [{ id: '3', price: 35, stock: 15, store: { id: '3', name: 'Daily Needs', logo: '', rating: 4.3, address: 'City Center' } }]
  },
]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<typeof mockFavorites>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setFavorites(mockFavorites)
      setIsLoading(false)
    }, 500)
  }, [])

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-surface-secondary pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Favorites</h1>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : favorites.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-card">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No favorites yet</h2>
              <p className="text-gray-500 mb-6">Start adding products to your favorites to see them here.</p>
              <Link href="/search" className="btn btn-primary">
                <Search className="w-4 h-4 mr-2" />
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favorites.map((product, index) => (
                <ProductCard 
                  key={product.id}
                  product={product as any}
                  index={index} 
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
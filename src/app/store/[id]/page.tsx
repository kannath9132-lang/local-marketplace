'use client'

import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { MapPin, Phone, Mail, Star, CheckCircle, Clock, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

// Mock store data
const mockStore = {
  id: '1',
  name: 'Fresh Mart',
  address: 'Main Market, Sector 12',
  city: 'Delhi',
  state: 'Delhi',
  phone: '+91 9876543210',
  email: 'freshmart@example.com',
  latitude: 28.6139,
  longitude: 77.209,
  description: 'Fresh Mart is your one-stop destination for fresh produce, groceries, and daily essentials. We pride ourselves on quality products at competitive prices.',
  logo: '',
  rating: 4.5,
  is_verified: true,
  created_at: new Date().toISOString(),
  reviews: [
    { id: '1', user: { name: 'John Doe', avatar_url: '' }, rating: 5, comment: 'Great quality products and friendly staff!', created_at: '2024-01-15' },
    { id: '2', user: { name: 'Sarah Smith', avatar_url: '' }, rating: 4, comment: 'Good store with reasonable prices.', created_at: '2024-01-10' },
    { id: '3', user: { name: 'Mike Johnson', avatar_url: '' }, rating: 5, comment: 'Always fresh vegetables. Highly recommended!', created_at: '2024-01-05' },
  ]
}

const storeProducts = [
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
    cheapest_price: 38,
    cheapest_store: { id: '1', name: 'Fresh Mart', logo: '', rating: 4.5 },
    all_stores: [{ id: '1', price: 38, stock: 20, store: { id: '1', name: 'Fresh Mart', logo: '', rating: 4.5, address: 'Main Market' } }]
  },
  {
    id: '4',
    name: 'Sugar',
    category: 'Groceries',
    brand: 'Dhampure',
    image: 'https://images.unsplash.com/photo-1588842075708-3756f7672e67?w=400',
    description: 'Pure cane sugar',
    created_at: new Date().toISOString(),
    cheapest_price: 42,
    cheapest_store: { id: '1', name: 'Fresh Mart', logo: '', rating: 4.5 },
    all_stores: [{ id: '1', price: 42, stock: 80, store: { id: '1', name: 'Fresh Mart', logo: '', rating: 4.5, address: 'Main Market' } }]
  },
]

export default function StoreDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [currentReviewPage, setCurrentReviewPage] = useState(0)

  const reviewsPerPage = 2
  const totalReviewPages = Math.ceil(mockStore.reviews.length / reviewsPerPage)
  const currentReviews = mockStore.reviews.slice(
    currentReviewPage * reviewsPerPage,
    (currentReviewPage + 1) * reviewsPerPage
  )

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-surface-secondary pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="text-gray-500 hover:text-primary">Home</Link></li>
              <li><span className="text-gray-400">/</span></li>
              <li><Link href="/stores" className="text-gray-500 hover:text-primary">Stores</Link></li>
              <li><span className="text-gray-400">/</span></li>
              <li className="text-gray-900">{mockStore.name}</li>
            </ol>
          </nav>

          {/* Store Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-card overflow-hidden mb-8"
          >
            <div className="h-32 bg-gradient-to-r from-primary to-primary-dark" />
            <div className="px-8 pb-8">
              <div className="flex flex-col md:flex-row gap-6 -mt-16">
                {/* Logo */}
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-white shadow-elevated shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
                    <ShoppingBag className="w-16 h-16 text-primary" />
                  </div>
                </div>

                {/* Store Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{mockStore.name}</h1>
                    {mockStore.is_verified && (
                      <CheckCircle className="w-6 h-6 text-primary" />
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{mockStore.address}, {mockStore.city}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      <span>{mockStore.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{mockStore.rating} ({mockStore.reviews.length} reviews)</span>
                    </div>
                  </div>

                  <p className="text-gray-600">{mockStore.description}</p>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-3 shrink-0">
                  <button className="btn btn-primary">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Shop Here
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Products Grid */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Products at this Store</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {storeProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product as any} index={index} />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Store Info Card */}
              <div className="bg-white rounded-2xl shadow-card p-6">
                <h3 className="font-semibold text-lg mb-4">Store Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-sm text-gray-500">{mockStore.address}</p>
                      <p className="text-sm text-gray-500">{mockStore.city}, {mockStore.state}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-gray-500">{mockStore.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-gray-500">{mockStore.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Hours</p>
                      <p className="text-sm text-gray-500">Mon-Sat: 8AM - 9PM</p>
                      <p className="text-sm text-gray-500">Sun: 9AM - 6PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews Card */}
              <div className="bg-white rounded-2xl shadow-card p-6">
                <h3 className="font-semibold text-lg mb-4">Customer Reviews</h3>
                <div className="space-y-4">
                  {currentReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">
                              {review.user.name.charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium">{review.user.name}</span>
                        </div>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{review.comment}</p>
                      <p className="text-xs text-gray-400 mt-2">{review.created_at}</p>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalReviewPages > 1 && (
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <button
                      onClick={() => setCurrentReviewPage(Math.max(0, currentReviewPage - 1))}
                      disabled={currentReviewPage === 0}
                      className="p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 rounded-lg"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm text-gray-500">
                      Page {currentReviewPage + 1} of {totalReviewPages}
                    </span>
                    <button
                      onClick={() => setCurrentReviewPage(Math.min(totalReviewPages - 1, currentReviewPage + 1))}
                      disabled={currentReviewPage === totalReviewPages - 1}
                      className="p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 rounded-lg"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
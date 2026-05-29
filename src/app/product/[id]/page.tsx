'use client'

import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PriceComparisonTable from '@/components/PriceComparisonTable'
import ProductCard from '@/components/ProductCard'
import { Heart, ShoppingCart, Share2, CheckCircle, Star, Minus, Plus, Truck, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

// Mock product data
const mockProduct = {
  id: '1',
  name: 'Basmati Rice Premium',
  category: 'Groceries',
  brand: 'India Gate',
  image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800',
  description: 'Premium quality basmati rice aged for perfect texture and aroma. Suitable for biryani, pulao, and daily cooking. Long grains that stay separate and fluffy.',
  created_at: new Date().toISOString(),
  all_stores: [
    {
      id: '1',
      price: 199,
      stock: 50,
      store: {
        id: '1',
        name: 'Fresh Mart',
        logo: '',
        rating: 4.5,
        address: 'Main Market, Sector 12'
      }
    },
    {
      id: '2',
      price: 210,
      stock: 30,
      store: {
        id: '2',
        name: 'Sharma Grocery',
        logo: '',
        rating: 4.2,
        address: 'Shop 15, Sector 15'
      }
    },
    {
      id: '3',
      price: 195,
      stock: 8,
      store: {
        id: '4',
        name: 'Organic Store',
        logo: '',
        rating: 4.7,
        address: 'Green Avenue'
      }
    },
  ]
}

const relatedProducts = [
  {
    id: '4',
    name: 'Sugar',
    category: 'Groceries',
    brand: 'Dhampure',
    image: 'https://images.unsplash.com/photo-1588842075708-3756f7672e67?w=400',
    description: 'Pure cane sugar',
    created_at: new Date().toISOString(),
    cheapest_price: 45,
    cheapest_store: { id: '2', name: 'Sharma Grocery', logo: '', rating: 4.2 },
    all_stores: [
      { id: '2', price: 45, stock: 80, store: { id: '2', name: 'Sharma Grocery', logo: '', rating: 4.2, address: 'Sector 15' } },
    ]
  },
  {
    id: '5',
    name: 'Salt',
    category: 'Groceries',
    brand: 'Tata',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400',
    description: 'Iodized salt',
    created_at: new Date().toISOString(),
    cheapest_price: 20,
    cheapest_store: { id: '1', name: 'Fresh Mart', logo: '', rating: 4.5 },
    all_stores: [
      { id: '1', price: 20, stock: 200, store: { id: '1', name: 'Fresh Mart', logo: '', rating: 4.5, address: 'Main Market' } },
    ]
  },
  {
    id: '6',
    name: 'Refined Oil',
    category: 'Groceries',
    brand: 'Fortune',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
    description: 'Pure refined sunflower oil',
    created_at: new Date().toISOString(),
    cheapest_price: 150,
    cheapest_store: { id: '2', name: 'Sharma Grocery', logo: '', rating: 4.2 },
    all_stores: [
      { id: '2', price: 150, stock: 40, store: { id: '2', name: 'Sharma Grocery', logo: '', rating: 4.2, address: 'Sector 15' } },
    ]
  },
  {
    id: '7',
    name: 'Atta',
    category: 'Groceries',
    brand: 'Aashirvaad',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
    description: 'Whole wheat atta',
    created_at: new Date().toISOString(),
    cheapest_price: 280,
    cheapest_store: { id: '3', name: 'Daily Needs', logo: '', rating: 4.3 },
    all_stores: [
      { id: '3', price: 280, stock: 25, store: { id: '3', name: 'Daily Needs', logo: '', rating: 4.3, address: 'City Center' } },
    ]
  },
]

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [isFavorite, setIsFavorite] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [selectedStore, setSelectedStore] = useState(mockProduct.all_stores[0])

  const sortedStores = [...mockProduct.all_stores].sort((a, b) => a.price - b.price)

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
              <li><Link href="/search" className="text-gray-500 hover:text-primary">Products</Link></li>
              <li><span className="text-gray-400">/</span></li>
              <li><Link href={`/search?category=${mockProduct.category}`} className="text-gray-500 hover:text-primary">{mockProduct.category}</Link></li>
              <li><span className="text-gray-400">/</span></li>
              <li className="text-gray-900">{mockProduct.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-card overflow-hidden"
            >
              <div className="relative aspect-square">
                <Image
                  src={mockProduct.image}
                  alt={mockProduct.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <p className="text-sm text-gray-500 mb-1">{mockProduct.category} • {mockProduct.brand}</p>
                <h1 className="text-3xl font-bold text-gray-900">{mockProduct.name}</h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">4.0 (128 reviews)</span>
              </div>

              {/* Price from cheapest store */}
              <div className="bg-primary/10 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">Cheapest Price</p>
                <p className="text-3xl font-bold text-primary">₹{sortedStores[0].price}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Available at {sortedStores[0].store.name}
                </p>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{mockProduct.description}</p>
              </div>

              {/* Quantity Selector */}
              <div>
                <h3 className="font-semibold mb-2">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-white rounded-lg border border-gray-200">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-50"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-50"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Store Selection */}
              <div>
                <h3 className="font-semibold mb-2">Select Store</h3>
                <div className="space-y-2">
                  {sortedStores.map((store) => (
                    <button
                      key={store.id}
                      onClick={() => setSelectedStore(store)}
                      className={`w-full p-3 rounded-lg border text-left flex items-center justify-between ${
                        selectedStore.id === store.id
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div>
                        <p className="font-medium">{store.store.name}</p>
                        <p className="text-sm text-gray-500">₹{store.price} • {store.stock > 0 ? `${store.stock} in stock` : 'Out of stock'}</p>
                      </div>
                      {selectedStore.id === store.id && (
                        <CheckCircle className="w-5 h-5 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button className="btn btn-primary flex-1 text-lg py-4">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="btn btn-secondary p-4"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
                <button className="btn btn-secondary p-4">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex gap-6 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Truck className="w-5 h-5 text-primary" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>Quality Assured</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Price Comparison Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Price Comparison</h2>
            <PriceComparisonTable
              prices={mockProduct.all_stores}
              productId={id}
              productName={mockProduct.name}
            />
          </section>

          {/* Related Products */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product as any} index={index} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SearchBar from '@/components/SearchBar'
import ProductCard from '@/components/ProductCard'
import { ProductGridSkeleton, SearchResultSkeleton } from '@/components/LoadingSkeleton'
import { SlidersHorizontal, ChevronDown, X, Grid3X3, List } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Mock data for demonstration
const mockProducts = [
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
    all_stores: [
      { id: '1', price: 199, stock: 50, store: { id: '1', name: 'Fresh Mart', logo: '', rating: 4.5, address: 'Main Market' } },
      { id: '2', price: 210, stock: 30, store: { id: '2', name: 'Sharma Grocery', logo: '', rating: 4.2, address: 'Sector 15' } },
    ]
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
    all_stores: [
      { id: '1', price: 28, stock: 100, store: { id: '1', name: 'Fresh Mart', logo: '', rating: 4.5, address: 'Main Market' } },
    ]
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
    all_stores: [
      { id: '1', price: 38, stock: 20, store: { id: '1', name: 'Fresh Mart', logo: '', rating: 4.5, address: 'Main Market' } },
      { id: '3', price: 35, stock: 15, store: { id: '3', name: 'Daily Needs', logo: '', rating: 4.3, address: 'City Center' } },
    ]
  },
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
]

const categories = ['All', 'Groceries', 'Dairy', 'Bakery', 'Fruits', 'Vegetables', 'Beverages']
const priceRanges = [
  { label: 'All Prices', min: undefined, max: undefined },
  { label: 'Under ₹50', min: 0, max: 50 },
  { label: '₹50 - ₹100', min: 50, max: 100 },
  { label: '₹100 - ₹200', min: 100, max: 200 },
  { label: 'Above ₹200', min: 200, max: undefined },
]
const sortOptions = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'newest' },
]

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const categoryParam = searchParams.get('category') || ''

  const [products, setProducts] = useState<typeof mockProducts>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Filters
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All')
  const [selectedPriceRange, setSelectedPriceRange] = useState(0)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sortBy, setSortBy] = useState('relevance')

  useEffect(() => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      let filtered = [...mockProducts]

      // Filter by search query
      if (query) {
        filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
        )
      }

      // Filter by category
      if (selectedCategory !== 'All') {
        filtered = filtered.filter(p => p.category === selectedCategory)
      }

      // Filter by price range
      const priceRange = priceRanges[selectedPriceRange]
      if (priceRange.min !== undefined) {
        filtered = filtered.filter(p => p.cheapest_price >= priceRange.min)
      }
      if (priceRange.max !== undefined) {
        filtered = filtered.filter(p => p.cheapest_price <= priceRange.max)
      }

      // Filter by stock
      if (inStockOnly) {
        filtered = filtered.filter(p => p.all_stores && p.all_stores.length > 0)
      }

      // Sort
      switch (sortBy) {
        case 'price-asc':
          filtered.sort((a, b) => (a.cheapest_price || 0) - (b.cheapest_price || 0))
          break
        case 'price-desc':
          filtered.sort((a, b) => (b.cheapest_price || 0) - (a.cheapest_price || 0))
          break
        case 'newest':
          filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          break
      }

      setProducts(filtered)
      setIsLoading(false)
    }, 500)
  }, [query, selectedCategory, selectedPriceRange, inStockOnly, sortBy])

  const clearFilters = () => {
    setSelectedCategory('All')
    setSelectedPriceRange(0)
    setInStockOnly(false)
    setSortBy('relevance')
  }

  const hasActiveFilters = selectedCategory !== 'All' || selectedPriceRange !== 0 || inStockOnly

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-surface-secondary pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Header */}
          <div className="mb-8">
            <div className="max-w-2xl mb-6">
              <SearchBar placeholder="Search products..." />
            </div>

            {query && (
              <p className="text-gray-600">
                Showing results for <span className="font-semibold">"{query}"</span>
              </p>
            )}
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="bg-white rounded-2xl shadow-card p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-primary hover:underline"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === cat}
                          onChange={() => setSelectedCategory(cat)}
                          className="w-4 h-4 text-primary"
                        />
                        <span className="text-sm text-gray-600">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range, index) => (
                      <label key={range.label} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="priceRange"
                          checked={selectedPriceRange === index}
                          onChange={() => setSelectedPriceRange(index)}
                          className="w-4 h-4 text-primary"
                        />
                        <span className="text-sm text-gray-600">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Stock Filter */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-4 h-4 text-primary rounded"
                    />
                    <span className="text-sm text-gray-600">In Stock Only</span>
                  </label>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden btn btn-secondary"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                    {hasActiveFilters && (
                      <span className="ml-2 w-2 h-2 bg-primary rounded-full" />
                    )}
                  </button>

                  <p className="text-gray-600">
                    {products.length} products found
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  {/* View Mode Toggle */}
                  <div className="hidden sm:flex items-center bg-white rounded-lg border border-gray-200">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-primary/10 text-primary' : 'text-gray-400'}`}
                    >
                      <Grid3X3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-primary/10 text-primary' : 'text-gray-400'}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products */}
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SearchResultSkeleton key={i} />
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-xl text-gray-500 mb-4">No products found</p>
                  <p className="text-gray-400">Try adjusting your filters or search term</p>
                </div>
              ) : (
                <div className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1'
                }`}>
                  {products.map((product, index) => (
                    <ProductCard key={product.id} product={product as any} index={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filters Modal */}
        <AnimatePresence>
          {showFilters && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                onClick={() => setShowFilters(false)}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 lg:hidden overflow-y-auto"
              >
                <div className="p-4 border-b flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-4 space-y-6">
                  {/* Category */}
                  <div>
                    <h4 className="font-medium mb-3">Category</h4>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <label key={cat} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="mobile-category"
                            checked={selectedCategory === cat}
                            onChange={() => setSelectedCategory(cat)}
                            className="w-4 h-4 text-primary"
                          />
                          <span>{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <div className="space-y-2">
                      {priceRanges.map((range, index) => (
                        <label key={range.label} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="mobile-price"
                            checked={selectedPriceRange === index}
                            onChange={() => setSelectedPriceRange(index)}
                            className="w-4 h-4 text-primary"
                          />
                          <span>{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Stock */}
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-4 h-4 text-primary rounded"
                    />
                    <span>In Stock Only</span>
                  </label>
                </div>

                <div className="p-4 border-t flex gap-4">
                  <button onClick={clearFilters} className="btn btn-secondary flex-1">
                    Clear
                  </button>
                  <button onClick={() => setShowFilters(false)} className="btn btn-primary flex-1">
                    Apply
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}
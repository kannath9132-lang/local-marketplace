import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SearchBar from '@/components/SearchBar'
import ProductCard from '@/components/ProductCard'
import StoreCard from '@/components/StoreCard'
import CategoryCard from '@/components/CategoryCard'
import { ProductGridSkeleton, StoreGridSkeleton } from '@/components/LoadingSkeleton'

export default function HomePage() {
  // In real app, fetch from Supabase
  const categories = [
    { name: 'Groceries', icon: '� Rice', count: 150 },
    { name: 'Dairy', icon: '🥛 Milk', count: 80 },
    { name: 'Bakery', icon: '🍞 Bread', count: 45 },
    { name: 'Fruits', icon: '🍎 Fruits', count: 60 },
    { name: 'Vegetables', icon: '🥬 Vegetables', count: 90 },
    { name: 'Beverages', icon: '🧃 Drinks', count: 70 },
  ]

  // Mock data for demonstration
  const featuredProducts = [
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
  ]

  const trendingDeals = [
    ...featuredProducts,
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
        { id: '2', price: 22, stock: 150, store: { id: '2', name: 'Sharma Grocery', logo: '', rating: 4.2, address: 'Sector 15' } },
      ]
    },
  ]

  const nearbyStores = [
    {
      id: '1',
      name: 'Fresh Mart',
      address: 'Main Market, Sector 12',
      city: 'Delhi',
      state: 'Delhi',
      phone: '+91 9876543210',
      latitude: 28.6139,
      longitude: 77.209,
      description: 'Fresh produce and groceries',
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
      description: 'Daily essentials',
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
      description: 'All your daily needs',
      logo: '',
      rating: 4.3,
      created_at: new Date().toISOString(),
      is_verified: false,
      distance: 3.0,
      products_count: 180
    },
  ]

  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-primary/20 via-white to-primary/10">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find the Best Prices
              <span className="text-primary"> Near You</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Compare prices across local stores, discover nearby shops, and get the best deals on everyday essentials.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <SearchBar large placeholder="Search for products, brands, or stores..." />
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-16">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">500+</p>
                <p className="text-gray-500">Local Stores</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">10,000+</p>
                <p className="text-gray-500">Products</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">50+</p>
                <p className="text-gray-500">Categories</p>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-gray-400 rounded-full" />
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-surface-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
              <p className="text-gray-600">Find products from your favorite categories</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category, index) => (
                <CategoryCard
                  key={category.name}
                  name={category.name}
                  icon={category.icon}
                  count={category.count}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
                <p className="text-gray-600">Popular products from local stores</p>
              </div>
              <a href="/search" className="btn btn-secondary">
                View All
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product as any}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Nearby Stores Section */}
        <section className="py-16 bg-surface-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Nearby Stores</h2>
                <p className="text-gray-600">Discover stores in your area</p>
              </div>
              <a href="/stores" className="btn btn-secondary">
                View All
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyStores.map((store, index) => (
                <StoreCard key={store.id} store={store} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Trending Deals Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Trending Deals</h2>
                <p className="text-gray-600">Best prices with multiple stores</p>
              </div>
              <a href="/search?sort=deals" className="btn btn-secondary">
                View All
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingDeals.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product as any}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Are You a Store Owner?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join our marketplace and reach thousands of customers. List your products and grow your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/register-store" className="btn bg-white text-primary hover:bg-gray-100">
                Register Your Store
              </a>
              <a href="/contact" className="btn border-2 border-white text-white hover:bg-white hover:text-primary">
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
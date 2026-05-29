'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Trash2, Minus, Plus, ShoppingBag, Tag, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface CartItem {
  id: string
  product: {
    name: string
    image: string
    store: string
  }
  price: number
  quantity: number
  size?: string
  color?: string
}

export default function CartPage() {
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      product: {
        name: 'Basmati Rice Premium - 5kg',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200',
        store: 'Fresh Mart'
      },
      price: 199,
      quantity: 2
    },
    {
      id: '2',
      product: {
        name: 'Fresh Milk - 1L',
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200',
        store: 'Fresh Mart'
      },
      price: 28,
      quantity: 3
    },
    {
      id: '3',
      product: {
        name: 'Whole Wheat Bread',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200',
        store: 'Sharma Grocery'
      },
      price: 38,
      quantity: 1
    }
  ])

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = appliedCoupon ? subtotal * 0.1 : 0
  const shipping = subtotal > 500 ? 0 : 50
  const total = subtotal - discount + shipping

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'save10') {
      setAppliedCoupon('SAVE10')
      setCouponCode('')
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-surface-secondary pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-card">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added any items yet.</p>
              <Link href="/search" className="btn btn-primary">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-card p-4 flex gap-4"
                  >
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{item.product.name}</h3>
                          <p className="text-sm text-gray-500">{item.product.store}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center bg-gray-50 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 hover:bg-gray-100 rounded-l-lg"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-2 hover:bg-gray-100 rounded-r-lg"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-lg font-bold text-gray-900">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <Link href="/search" className="text-primary hover:underline flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Continue Shopping
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-card p-6 sticky top-24">
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                  {/* Coupon */}
                  <div className="mb-6">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Coupon code"
                          className="input pl-10"
                        />
                      </div>
                      <button onClick={applyCoupon} className="btn btn-secondary">
                        Apply
                      </button>
                    </div>
                    {appliedCoupon && (
                      <p className="text-sm text-green-600 mt-2">
                        Coupon {appliedCoupon} applied! 10% off
                      </p>
                    )}
                  </div>

                  {/* Summary */}
                  <div className="space-y-3 border-t pt-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-₹{discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-gray-500">Free shipping on orders above ₹500</p>
                    )}
                    <div className="flex justify-between text-lg font-bold pt-3 border-t">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>

                  <Link href="/checkout" className="btn btn-primary w-full mt-6">
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
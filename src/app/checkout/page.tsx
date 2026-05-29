'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ChevronLeft, ChevronRight, CreditCard, CheckCircle, Loader2, MapPin, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface CartItem {
  id: string
  product: { name: string; image: string; store: string }
  price: number
  quantity: number
}

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    paymentMethod: 'card'
  })

  const [cartItems] = useState<CartItem[]>([
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
    }
  ])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 50
  const total = subtotal + shipping

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        setIsComplete(true)
      }, 2000)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (isComplete) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-surface-secondary pt-24 pb-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl shadow-card p-12"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
              <p className="text-gray-500 mb-8">
                Your order has been placed and will be processed shortly.
                You'll receive a confirmation email soon.
              </p>
              <p className="text-lg font-semibold mb-2">Order ID: #ORD-{Date.now().toString().slice(-6)}</p>
              <div className="flex gap-4 justify-center mt-8">
                <Link href="/dashboard" className="btn btn-primary">
                  View Orders
                </Link>
                <Link href="/" className="btn btn-secondary">
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-surface-secondary pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Steps */}
          <div className="flex items-center justify-center mb-12">
            {['Information', 'Shipping', 'Payment'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center gap-2 ${currentStep > index + 1 ? 'text-primary' : currentStep === index + 1 ? 'text-gray-900' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep > index + 1
                      ? 'bg-primary text-white'
                      : currentStep === index + 1
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-200'
                  }`}>
                    {currentStep > index + 1 ? <CheckCircle className="w-5 h-5" /> : index + 1}
                  </div>
                  <span className="hidden sm:inline font-medium">{step}</span>
                </div>
                {index < 2 && <div className={`w-16 h-0.5 mx-2 ${currentStep > index + 1 ? 'bg-primary' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl shadow-card p-6"
                >
                  {/* Step 1: Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">Contact Information</h2>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="input"
                          placeholder="john@example.com"
                        />
                      </div>

                      <h2 className="text-xl font-semibold pt-4">Shipping Address</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="input"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="input"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="input"
                          placeholder="Street address"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="input"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                          <input
                            type="text"
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            className="input"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                          <input
                            type="text"
                            value={formData.pincode}
                            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                            className="input"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="input"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Shipping */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">Shipping Method</h2>
                      <div className="space-y-3">
                        <label className="block p-4 border rounded-xl cursor-pointer hover:border-primary">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <input type="radio" name="shipping" defaultChecked className="w-4 h-4 text-primary" />
                              <div>
                                <p className="font-medium">Standard Delivery</p>
                                <p className="text-sm text-gray-500">3-5 business days</p>
                              </div>
                            </div>
                            <span className="font-semibold">₹50</span>
                          </div>
                        </label>
                        <label className="block p-4 border rounded-xl cursor-pointer hover:border-primary">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <input type="radio" name="shipping" className="w-4 h-4 text-primary" />
                              <div>
                                <p className="font-medium">Express Delivery</p>
                                <p className="text-sm text-gray-500">1-2 business days</p>
                              </div>
                            </div>
                            <span className="font-semibold">₹100</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Payment */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">Payment Method</h2>
                      <div className="space-y-3">
                        <label className="block p-4 border rounded-xl cursor-pointer hover:border-primary">
                          <div className="flex items-center gap-3">
                            <input type="radio" name="payment" value="card" checked={formData.paymentMethod === 'card'} onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })} className="w-4 h-4 text-primary" />
                            <CreditCard className="w-5 h-5" />
                            <span>Credit / Debit Card</span>
                          </div>
                        </label>
                        <label className="block p-4 border rounded-xl cursor-pointer hover:border-primary">
                          <div className="flex items-center gap-3">
                            <input type="radio" name="payment" value="upi" checked={formData.paymentMethod === 'upi'} onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })} className="w-4 h-4 text-primary" />
                            <span>UPI</span>
                          </div>
                        </label>
                        <label className="block p-4 border rounded-xl cursor-pointer hover:border-primary">
                          <div className="flex items-center gap-3">
                            <input type="radio" name="payment" value="cod" checked={formData.paymentMethod === 'cod'} onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })} className="w-4 h-4 text-primary" />
                            <span>Cash on Delivery</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between mt-8 pt-6 border-t">
                    <button
                      onClick={handleBack}
                      disabled={currentStep === 1}
                      className="btn btn-secondary"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Back
                    </button>
                    <button onClick={handleNext} disabled={isProcessing} className="btn btn-primary">
                      {isProcessing ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : currentStep === 3 ? (
                        `Pay ₹${total}`
                      ) : (
                        <>
                          Continue
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-card p-6 sticky top-24">
                <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>₹{shipping}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-3 border-t">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
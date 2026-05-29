'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Star, ShoppingCart, CheckCircle, Crown } from 'lucide-react'
import { motion } from 'framer-motion'

interface StorePrice {
  id: string
  price: number
  stock: number
  store: {
    id: string
    name: string
    logo: string
    rating: number
    address: string
  }
}

interface PriceComparisonTableProps {
  prices: StorePrice[]
  productId: string
  productName: string
}

export default function PriceComparisonTable({
  prices,
  productId,
  productName
}: PriceComparisonTableProps) {
  const sortedPrices = [...prices].sort((a, b) => a.price - b.price)

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-lg">Price Comparison</h3>
        <p className="text-sm text-gray-500">{productName}</p>
      </div>

      <div className="divide-y">
        {sortedPrices.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-4 flex items-center gap-4 ${
              index === 0 ? 'bg-green-50' : ''
            }`}
          >
            {/* Rank */}
            <div className="w-8 h-8 flex items-center justify-center">
              {index === 0 ? (
                <Crown className="w-6 h-6 text-yellow-500" />
              ) : (
                <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
              )}
            </div>

            {/* Store Info */}
            <Link
              href={`/store/${item.store.id}`}
              className="flex items-center gap-3 flex-1 min-w-0"
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src={item.store.logo || '/store-placeholder.png'}
                  alt={item.store.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-gray-900 truncate flex items-center gap-1">
                  {item.store.name}
                  {index === 0 && (
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  )}
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {item.store.address}
                </p>
              </div>
            </Link>

            {/* Rating */}
            <div className="hidden sm:flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{item.store.rating.toFixed(1)}</span>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className={`text-lg font-bold ${index === 0 ? 'text-primary' : 'text-gray-900'}`}>
                ₹{item.price}
              </p>
              <p className={`text-xs ${item.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {item.stock > 0
                  ? item.stock > 5
                    ? 'In Stock'
                    : `Only ${item.stock} left`
                  : 'Out of Stock'}
              </p>
            </div>

            {/* Action */}
            <button
              disabled={item.stock === 0}
              className={`btn ${
                index === 0 ? 'btn-primary' : 'btn-secondary'
              } shrink-0`}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
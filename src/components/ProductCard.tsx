'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart, Eye, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { ProductWithPrice } from '@/types/database'

interface ProductCardProps {
  product: ProductWithPrice
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageError, setImageError] = useState(false)

  const stockStatus = product.all_stores && product.all_stores.length > 0
    ? product.all_stores[0].stock > 5
      ? 'in-stock'
      : 'low-stock'
    : 'out-of-stock'

  const stockBadge = {
    'in-stock': { label: 'In Stock', class: 'bg-green-100 text-green-800' },
    'low-stock': { label: 'Low Stock', class: 'bg-yellow-100 text-yellow-800' },
    'out-of-stock': { label: 'Out of Stock', class: 'bg-red-100 text-red-800' },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-2xl shadow-card overflow-hidden card-hover"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {!imageError ? (
          <Image
            src={product.image || '/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">📦</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className={`badge ${stockBadge[stockStatus as keyof typeof stockBadge].class}`}>
            {stockBadge[stockStatus as keyof typeof stockBadge].label}
          </span>
        </div>

        {/* Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsFavorite(!isFavorite)
            }}
            className="w-10 h-10 bg-white rounded-full shadow-elevated flex items-center justify-center hover:bg-red-50 transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
            />
          </button>
          <Link
            href={`/product/${product.id}`}
            className="w-10 h-10 bg-white rounded-full shadow-elevated flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
          >
            <Eye className="w-5 h-5 text-gray-600" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <Link href={`/product/${product.id}`} className="block p-4">
        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {product.cheapest_price && (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-primary">
                ₹{product.cheapest_price}
              </p>
              {product.cheapest_store && (
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {product.cheapest_store.name}
                </p>
              )}
            </div>
            <button className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        )}

        {!product.cheapest_price && (
          <p className="text-sm text-gray-400">Not available</p>
        )}
      </Link>
    </motion.div>
  )
}
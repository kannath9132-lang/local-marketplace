'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Star, CheckCircle, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { Store } from '@/types/database'

interface StoreCardProps {
  store: Store & { distance?: number; products_count?: number }
  index?: number
}

export default function StoreCard({ store, index = 0 }: StoreCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-2xl shadow-card overflow-hidden card-hover"
    >
      <Link href={`/store/${store.id}`}>
        {/* Logo */}
        <div className="relative h-32 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          {!imageError ? (
            <Image
              src={store.logo || '/store-placeholder.png'}
              alt={store.name}
              width={80}
              height={80}
              className="rounded-full object-cover border-4 border-white shadow-elevated"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-elevated">
              <ShoppingBag className="w-10 h-10 text-primary" />
            </div>
          )}
          {store.is_verified && (
            <div className="absolute top-3 right-3">
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
            {store.name}
            {store.is_verified && (
              <CheckCircle className="w-4 h-4 text-primary" />
            )}
          </h3>

          <p className="text-sm text-gray-500 flex items-start gap-1 mb-3">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
            <span className="line-clamp-1">
              {store.address}, {store.city}
            </span>
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{store.rating.toFixed(1)}</span>
            </div>

            {store.distance !== undefined && (
              <span className="text-sm text-gray-500">
                {store.distance.toFixed(1)} km
              </span>
            )}

            {store.products_count !== undefined && (
              <span className="text-sm text-gray-500">
                {store.products_count} products
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
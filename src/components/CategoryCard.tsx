'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface CategoryCardProps {
  name: string
  icon: string
  count: number
  index?: number
}

export default function CategoryCard({ name, icon, count, index = 0 }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        href={`/search?category=${encodeURIComponent(name)}`}
        className="group block bg-white rounded-2xl shadow-card overflow-hidden card-hover"
      >
        <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
          <span className="text-6xl transition-transform group-hover:scale-110">
            {icon}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
          <p className="text-sm text-gray-500">{count} products</p>
        </div>
      </Link>
    </motion.div>
  )
}
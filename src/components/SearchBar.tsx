'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchSuggestion {
  id: string
  name: string
  category: string
}

interface SearchBarProps {
  large?: boolean
  placeholder?: string
}

export default function SearchBar({ large = false, placeholder = 'Search products...' }: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mock suggestions - in real app, fetch from API
  const mockSuggestions: SearchSuggestion[] = [
    { id: '1', name: 'Rice', category: 'Groceries' },
    { id: '2', name: 'Milk', category: 'Dairy' },
    { id: '3', name: 'Bread', category: 'Bakery' },
    { id: '4', name: 'Eggs', category: 'Dairy' },
    { id: '5', name: 'Sugar', category: 'Groceries' },
    { id: '6', name: 'Salt', category: 'Groceries' },
    { id: '7', name: 'Oil', category: 'Groceries' },
    { id: '8', name: 'Atta', category: 'Groceries' },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length >= 2) {
        setIsLoading(true)
        // In real app, fetch from API
        const filtered = mockSuggestions.filter(s =>
          s.name.toLowerCase().includes(query.toLowerCase())
        )
        setSuggestions(filtered)
        setIsLoading(false)
        setShowSuggestions(true)
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [query])

  const handleSearch = (searchQuery?: string) => {
    const q = searchQuery || query
    if (q.trim()) {
      setShowSuggestions(false)
      router.push(`/search?q=${encodeURIComponent(q.trim())}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={`flex items-center bg-white rounded-xl shadow-elevated overflow-hidden ${
          large ? 'h-16' : 'h-12'
        }`}
      >
        <div className="flex items-center px-4 text-gray-400">
          {isLoading ? (
            <Loader2 className={`${large ? 'w-6 h-6' : 'w-5 h-5'} animate-spin`} />
          ) : (
            <Search className={`${large ? 'w-6 h-6' : 'w-5 h-5'}`} />
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setShowSuggestions(true)}
          placeholder={placeholder}
          className="flex-1 h-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
        />

        {query && (
          <button
            onClick={() => {
              setQuery('')
              setSuggestions([])
              inputRef.current?.focus()
            }}
            className="px-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={() => handleSearch()}
          className={`${
            large ? 'px-8' : 'px-6'
          } h-full bg-primary text-white font-medium hover:bg-primary-dark transition-colors`}
        >
          {large ? 'Search' : <Search className="w-5 h-5" />}
        </button>
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-elevated overflow-hidden z-50"
          >
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSearch(suggestion.name)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-900">{suggestion.name}</span>
                <span className="text-sm text-gray-400">{suggestion.category}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
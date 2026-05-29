export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      <div className="aspect-square skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-20 skeleton rounded" />
        <div className="h-5 w-full skeleton rounded" />
        <div className="h-5 w-3/4 skeleton rounded" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-24 skeleton rounded" />
          <div className="h-10 w-10 skeleton rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function StoreCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      <div className="h-32 skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 skeleton rounded" />
        <div className="h-4 w-full skeleton rounded" />
        <div className="flex items-center justify-between">
          <div className="h-4 w-16 skeleton rounded" />
          <div className="h-4 w-20 skeleton rounded" />
        </div>
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function StoreGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <StoreCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function SearchResultSkeleton() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-card">
      <div className="flex gap-4">
        <div className="w-24 h-24 skeleton rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-20 skeleton rounded" />
          <div className="h-5 w-3/4 skeleton rounded" />
          <div className="h-4 w-1/2 skeleton rounded" />
          <div className="h-6 w-24 skeleton rounded" />
        </div>
      </div>
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="space-y-8">
      {/* Hero skeleton */}
      <div className="h-96 skeleton rounded-2xl" />

      {/* Section skeletons */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-4">
          <div className="h-8 w-48 skeleton rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, j) => (
              <ProductCardSkeleton key={j} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
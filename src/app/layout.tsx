import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Local Marketplace - Compare Prices & Find Nearby Stores',
  description: 'Discover the best prices from local stores. Compare products, check stock availability, and find nearby shops.',
  keywords: 'marketplace, local stores, price comparison, shopping, nearby stores',
  openGraph: {
    title: 'Local Marketplace - Compare Prices & Find Nearby Stores',
    description: 'Discover the best prices from local stores. Compare products, check stock availability, and find nearby shops.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface">
        {children}
      </body>
    </html>
  )
}
'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { MapPin, Target, Eye, Users, Award, Clock, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const achievements = [
  { year: '2023', title: 'Founded', description: 'LocalMart was founded with a vision to revolutionize local shopping' },
  { year: '2023', title: '100 Stores', description: 'Reached 100 partner stores within first 6 months' },
  { year: '2024', title: '10K+ Products', description: 'Milestone of 10,000 products listed on the platform' },
  { year: '2024', title: '50K Users', description: 'Served over 50,000 happy customers' },
]

const teamMembers = [
  { name: 'John Doe', role: 'CEO & Founder', avatar: 'JD' },
  { name: 'Jane Smith', role: 'COO', avatar: 'JS' },
  { name: 'Mike Johnson', role: 'CTO', avatar: 'MJ' },
  { name: 'Sarah Williams', role: 'Head of Marketing', avatar: 'SW' },
]

export default function AboutPage() {
  const [counters, setCounters] = useState({ stores: 0, products: 0, users: 0, cities: 0 })

  useEffect(() => {
    const target = { stores: 500, products: 10000, users: 50000, cities: 50 }
    const duration = 2000
    const steps = 60
    const increment = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current++
      const progress = current / steps
      setCounters({
        stores: Math.floor(target.stores * progress),
        products: Math.floor(target.products * progress),
        users: Math.floor(target.users * progress),
        cities: Math.floor(target.cities * progress),
      })
      if (current >= steps) clearInterval(timer)
    }, increment)

    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-surface-secondary">
        {/* Hero */}
        <section className="relative py-24 bg-gradient-to-br from-primary/20 via-white to-primary/10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              About LocalMart
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600"
            >
              Your trusted local marketplace for comparing prices and discovering nearby stores
            </motion.p>
          </div>
        </section>

        {/* Story */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  LocalMart was born from a simple idea: make it easy for people to find the best prices
                  from local stores. We believe in supporting local businesses while helping consumers
                  make informed decisions.
                </p>
                <p className="text-gray-600 mb-6">
                  Our platform connects shoppers with nearby stores, enabling price comparisons and
                  helping local merchants reach more customers. We're committed to building a
                  sustainable marketplace that benefits everyone in the community.
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    <span className="font-medium">Our Mission</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary" />
                    <span className="font-medium">Our Vision</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-card p-8"
              >
                <h3 className="text-xl font-semibold mb-6">Mission & Vision</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-xl">
                    <h4 className="font-semibold text-primary mb-1">Mission</h4>
                    <p className="text-sm text-gray-600">
                      To empower consumers with price information and support local businesses
                      through technology.
                    </p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-xl">
                    <h4 className="font-semibold text-primary mb-1">Vision</h4>
                    <p className="text-sm text-gray-600">
                      To become the most trusted local marketplace, connecting every consumer
                      with their nearest best-priced stores.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Partner Stores', value: counters.stores, icon: MapPin },
                { label: 'Products', value: counters.products, icon: Award },
                { label: 'Happy Users', value: counters.users, icon: Users },
                { label: 'Cities', value: counters.cities, icon: Clock },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-4xl font-bold text-gray-900 mb-1">
                    {stat.value.toLocaleString()}+
                  </p>
                  <p className="text-gray-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-gray-600">The people behind LocalMart</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-card p-6 text-center"
                >
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">{member.avatar}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Journey</h2>

            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-primary/20" />

              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center mb-8 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white p-4 rounded-xl shadow-card inline-block">
                      <span className="text-primary font-bold">{achievement.year}</span>
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-500">{achievement.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-primary rounded-full absolute left-1/2 -translate-x-1/2" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
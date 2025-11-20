import { useEffect, useState } from 'react'
import { apiGet } from '../lib/api'
import { motion } from 'framer-motion'

export default function Reviews() {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    apiGet('/api/reviews').then(setReviews).catch(() => setReviews([]))
  }, [])

  return (
    <section className="py-24 bg-gradient-to-b from-black to-black/90">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white">What guests are saying</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-3">
                <img src={r.avatar || `https://i.pravatar.cc/100?img=${i+10}`} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="text-white font-medium">{r.name}</p>
                  <p className="text-white/60 text-sm">{r.source || 'Guest'}</p>
                </div>
              </div>
              <div className="mt-3 text-amber-300">{'★★★★★'.slice(0, r.rating)}</div>
              <p className="mt-3 text-white/80">{r.comment}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

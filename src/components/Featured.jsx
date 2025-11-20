import { useEffect, useState } from 'react'
import { apiGet } from '../lib/api'
import { motion } from 'framer-motion'

export default function Featured() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiGet('/api/featured')
        setItems(data)
      } catch (e) {
        setItems([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section id="menu" className="relative py-24 bg-black">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white">Featured plates</h2>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(loading ? Array.from({ length: 3 }).map((_, i) => ({ placeholder: true, id: i })) : items).map((item, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }} className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={item.image || `https://picsum.photos/seed/menu-${idx}/800/600`} alt={item.name || 'Dish'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-medium text-lg">{item.name || 'Signature Dish'}</h3>
                  {item.price && <span className="text-white/80">${Number(item.price).toFixed(2)}</span>}
                </div>
                <p className="mt-2 text-white/70 line-clamp-2">{item.description || 'A seasonal highlight crafted by our chefs.'}</p>
                <p className="mt-2 text-rose-300/90 text-sm">{item.category || 'Chef\'s special'}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

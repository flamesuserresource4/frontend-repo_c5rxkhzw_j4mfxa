import { useEffect, useState } from 'react'
import { apiGet } from '../lib/api'
import { motion } from 'framer-motion'
import RotatingPlate from './RotatingPlate'

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

  const list = loading ? Array.from({ length: 3 }).map((_, i) => ({ placeholder: true, id: i })) : items

  return (
    <section id="menu" className="relative py-24 bg-black">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white">Featured plates</h2>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {list.map((item, idx) => (
            <div key={idx} className="group relative rounded-2xl">
              <RotatingPlate
                index={idx}
                src={item.image || `https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3`}
                alt={item.name || 'Dish'}
              />
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="mt-4 px-2"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-medium text-lg">{item.name || 'Signature Dish'}</h3>
                  {item.price && <span className="text-white/80">${Number(item.price).toFixed(2)}</span>}
                </div>
                <p className="mt-1.5 text-white/70 line-clamp-2">{item.description || 'A seasonal highlight crafted by our chefs.'}</p>
                <p className="mt-1 text-rose-300/90 text-sm">{item.category || "Chef's special"}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

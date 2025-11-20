import { useState } from 'react'
import { apiPost } from '../lib/api'
import { motion } from 'framer-motion'

export default function Reservation() {
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState(null)

  async function submit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = Object.fromEntries(form.entries())
    payload.guests = Number(payload.guests)

    setLoading(true)
    setOk(null)
    try {
      await apiPost('/api/reservations', payload)
      setOk(true)
      e.currentTarget.reset()
    } catch (e) {
      setOk(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="reservation" className="relative py-24 bg-gradient-to-b from-black to-black/90">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white">Reserve your table</h2>
            <p className="mt-3 text-white/70">We hold reservations for 15 minutes. For parties larger than 8, please contact us directly.</p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {['Fresh pasta daily', 'Natural wines', 'Wood-fired oven'].map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-xl border border-white/10 bg-white/5 p-4 text-white/80">
                  {f}
                </motion.div>
              ))}
            </div>
          </div>

          <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="name" required placeholder="Name" className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20" />
              <input name="phone" required placeholder="Phone" className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20" />
              <input name="email" type="email" placeholder="Email (optional)" className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 sm:col-span-2" />
              <input name="date" required type="date" className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20" />
              <input name="time" required type="time" className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20" />
              <input name="guests" required type="number" min="1" max="20" placeholder="Guests" className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20" />
              <textarea name="notes" rows="3" placeholder="Notes (allergies, occasion, etc.)" className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 sm:col-span-2" />
            </div>
            <button disabled={loading} className="mt-6 w-full rounded-lg bg-white text-black font-medium py-3 hover:scale-[1.01] active:scale-[0.99] transition">
              {loading ? 'Booking…' : 'Book now'}
            </button>
            {ok === true && <p className="mt-3 text-emerald-300">Reservation received! We\'ll confirm shortly.</p>}
            {ok === false && <p className="mt-3 text-rose-300">Something went wrong. Please try again.</p>}
          </form>
        </div>
      </div>
    </section>
  )
}

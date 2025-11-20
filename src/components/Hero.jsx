import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2000&auto=format&fit=crop"
          alt="Restaurant ambience"
          className="w-full h-[80vh] object-cover"
        />
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[90rem] h-[90rem] rounded-full bg-gradient-to-tr from-rose-500/20 via-amber-500/20 to-emerald-500/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 sm:px-12 h-[80vh] flex items-center">
        <div className="max-w-3xl">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="uppercase tracking-[0.3em] text-rose-200/90">ALESSIO</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-3 text-5xl sm:text-7xl font-semibold text-white leading-tight">
            Modern Italian dining with soul
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6 text-lg text-white/80">
            Handmade pasta, wood-fired pizzas and seasonal plates served with effortless warmth.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-10 flex flex-wrap gap-4">
            <a href="#reservation" className="px-6 py-3 rounded-full bg-white text-black font-medium hover:scale-[1.02] active:scale-[0.98] transition">Reserve a table</a>
            <a href="#menu" className="px-6 py-3 rounded-full ring-1 ring-white/50 text-white hover:bg-white/10 transition">Browse menu</a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

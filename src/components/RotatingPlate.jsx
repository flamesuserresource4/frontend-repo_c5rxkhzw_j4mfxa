import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function RotatingPlate({ src, alt = 'Dish', index = 0 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 20%']
  })

  const direction = index % 2 === 0 ? 1 : -1
  // Stronger, more noticeable transforms
  const rotate = useTransform(scrollYProgress, [0, 1], [direction * -35, direction * 35])
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.05])

  return (
    <div ref={ref} className="group relative aspect-square p-4 [perspective:1200px]">
      {/* Outer wrapper adds hover feedback so the effect is obvious even without scroll */}
      <motion.div
        whileHover={{ scale: 1.05, rotate: direction * 6 }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        className="relative mx-auto size-full max-w-[460px]"
      >
        <motion.div
          style={{ rotate, y, scale }}
          initial={{ opacity: 0, y: 60, rotate: direction * -10, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, rotate: direction * 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: 'spring', stiffness: 180, damping: 20 }}
          className="relative isolate rounded-full overflow-hidden shadow-[0_30px_120px_-20px_rgba(255,255,255,0.18)]"
        >
          <div className="absolute inset-0 rounded-full ring-1 ring-white/20" />
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-rose-500/15 via-amber-500/15 to-emerald-500/15 blur-2xl" />
          <img
            src={src}
            alt={alt}
            className="relative z-10 h-full w-full object-cover"
            loading="lazy"
          />
          {/* Subtle vignette */}
          <div className="pointer-events-none absolute inset-0 z-10 rounded-full bg-gradient-to-b from-black/10 to-black/35" />
        </motion.div>

        {/* Floating highlight for perceived motion (independent of scroll) */}
        <motion.div
          aria-hidden
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -top-2 -right-2 h-10 w-10 rounded-full bg-white/6 blur-xl"
        />
      </motion.div>
    </div>
  )
}

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function RotatingPlate({ src, alt = 'Dish', index = 0 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 90%', 'end 10%']
  })

  const direction = index % 2 === 0 ? 1 : -1
  const rotate = useTransform(scrollYProgress, [0, 1], [direction * -20, direction * 20])
  const y = useTransform(scrollYProgress, [0, 1], [20, -20])
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1.02])

  return (
    <div ref={ref} className="relative aspect-square p-4">
      <motion.div
        style={{ rotate, y, scale }}
        className="relative isolate mx-auto size-full max-w-[420px] rounded-full overflow-hidden shadow-[0_15px_60px_-15px_rgba(255,255,255,0.15)]"
      >
        <div className="absolute inset-0 rounded-full ring-1 ring-white/20" />
        <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-rose-500/10 via-amber-500/10 to-emerald-500/10 blur-xl" />
        <img
          src={src}
          alt={alt}
          className="relative z-10 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 z-10 rounded-full bg-gradient-to-b from-black/10 to-black/30" />
      </motion.div>
    </div>
  )
}

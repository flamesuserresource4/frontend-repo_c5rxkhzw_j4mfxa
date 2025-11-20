import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <div className="flex items-center justify-between gap-6 py-5">
          <a href="#" className="text-white font-semibold text-xl tracking-wide">Alessio</a>
          <nav className="hidden md:flex items-center gap-8 text-white/90">
            <a href="#menu" className="hover:text-white">Menu</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#reservation" className="hover:text-white">Reservations</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
          <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-black/80 backdrop-blur border-t border-white/10">
          <nav className="px-6 py-4 text-white/90 space-y-3">
            <a href="#menu" className="block">Menu</a>
            <a href="#about" className="block">About</a>
            <a href="#reservation" className="block">Reservations</a>
            <a href="#contact" className="block">Contact</a>
          </nav>
        </div>
      )}
    </header>
  )
}

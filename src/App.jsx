import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Featured from './components/Featured'
import Reservation from './components/Reservation'
import Reviews from './components/Reviews'
import Newsletter from './components/Newsletter'

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Featured />
      <Reservation />
      <Reviews />
      <Newsletter />
      <footer className="py-10 text-center text-white/60 bg-black">
        © {new Date().getFullYear()} Alessio • 145 Orchard St, New York • Open nightly
      </footer>
    </div>
  )
}

export default App

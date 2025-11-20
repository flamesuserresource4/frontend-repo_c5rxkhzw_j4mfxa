import { useState } from 'react'
import { apiPost } from '../lib/api'

export default function Newsletter() {
  const [ok, setOk] = useState(null)
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setLoading(true)
    setOk(null)
    try {
      await apiPost('/api/newsletter', Object.fromEntries(form.entries()))
      setOk(true)
      e.currentTarget.reset()
    } catch (e) {
      setOk(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="mx-auto max-w-3xl px-6 sm:px-12 text-center">
        <h3 className="text-2xl sm:text-3xl font-semibold text-white">Join the Alessio list</h3>
        <p className="mt-3 text-white/70">New menus, events and special tastings, straight to your inbox.</p>
        <form onSubmit={submit} className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <input name="email" type="email" required placeholder="Your email" className="flex-1 rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20" />
          <button disabled={loading} className="rounded-lg bg-white text-black font-medium px-6 py-3">
            {loading ? 'Joining…' : 'Subscribe'}
          </button>
        </form>
        {ok === true && <p className="mt-3 text-emerald-300">Thanks for joining!</p>}
        {ok === false && <p className="mt-3 text-rose-300">Please try again.</p>}
      </div>
    </section>
  )
}

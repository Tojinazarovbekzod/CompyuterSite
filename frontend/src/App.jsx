import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [apiMessage, setApiMessage] = useState('Connecting to Compyuter API...')
  const [serverTime, setServerTime] = useState('Loading…')

  useEffect(() => {
    fetch('/api/hello/')
      .then((response) => response.json())
      .then((data) => {
        setApiMessage(data.message || 'Compyuter API ready')
      })
      .catch(() => {
        setApiMessage('Unable to reach Compyuter API')
      })

    fetch('/api/time/')
      .then((response) => response.json())
      .then((data) => {
        setServerTime(data.server_time || 'Unavailable')
      })
      .catch(() => {
        setServerTime('Unavailable')
      })
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <section className="grid gap-12 lg:grid-cols-[1.15fr_.85fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-300 ring-1 ring-cyan-500/20">
              Tailwind + Django REST
            </div>
            <div className="space-y-6">
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Simple compyuter site styled with Tailwind CSS
              </h1>
              <p className="max-w-2xl text-slate-300 sm:text-lg">
                A clean, minimal React landing page with Tailwind utility styling and a connected Django REST backend.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="#status" className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400">
                Check API status
              </a>
              <a href="#features" className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500">
                View features
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.9)]">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Live status</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Backend health</h2>
            <p className="mt-3 text-slate-300">{apiMessage}</p>
            <div className="mt-6 rounded-3xl bg-slate-950/90 p-6 text-slate-300 ring-1 ring-slate-700">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Server time</p>
              <p className="mt-2 text-lg font-medium text-white">{serverTime}</p>
            </div>
          </div>
        </section>

        <section id="features" className="mt-20 grid gap-6 sm:grid-cols-2">
          {['Fast REST API', 'Modern Tailwind design', 'Responsive layout', 'Ready for production'].map((feature) => (
            <div key={feature} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20">
              <h3 className="text-xl font-semibold text-white">{feature}</h3>
              <p className="mt-3 text-slate-400">{feature === 'Fast REST API'
                ? 'Built from React to Django API routes for a real backend-driven site.'
                : feature === 'Modern Tailwind design'
                ? 'Styled with Tailwind utilities so the layout is clean and simple.'
                : feature === 'Responsive layout'
                ? 'Mobile friendly and looks great on every screen size.'
                : 'Use this foundation to expand with auth, data, and dashboard views.'}</p>
            </div>
          ))}
        </section>

        <section id="status" className="mt-20 rounded-[2rem] border border-slate-800 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/30">
          <h2 className="text-3xl font-semibold text-white">Simple site, powerful backend</h2>
          <p className="mt-4 max-w-3xl text-slate-400">This site demonstrates a simple Tailwind-based React landing page with live Django REST Framework connectivity. Use it as a starter template and extend it with real content, authentication, or product pages.</p>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App

import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

const products = [
  {
    name: 'Black Phantom Gaming PC',
    description: 'High-performance system with silent cooling and premium build.',
    price: '₽ 3 890 000',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Monochrome Workstation',
    description: 'Minimal design for content creation and fast rendering.',
    price: '₽ 2 470 000',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Urban Studio Laptop',
    description: 'Sleek laptop with powerful CPU and crisp display.',
    price: '₽ 1 920 000',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Pro Monitor Stand',
    description: 'Adjustable desk mount for a clean, cable-free desk.',
    price: '₽ 320 000',
    image: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41e0?auto=format&fit=crop&w=900&q=80',
  },
]

function App() {
  const [apiMessage, setApiMessage] = useState('Checking backend status...')
  const [serverTime, setServerTime] = useState('Loading…')

  useEffect(() => {
    fetch('/api/hello/')
      .then((response) => response.json())
      .then((data) => {
        setApiMessage(data.message || 'Django REST API ready')
      })
      .catch(() => {
        setApiMessage('Backend not reachable')
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
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.28em] text-white/70">
              Kompyuter uslubi</p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Qora va oq sahifa bilan zamonaviy veb-loyiha
            </h1>
            <p className="max-w-2xl text-slate-300 sm:text-lg">
              Faqat qora va oq ranglarni saqlab, kamroq elementlar bilan chiroyli, premium ko‘rinishga ega sayt yarating.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="#catalog" className="inline-flex items-center justify-center rounded-full border border-white px-6 py-3 text-sm font-semibold transition hover:bg-white hover:text-black">
                Mahsulotlarga qarang
              </a>
              <a href="#status" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-slate-200">
                API holati
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_-40px_rgba(255,255,255,0.15)]">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Kompyuter status</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Backend</h2>
            <p className="mt-3 text-slate-300">{apiMessage}</p>
            <div className="mt-6 space-y-3 rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>API qabul qilindi</span>
                <span className="text-white">{apiMessage === 'Backend not reachable' ? 'yo‘q' : 'ha'}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>Server vaqti</span>
                <span className="text-white">{serverTime}</span>
              </div>
            </div>
          </div>
        </section>

        <section id="catalog" className="mt-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Katalog</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Yangi mahsulotlar</h2>
            </div>
            <a href="#contact" className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:text-white">
              Hammasini ko‘rish
            </a>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <article key={product.name} className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-xl shadow-black/20 transition hover:border-white/20 hover:bg-white/10">
                <div className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-64 w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6 sm:p-7">
                  <span className="inline-flex rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-300">
                    Kompyuter toifasi
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-white">{product.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{product.description}</p>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <p className="text-lg font-semibold text-white">{product.price}</p>
                    <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/15">
                      Savatga qo‘shish
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="status" className="mt-20 rounded-[2rem] border border-white/10 bg-white/5 p-10">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Minimal dizayn</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Faqat qora va oq ranglar bilan toza ko‘rinish</h2>
              <p className="mt-4 max-w-2xl text-slate-300">Bu sahifa qora va oq ranglar bilan chiroyli, professional va yangi uslubni saqlab qoladi. Kerakli elementlar sodda, lekin ta’sirchan tarzda joylashtirilgan.</p>
            </div>
            <div className="grid gap-4 rounded-3xl border border-white/10 bg-black/50 p-6">
              <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-5">
                <span className="text-sm text-slate-400">Foydalanuvchi</span>
                <span className="text-white">Trend</span>
              </div>
              <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-5">
                <span className="text-sm text-slate-400">Savdo</span>
                <span className="text-white">30%</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App

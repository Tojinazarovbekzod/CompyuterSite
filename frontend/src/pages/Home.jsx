import { useEffect, useState } from 'react'
import { ArrowRight, ShoppingCart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import FeaturedSection from '../components/FeaturedSection.jsx'
import CategoryChips from '../components/CategoryChips.jsx'
import ReviewSection from '../components/ReviewSection.jsx'
import NewsletterSection from '../components/NewsletterSection.jsx'
import ProductCard from '../components/ProductCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import productService from '../services/productService.js'

function Home() {
  const [featured, setFeatured] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const products = await productService.getProducts({ limit: 8 })
        const categoriesData = await productService.getCategories()
        setFeatured(products.results || products)
        setCategories(categoriesData)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div className="space-y-20">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 px-6 py-16 shadow-glass sm:px-10 lg:px-14">
        <div className="absolute inset-0 bg-hero-pattern opacity-40" />
        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-300">
              Premium PC store</span>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Compyuter — the premium black and white tech store for modern setups.
            </h1>
            <p className="max-w-2xl text-slate-300 sm:text-lg">
              Discover luxury gaming systems, designer workstations, and curated accessories powered by React, Tailwind, and Django REST Framework.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/products" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:bg-slate-100">
                Shop now
              </Link>
              <a href="#featured" className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5">
                Explore featured
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-black/60 p-8 shadow-xl shadow-black/30">
            <div className="mb-8 flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Live drops</p>
                <p className="mt-2 text-xl font-semibold text-white">Luxury systems</p>
              </div>
              <ShoppingCart className="h-7 w-7 text-white" />
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-400">Featured collection</p>
                <p className="mt-2 text-xl font-semibold text-white">Gaming, creation, and productivity gear.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-400">Trusted by startups</p>
                <p className="mt-2 text-xl font-semibold text-white">Powerful products delivered with premium detail.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedSection />

      <section id="featured" className="space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Features</p>
            <h2 className="text-3xl font-semibold text-white">Signature categories</h2>
          </div>
          <Link to="/products" className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80 transition hover:text-white">
            Browse all products
          </Link>
        </div>

        <CategoryChips categories={categories} />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Curated</p>
          <h3 className="mt-4 text-2xl font-semibold text-white">Gaming PC showcase</h3>
          <p className="mt-4 text-slate-300">Handpicked systems for aggressive performance, crisp display, and beautiful desk presence.</p>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Exclusive</p>
          <h3 className="mt-4 text-2xl font-semibold text-white">Luxury accessories</h3>
          <p className="mt-4 text-slate-300">Shop premium keyboards, mice, and ambient desk gear made to complete the look.</p>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Minimal</p>
          <h3 className="mt-4 text-2xl font-semibold text-white">Sleek workstations</h3>
          <p className="mt-4 text-slate-300">Perfect systems for creators and professionals who need power in a polished package.</p>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Trusted reviews</p>
            <h2 className="text-3xl font-semibold text-white">Customer feedback</h2>
          </div>
        </div>
        <ReviewSection />
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glass">
        <NewsletterSection />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {featured.length === 0 ? (
          <div className="col-span-2 flex items-center justify-center rounded-[2rem] border border-white/10 bg-white/5 p-14">
            <LoadingSpinner />
          </div>
        ) : (
          featured.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </section>
    </div>
  )
}

export default Home

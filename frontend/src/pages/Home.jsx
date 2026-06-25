import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider.jsx'
import SidebarCategories from '../components/SidebarCategories.jsx'
import ProductCard from '../components/ProductCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import shopService from '../services/shopService.js'

const categoryTerms = {
  'Laptops': ['laptop'],
  'Gaming PCs': ['gaming', 'gpu', 'graphics', 'rtx'],
  'Graphics Cards': ['graphics', 'gpu', 'rtx', 'card'],
  'Processors': ['processor', 'cpu', 'chip'],
  'Monitors': ['monitor', 'display'],
  'Keyboards': ['keyboard'],
  'Mouse': ['mouse'],
  'Headphones': ['headphone'],
  'Speakers': ['speaker'],
  'Routers': ['router', 'wifi'],
}

function matchesCategory(product, activeCategory) {
  const terms = categoryTerms[activeCategory]

  if (!terms) {
    return true
  }

  const haystack = [product.name, product.short_description, product.category?.name, product.category?.slug, product.brand?.name]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  if (activeCategory === 'Gaming PCs' && product.is_gaming) {
    return true
  }

  return terms.some((term) => haystack.includes(term))
}

function Home() {
  const [topProducts, setTopProducts] = useState([])
  const [newProducts, setNewProducts] = useState([])
  const [popularProducts, setPopularProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [activeCategory, setActiveCategory] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [featured, latest, popular, categoryList, brandList] = await Promise.all([
          shopService.getProducts({ filter: 'discount', limit: 8 }),
          shopService.getProducts({ filter: 'new', limit: 8 }),
          shopService.getProducts({ filter: 'gaming', limit: 8 }),
          shopService.getCategories(),
          shopService.getBrands(),
        ])

        setTopProducts(featured.results || featured)
        setNewProducts(latest.results || latest)
        setPopularProducts(popular.results || popular)
        setCategories(categoryList)
        setBrands(brandList)
        setActiveCategory((current) => current || categoryList?.[0]?.name || '')
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const selectedTopProducts = useMemo(() => topProducts.filter((product) => matchesCategory(product, activeCategory)), [topProducts, activeCategory])
  const selectedNewProducts = useMemo(() => newProducts.filter((product) => matchesCategory(product, activeCategory)), [newProducts, activeCategory])
  const selectedPopularProducts = useMemo(() => popularProducts.filter((product) => matchesCategory(product, activeCategory)), [popularProducts, activeCategory])

  return (
    <div className="space-y-10">
      <HeroSlider />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <SidebarCategories active={activeCategory} onSelect={setActiveCategory} categories={categories} />

        <div className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200/70 bg-white p-5 shadow-xl shadow-slate-200/10 sm:p-6 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-pink-600">Premium electronics</p>
                <h1 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">A modern premium shopping experience for computers and accessories.</h1>
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Showing category: <span className="font-semibold text-slate-950 dark:text-white">{activeCategory || 'All categories'}</span></p>
              </div>
              <Link to="/products" className="inline-flex items-center justify-center rounded-full bg-pink-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-700">
                Explore catalog
              </Link>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {['Laptops', 'Gaming PCs', 'Monitors', 'Accessories'].map((label) => (
                <div key={label} className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{label}</p>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Top-rated picks for premium setups.</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
            <div className="rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-xl shadow-slate-200/10 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-pink-600">Featured collection</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Popular deals</h2>
                </div>
                <Link to="/products?filter=discount" className="text-sm font-semibold text-pink-600 transition hover:text-pink-700">View discounts</Link>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
                {loading ? (
                  <div className="col-span-full flex items-center justify-center rounded-[1.75rem] border border-slate-200/70 bg-slate-50 p-10 dark:border-slate-800 dark:bg-slate-900">
                    <LoadingSpinner />
                  </div>
                ) : topProducts.length === 0 ? (
                  <div className="col-span-full rounded-[1.75rem] border border-slate-200/70 bg-slate-50 p-10 text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">No deals found.</div>
                ) : (
                  selectedTopProducts.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)
                )}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-xl shadow-slate-200/10 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm uppercase tracking-[0.35em] text-pink-600">Brands</p>
              <div className="mt-6 grid gap-4">
                {brands.length === 0 ? (
                  <div className="rounded-[1.75rem] border border-slate-200/70 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">Loading brands...</div>
                ) : (
                  brands.slice(0, 6).map((brand) => (
                    <div key={brand.id} className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                      <p className="font-semibold text-slate-950 dark:text-white">{brand.name}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{brand.description || 'Premium brand partner'}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-xl shadow-slate-200/10 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-pink-600">New products</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Latest arrivals</h2>
              </div>
              <Link to="/products?filter=new" className="text-sm font-semibold text-pink-600 transition hover:text-pink-700">See all</Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {loading ? (
                <div className="col-span-full flex items-center justify-center rounded-[1.75rem] border border-slate-200/70 bg-slate-50 p-10 dark:border-slate-800 dark:bg-slate-900">
                  <LoadingSpinner />
                </div>
              ) : newProducts.length === 0 ? (
                <div className="col-span-full rounded-[1.75rem] border border-slate-200/70 bg-slate-50 p-10 text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">No new products available.</div>
                ) : (
                  selectedNewProducts.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)
              )}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-xl shadow-slate-200/10 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-pink-600">Popular products</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Trending picks</h2>
              </div>
              <Link to="/products?filter=gaming" className="text-sm font-semibold text-pink-600 transition hover:text-pink-700">Browse gaming</Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {loading ? (
                <div className="col-span-full flex items-center justify-center rounded-[1.75rem] border border-slate-200/70 bg-slate-50 p-10 dark:border-slate-800 dark:bg-slate-900">
                  <LoadingSpinner />
                </div>
              ) : popularProducts.length === 0 ? (
                <div className="col-span-full rounded-[1.75rem] border border-slate-200/70 bg-slate-50 p-10 text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">No popular products to show.</div>
                ) : (
                  selectedPopularProducts.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Home

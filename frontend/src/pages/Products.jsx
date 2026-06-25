import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import CategoryChips from '../components/CategoryChips.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import productService from '../services/productService.js'

function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const query = useMemo(() => searchParams.get('q') || '', [searchParams])
  const category = useMemo(() => searchParams.get('category') || '', [searchParams])

  useEffect(() => {
    async function loadProducts() {
      setLoading(true)
      try {
        const pageValue = Number(searchParams.get('page') || 1)
        const response = await productService.getProducts({ search: query, category, page: pageValue, limit: 8 })
        setProducts(response.results || response)
        setPage(pageValue)
        setTotalPages(response.total_pages || 1)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    async function loadCategories() {
      try {
        const cats = await productService.getCategories()
        setCategories(cats)
      } catch (error) {
        console.error(error)
      }
    }

    loadCategories()
    loadProducts()
  }, [query, category, searchParams])

  const handleSearch = (event) => {
    event.preventDefault()
    const searchTerm = event.target.search.value.trim()
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev)
      if (searchTerm) params.set('q', searchTerm)
      else params.delete('q')
      params.set('page', '1')
      return params
    })
  }

  const handleCategoryClick = (slug) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev)
      if (slug) params.set('category', slug)
      else params.delete('category')
      params.set('page', '1')
      return params
    })
  }

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Product Catalog</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Browse our premium computers.</h1>
          </div>
          <form onSubmit={handleSearch} className="flex w-full gap-3 sm:max-w-md">
            <input
              name="search"
              defaultValue={query}
              placeholder="Search products..."
              className="w-full rounded-full border border-white/10 bg-black/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-white/20 focus:outline-none"
            />
            <button type="submit" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-slate-100">
              Search
            </button>
          </form>
        </div>
      </section>

      <CategoryChips categories={categories} activeCategory={category} onCategoryClick={handleCategoryClick} />

      <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          <div className="col-span-full flex items-center justify-center rounded-[2rem] border border-white/10 bg-white/5 p-14">
            <LoadingSpinner />
          </div>
        ) : products.length === 0 ? (
          <div className="col-span-full rounded-[2rem] border border-white/10 bg-white/5 p-14 text-center text-slate-300">
            No products found. Try a different search.
          </div>
        ) : (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        )}
      </section>

      <section className="flex flex-col gap-3 rounded-[2rem] border border-white/10 bg-white/5 p-6 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between">
        <p>Page {page} of {totalPages}</p>
        <div className="flex gap-3">
          <Link
            to={`?${new URLSearchParams({ ...Object.fromEntries(searchParams.entries()), page: String(Math.max(page - 1, 1)) }).toString()}`}
            className={`rounded-full border border-white/10 px-4 py-2 transition ${page === 1 ? 'cursor-not-allowed text-slate-500' : 'hover:border-white/20 hover:bg-white/5 text-white'}`}
          >
            Previous
          </Link>
          <Link
            to={`?${new URLSearchParams({ ...Object.fromEntries(searchParams.entries()), page: String(Math.min(page + 1, totalPages)) }).toString()}`}
            className={`rounded-full border border-white/10 px-4 py-2 transition ${page === totalPages ? 'cursor-not-allowed text-slate-500' : 'hover:border-white/20 hover:bg-white/5 text-white'}`}
          >
            Next
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Products

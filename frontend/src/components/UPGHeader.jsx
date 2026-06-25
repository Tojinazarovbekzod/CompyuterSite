import { useState } from 'react'
import { ShoppingCart, Heart, User, Sun, Moon, MapPin, Code2, CreditCard, RefreshCcw } from 'lucide-react'
import { useCurrency } from '../context/CurrencyContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import { useCompare } from '../context/CompareContext.jsx'
import { Link } from 'react-router-dom'

const topNav = [
  { label: 'New Products', href: '/products?filter=new' },
  { label: 'Discounts', href: '/products?filter=discount' },
  { label: 'Brands', href: '/products?filter=brands' },
]

const categoryNav = [
  { label: 'PC Configurator', icon: Code2, href: '/products?category=configurator' },
  { label: 'Buy Computer', icon: CreditCard, href: '/products' },
  { label: 'New Products', icon: RefreshCcw, href: '/products?filter=new' },
]

export default function UPGHeader() {
  const { currency, switchCurrency } = useCurrency()
  const { theme, toggleTheme } = useTheme()
  const { wishlist } = useWishlist()
  const { compareItems } = useCompare()
  const [search, setSearch] = useState('')

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-pink-600 px-4 py-3 text-white shadow-lg shadow-pink-500/10">
              <span className="text-lg font-bold tracking-[0.2em]">UPG</span>
            </div>
            <div className="hidden min-w-[360px] items-center gap-3 rounded-3xl border border-slate-200 bg-slate-100 px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search computers, laptops, components..."
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-500 dark:text-white dark:placeholder:text-slate-400"
              />
              <button className="rounded-2xl bg-pink-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-700">
                Search
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
            <button onClick={switchCurrency} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:border-pink-500 hover:text-pink-600 dark:border-slate-800 dark:bg-slate-900 dark:hover:text-pink-400">
              {currency}
            </button>
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm transition hover:bg-pink-50 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800">
              <MapPin size={18} />
            </button>
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm transition hover:bg-pink-50 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800">
              <Heart size={18} />
              {wishlist.length > 0 && <span className="ml-1 rounded-full bg-pink-600 px-2 py-0.5 text-[10px] text-white">{wishlist.length}</span>}
            </button>
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm transition hover:bg-pink-50 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800">
              <ShoppingCart size={18} />
            </button>
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm transition hover:bg-pink-50 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800">
              <User size={18} />
            </button>
            <button onClick={toggleTheme} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm transition hover:bg-pink-50 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:bg-pink-600">
              <span>Category</span>
            </button>
            {categoryNav.map((item) => (
              <Link key={item.label} to={item.href} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-pink-500 hover:text-pink-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-pink-400">
                <item.icon size={16} />
                {item.label}
              </Link>
            ))}
          </div>

          <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
            {topNav.map((item) => (
              <Link key={item.label} to={item.href} className="rounded-2xl px-4 py-3 transition hover:bg-pink-50 hover:text-pink-600 dark:hover:bg-slate-800">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

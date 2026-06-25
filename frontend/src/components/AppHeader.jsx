import { Link, NavLink } from 'react-router-dom'
import { Heart, ShoppingCart, Moon, SunMedium, Search, User, PackageCheck, ArrowRight, Phone, Grid, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useCurrency } from '../context/CurrencyContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { useCart } from '../context/CartContext.jsx'

function AppHeader() {
  const { isAuthenticated, logout } = useAuth()
  const { currency, switchCurrency } = useCurrency()
  const { theme, toggleTheme } = useTheme()
  const { items } = useCart()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/10 bg-white shadow-sm dark:bg-slate-950 dark:border-slate-800">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-3 text-slate-900 dark:text-white">
            <div className="grid h-12 w-12 place-items-center rounded-3xl border border-pink-600/20 bg-pink-600/10 text-pink-600 shadow-sm shadow-pink-600/10">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">UPG Store</p>
              <p className="text-lg font-semibold">Premium Tech Shop</p>
            </div>
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
            <button onClick={switchCurrency} className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50 px-4 py-2 transition hover:border-pink-500/50 hover:bg-pink-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800">
              <span className="font-semibold">{currency}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={toggleTheme} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-slate-50 transition hover:border-pink-500/60 dark:border-slate-700 dark:bg-slate-900">
              {theme === 'dark' ? <SunMedium className="h-5 w-5 text-pink-500" /> : <Moon className="h-5 w-5 text-slate-900" />}
            </button>
            <a href="tel:+998901234567" className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50 px-4 py-2 transition hover:border-pink-500/50 dark:border-slate-700 dark:bg-slate-900">
              <Phone className="h-4 w-4 text-pink-600" />
              <span>+998 90 123 4567</span>
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[2rem] border border-slate-200/70 bg-slate-100 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex-1 min-w-[220px]">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input type="search" placeholder="Search laptops, GPUs, PCs..." className="w-full rounded-full border border-transparent bg-white/90 py-3 pl-12 pr-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-200 dark:bg-slate-950 dark:text-white dark:focus:border-pink-500 dark:focus:ring-pink-500/20" />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-slate-600 dark:text-slate-300">
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-pink-500/60 hover:bg-pink-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
              <Grid className="h-4 w-4 text-pink-500" /> Categories
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-pink-500/60 hover:bg-pink-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
              <PackageCheck className="h-4 w-4 text-pink-500" /> Configurator
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-pink-500/60 hover:bg-pink-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
              <Heart className="h-4 w-4 text-pink-500" /> Wishlist
            </button>
            <Link to="/cart" className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-pink-500/60 hover:bg-pink-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
              <ShoppingCart className="h-4 w-4 text-pink-500" /> Cart <span className="rounded-full bg-pink-500 px-2 py-0.5 text-xs font-semibold text-white">{items.length}</span>
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
              <User className="h-4 w-4 text-pink-500" />
              {isAuthenticated ? (
                <button onClick={logout} className="font-semibold text-slate-900 dark:text-white">Logout</button>
              ) : (
                <Link to="/login" className="font-semibold text-slate-900 dark:text-white">Sign in</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AppHeader

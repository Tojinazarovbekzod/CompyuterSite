import { Link } from 'react-router-dom'
import { ShoppingBag, User, Home, LayoutGrid, Info, Mail } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

function Navbar() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-white">
          <div className="grid h-11 w-11 place-items-center rounded-3xl bg-white/10 text-white shadow-glow">
            <Home className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Compyuter</p>
            <p className="text-base font-semibold">Black & White Tech</p>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.2em] text-slate-300 lg:gap-6 lg:tracking-[0.25em]">
          <Link to="/products" className="transition hover:text-black">Products</Link>
          <Link to="/about" className="transition hover:text-black">About</Link>
          <Link to="/contact" className="transition hover:text-black">Contact</Link>
        </nav>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <Link to="/cart" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-white/20 hover:bg-white/10">
            <ShoppingBag className="h-4 w-4" /> Cart
          </Link>

          {isAuthenticated ? (
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/profile" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-white/20 hover:bg-white/10">
                <User className="h-4 w-4" /> Profile
              </Link>
              <button onClick={logout} className="rounded-full border border-rose-400/20 bg-rose-400/5 px-4 py-2 text-sm text-rose-200 transition hover:bg-rose-400/10">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-white/20 hover:bg-white/10">
              <User className="h-4 w-4" /> Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar

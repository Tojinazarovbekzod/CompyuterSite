import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import formatCurrency from '../utils/formatCurrency.js'

function Cart() {
  const { items, removeItem, updateQuantity, clearCart } = useCart()
  const navigate = useNavigate()

  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items])

  if (items.length === 0) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-14 text-center text-slate-300">
        <p className="text-xl font-semibold text-white">Your cart is empty.</p>
        <Link to="/products" className="mt-6 inline-flex rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10">
          Shop products
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass">
        <h1 className="text-3xl font-semibold text-white">Shopping Cart</h1>
        <p className="mt-3 text-slate-400">Review your selected products before checkout.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-[2rem] border border-white/10 bg-black/60 p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-[120px_1fr_120px] sm:items-center">
                <img src={item.image} alt={item.name} className="h-28 w-full rounded-3xl object-cover sm:h-32" />
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-400">{item.category.name}</p>
                  <h2 className="mt-3 text-xl font-semibold text-white">{item.name}</h2>
                  <p className="mt-2 text-slate-400">{formatCurrency(item.price)}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-4 py-3">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="text-white/80 hover:text-black"
                    >
                      -
                    </button>
                    <span className="text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-white/80 hover:text-black"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-red-300 transition hover:text-red-100"
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glass sm:p-8">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Summary</p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between text-slate-300">
              <span>Subtotal</span>
              <strong className="text-white">{formatCurrency(total)}</strong>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/60 p-5 text-slate-300">
              <p className="text-sm">Shipping and taxes calculated at checkout.</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="mt-6 w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-slate-100"
          >
            Continue to checkout
          </button>
          <button
            onClick={clearCart}
            className="mt-4 w-full rounded-full border border-white/10 bg-black/60 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/5"
          >
            Clear cart
          </button>
        </aside>
      </div>
    </div>
  )
}

export default Cart

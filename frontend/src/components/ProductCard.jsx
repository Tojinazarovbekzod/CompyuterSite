import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import formatCurrency from '../utils/formatCurrency.js'

function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/10 bg-black/50 shadow-glass transition hover:-translate-y-1 hover:border-white/20">
      <Link to={`/products/${product.id}`} className="block overflow-hidden rounded-t-[2rem]">
        <img src={product.image} alt={product.name} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
      </Link>
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{product.category?.name || 'Computer'}</p>
          <span className="text-sm font-semibold text-white">{formatCurrency(product.price)}</span>
        </div>
        <Link to={`/products/${product.id}`} className="block text-2xl font-semibold text-white transition hover:text-slate-100">
          {product.name}
        </Link>
        <p className="text-sm leading-6 text-slate-300 line-clamp-2">{product.description}</p>
        <button
          onClick={() => addItem({ ...product, quantity: 1 })}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-slate-100"
        >
          <ShoppingCart className="h-4 w-4" /> Add to cart
        </button>
      </div>
    </article>
  )
}

export default ProductCard

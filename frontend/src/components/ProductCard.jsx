import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import formatCurrency from '../utils/formatCurrency.js'

function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/50 shadow-glass transition hover:-translate-y-1 hover:border-white/20 w-[240px]">
      <Link to={`/products/${product.id}`} className="block overflow-hidden rounded-t-[1.5rem]">
        <div className="h-[240px] w-[240px] overflow-hidden bg-slate-900">
          <img src={product.image} alt={product.name} className="h-[240px] w-[240px] object-cover transition duration-500 group-hover:scale-105" />
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <Link to={`/products/${product.id}`} className="block text-base font-semibold text-white transition hover:text-slate-100 line-clamp-2">
          {product.name}
        </Link>
        <div className="flex items-center justify-between gap-2 text-sm text-slate-400">
          <span className="text-xs">{product.category?.name || 'Computer'}</span>
          <span className="text-white font-semibold">{formatCurrency(product.price)}</span>
        </div>
        <button
          onClick={() => addItem({ ...product, quantity: 1 })}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-slate-100"
        >
          <ShoppingCart className="h-4 w-4" /> Add
        </button>
      </div>
    </article>
  )
}

export default ProductCard

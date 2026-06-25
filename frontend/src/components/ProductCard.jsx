import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import formatCurrency from '../utils/formatCurrency.js'

function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/50 shadow-glass transition hover:-translate-y-1 hover:border-white/20 w-[100px]">
      <Link to={`/products/${product.id}`} className="block overflow-hidden rounded-t-[1.5rem]">
        <div className="h-[100px] w-[100px] overflow-hidden bg-slate-900">
          <img src={product.image} alt={product.name} className="h-[100px] w-[100px] object-cover transition duration-500 group-hover:scale-105" />
        </div>
      </Link>
      <div className="space-y-2 p-3">
        <Link to={`/products/${product.id}`} className="block text-sm font-semibold text-white transition hover:text-slate-100 overflow-hidden text-ellipsis whitespace-nowrap">
          {product.name}
        </Link>
        <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
          <span>{product.category?.name || 'Computer'}</span>
          <span className="text-white">{formatCurrency(product.price)}</span>
        </div>
        <button
          onClick={() => addItem({ ...product, quantity: 1 })}
          className="inline-flex w-full items-center justify-center gap-1 rounded-full bg-white px-3 py-2 text-[10px] font-semibold text-black transition hover:bg-slate-100"
        >
          <ShoppingCart className="h-3 w-3" /> Add
        </button>
      </div>
    </article>
  )
}

export default ProductCard

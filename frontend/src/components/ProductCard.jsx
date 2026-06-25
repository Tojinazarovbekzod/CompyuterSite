import { Link } from 'react-router-dom'
import { Heart, ArrowRight, Star, ShoppingCart, Layers } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import { useCompare } from '../context/CompareContext.jsx'
import formatCurrency from '../utils/formatCurrency.js'

function ProductCard({ product }) {
  const { addItem } = useCart()
  const { toggleWishlist, wishlist } = useWishlist()
  const { toggleCompare, compareItems } = useCompare()
  const isWishlist = wishlist.some((item) => item.id === product.id)
  const isCompare = compareItems.some((item) => item.id === product.id)
  const rating = Number(product.rating)

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-lg transition hover:-translate-y-1 hover:border-pink-500/50 dark:border-slate-800 dark:bg-slate-950">
      <Link to={`/products/${product.id}`} className="block overflow-hidden rounded-t-[2rem] bg-slate-100 dark:bg-slate-900">
        <img src={product.image} alt={product.name} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
      </Link>
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.25em] text-pink-600">
          <span>{product.brand?.name || product.category?.name || 'UPG'}</span>
          <span>{product.is_new ? 'New' : product.is_gaming ? 'Gaming' : 'Popular'}</span>
        </div>
        <Link to={`/products/${product.id}`} className="block text-lg font-semibold text-slate-950 transition hover:text-pink-600 dark:text-white">
          {product.name}
        </Link>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
            <Star className="h-4 w-4 text-amber-400" />
            <span>{Number.isFinite(rating) ? rating.toFixed(1) : '4.8'}</span>
          </div>
          <p className="text-lg font-semibold text-slate-950 dark:text-white">{formatCurrency(product.discount_price || product.price)}</p>
        </div>
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold dark:bg-slate-900">{product.category?.name || 'Category'}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold dark:bg-slate-900">{product.stock > 0 ? 'In stock' : 'Sold out'}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => toggleWishlist(product)}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition ${isWishlist ? 'border-pink-500 bg-pink-50 text-pink-600' : 'border-slate-200 bg-white text-slate-700 hover:border-pink-500 hover:text-pink-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'}`}
          >
            <Heart className="h-4 w-4" /> {isWishlist ? 'Saved' : 'Wishlist'}
          </button>
          <button
            onClick={() => toggleCompare(product)}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition ${isCompare ? 'border-pink-500 bg-pink-50 text-pink-600' : 'border-slate-200 bg-white text-slate-700 hover:border-pink-500 hover:text-pink-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'}`}
          >
            <Layers className="h-4 w-4" /> {isCompare ? 'Compared' : 'Compare'}
          </button>
        </div>
        <button
          onClick={() => addItem({ ...product, quantity: 1 })}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-pink-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-pink-700"
        >
          <ShoppingCart className="h-4 w-4" /> Add to cart
        </button>
      </div>
    </article>
  )
}

export default ProductCard

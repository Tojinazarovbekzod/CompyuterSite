import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ShoppingCart, ArrowLeft } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import productService from '../services/productService.js'
import { useCart } from '../context/CartContext.jsx'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await productService.getProduct(id)
        setProduct(data)
      } catch (err) {
        setError('Product not found.')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  const handleAddToCart = () => {
    addItem({ ...product, quantity })
    navigate('/cart')
  }

  const price = Number(product?.price)

  if (loading) {
    return <div className="flex items-center justify-center py-20"><LoadingSpinner /></div>
  }

  if (error || !product) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center text-slate-300">
        <p>{error || 'Unable to load this product.'}</p>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-white/80 transition hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-glass">
          <img src={product.image} alt={product.name} className="h-[520px] w-full object-cover" />
        </div>

        <div className="space-y-8 rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glass">
          <div className="space-y-4">
            <span className="text-sm uppercase tracking-[0.25em] text-slate-400">{product.category?.name || 'Uncategorized'}</span>
            <h1 className="text-4xl font-semibold text-white">{product.name}</h1>
            <p className="text-xl font-semibold text-white">${Number.isFinite(price) ? price.toFixed(2) : '0.00'}</p>
          </div>
          <p className="text-slate-300">{product.description}</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-black/40 px-5 py-4">
              <span className="text-sm text-slate-400">Stock</span>
              <span className="text-sm font-semibold text-white">{product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</span>
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm uppercase tracking-[0.22em] text-slate-400">Qty</label>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, Number(e.target.value))))}
                className="w-24 rounded-3xl border border-white/10 bg-black/70 px-4 py-3 text-white focus:outline-none focus:border-white/30"
              />
            </div>
          </div>
          <button
            disabled={product.stock === 0}
            onClick={handleAddToCart}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingCart className="h-4 w-4" /> Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

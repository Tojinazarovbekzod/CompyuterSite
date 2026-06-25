import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem('compyuterCart')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('compyuterCart', JSON.stringify(items))
  }, [items])

  const addItem = (product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + (product.quantity || 1) } : item)
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }]
    })
  }

  const updateQuantity = (productId, quantity) => {
    setItems((prev) => prev.map((item) => item.id === productId ? { ...item, quantity } : item))
  }

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const clearCart = () => setItems([])

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}

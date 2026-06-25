import { createContext, useContext, useEffect, useState } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem('upg-wishlist')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('upg-wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const toggleWishlist = (product) => {
    setWishlist((current) => {
      const exists = current.some((item) => item.id === product.id)
      return exists ? current.filter((item) => item.id !== product.id) : [...current, product]
    })
  }

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}

import { createContext, useContext, useEffect, useState } from 'react'

const CompareContext = createContext()

export function CompareProvider({ children }) {
  const [compareItems, setCompareItems] = useState(() => {
    const stored = localStorage.getItem('upg-compare')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('upg-compare', JSON.stringify(compareItems))
  }, [compareItems])

  const toggleCompare = (product) => {
    setCompareItems((current) => {
      const exists = current.some((item) => item.id === product.id)
      if (exists) return current.filter((item) => item.id !== product.id)
      if (current.length >= 4) return current
      return [...current, product]
    })
  }

  return (
    <CompareContext.Provider value={{ compareItems, toggleCompare }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  return useContext(CompareContext)
}

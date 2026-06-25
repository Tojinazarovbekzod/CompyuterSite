import { createContext, useContext, useState } from 'react'

const CurrencyContext = createContext()

const EXCHANGE_RATE = 11850

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(() => localStorage.getItem('upg-currency') || 'UZS')

  const switchCurrency = () => {
    const next = currency === 'UZS' ? 'USD' : 'UZS'
    localStorage.setItem('upg-currency', next)
    setCurrency(next)
  }

  const convertPrice = (price) => {
    if (currency === 'UZS') {
      return Math.round(price * EXCHANGE_RATE)
    }
    return Number(price)
  }

  return (
    <CurrencyContext.Provider value={{ currency, switchCurrency, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  return useContext(CurrencyContext)
}

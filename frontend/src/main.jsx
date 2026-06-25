import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { CurrencyProvider } from './context/CurrencyContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { CompareProvider } from './context/CompareContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <CurrencyProvider>
            <WishlistProvider>
              <CompareProvider>
                <CartProvider>
                  <App />
                </CartProvider>
              </CompareProvider>
            </WishlistProvider>
          </CurrencyProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)

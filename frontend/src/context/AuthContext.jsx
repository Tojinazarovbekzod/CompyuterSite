import { createContext, useContext, useEffect, useState } from 'react'
import authService from '../services/authService.js'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('compyuterToken'))
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('compyuterUser')) || null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token && !user) {
      authService.getProfile(token).then((data) => {
        setUser(data)
        localStorage.setItem('compyuterUser', JSON.stringify(data))
      }).catch(() => {
        setToken(null)
        localStorage.removeItem('compyuterToken')
        localStorage.removeItem('compyuterUser')
      })
    }
  }, [token, user])

  const login = async ({ email, password }) => {
    setLoading(true)
    try {
      const data = await authService.login({ email, password })
      setToken(data.access)
      setUser(data.user)
      localStorage.setItem('compyuterToken', data.access)
      localStorage.setItem('compyuterUser', JSON.stringify(data.user))
      return data
    } finally {
      setLoading(false)
    }
  }

  const register = async ({ name, email, password }) => {
    setLoading(true)
    try {
      const data = await authService.register({ name, email, password })
      setToken(data.access)
      setUser(data.user)
      localStorage.setItem('compyuterToken', data.access)
      localStorage.setItem('compyuterUser', JSON.stringify(data.user))
      return data
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('compyuterToken')
    localStorage.removeItem('compyuterUser')
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAuthenticated: Boolean(token) }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

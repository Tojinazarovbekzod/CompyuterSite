import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await login({ username, password })
      navigate('/profile')
    } catch (err) {
      setError(err.message || 'Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glass">
      <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Welcome back</p>
      <h1 className="mt-4 text-3xl font-semibold text-white">Login to your Compyuter account</h1>
      <p className="mt-3 text-slate-300">Access your orders, save favorite builds, and manage your profile.</p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <div>
          <label className="text-sm font-semibold text-slate-200">Username or email</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username or email"
            required
            className="mt-3 w-full rounded-3xl border border-white/10 bg-black/70 px-4 py-3 text-white focus:border-white/20 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-200">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-3 w-full rounded-3xl border border-white/10 bg-black/70 px-4 py-3 text-white focus:border-white/20 focus:outline-none"
          />
        </div>
        {error && <p className="text-sm text-rose-300">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Don’t have an account? <Link to="/register" className="text-white underline">Create one</Link>
      </p>
    </div>
  )
}

export default Login

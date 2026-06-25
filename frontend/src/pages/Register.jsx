import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await register({ name, email, password })
      navigate('/profile')
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glass">
      <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Create account</p>
      <h1 className="mt-4 text-3xl font-semibold text-white">Start your Compyuter journey</h1>
      <p className="mt-3 text-slate-300">Register for access to saved carts, orders, and premium offers.</p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <div>
          <label className="text-sm font-semibold text-slate-200">Full name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-3 w-full rounded-3xl border border-white/10 bg-black/70 px-4 py-3 text-white focus:border-white/20 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-200">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Already have an account? <Link to="/login" className="text-white underline">Sign in</Link>
      </p>
    </div>
  )
}

export default Register

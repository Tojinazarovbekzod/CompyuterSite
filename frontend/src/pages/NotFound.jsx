import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-16 text-center shadow-glass">
      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">404</p>
      <h1 className="mt-4 text-5xl font-semibold text-white">Page not found</h1>
      <p className="mt-4 text-slate-300">The page you’re looking for doesn’t exist or has been moved.</p>
      <Link to="/" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-slate-100">
        Return home
      </Link>
    </div>
  )
}

export default NotFound

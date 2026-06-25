import { useAuth } from '../context/AuthContext.jsx'

function Profile() {
  const { user, logout } = useAuth()

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glass">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Profile</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Welcome back, {user?.name || 'Customer'}</h1>
        <p className="mt-3 text-slate-300">Manage your account, orders, and saved shopping cart.</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-white/10 bg-black/50 p-8 text-slate-300 shadow-glass">
          <h2 className="text-2xl font-semibold text-white">Account details</h2>
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-sm text-slate-400">Full name</p>
              <p className="mt-1 text-lg text-white">{user?.name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Email</p>
              <p className="mt-1 text-lg text-white">{user?.email || 'N/A'}</p>
            </div>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass">
          <h2 className="text-2xl font-semibold text-white">Order history</h2>
          <p className="mt-4 text-slate-300">Your recent orders and checkout history will appear here after purchase.</p>
          <button onClick={logout} className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-slate-100">
            Logout
          </button>
        </div>
      </section>
    </div>
  )
}

export default Profile

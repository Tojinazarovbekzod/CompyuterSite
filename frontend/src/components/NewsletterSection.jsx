function NewsletterSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Stay informed</p>
        <h2 className="mt-4 text-3xl font-semibold text-white">Subscribe for early access and new drops.</h2>
        <p className="mt-4 text-slate-300">Get product launches, exclusive offers, and curated system features delivered to your inbox.</p>
      </div>
      <form className="space-y-4 rounded-[2rem] border border-white/10 bg-black/60 p-8 shadow-glass">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder:text-slate-500 focus:border-white/20 focus:outline-none"
        />
        <button type="submit" className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-slate-100">
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default NewsletterSection

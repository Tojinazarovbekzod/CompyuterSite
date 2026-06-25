function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="space-y-0.5">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white">Compyuter</p>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Startap sayt</p>
        </div>
        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <a href="#features" className="transition hover:text-white">Xizmatlar</a>
          <a href="#catalog" className="transition hover:text-white">Mahsulotlar</a>
          <a href="#contact" className="transition hover:text-white">Kontakt</a>
        </nav>
        <a href="#contact" className="hidden rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10 md:inline-flex">
          Buyurtma
        </a>
      </div>
    </header>
  )
}

export default Header

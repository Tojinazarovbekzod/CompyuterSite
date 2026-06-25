function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="text-lg font-semibold text-white">Compyuter</div>
        <nav className="flex items-center gap-6 text-sm text-slate-300">
          <a href="#features" className="transition hover:text-white">Features</a>
          <a href="#status" className="transition hover:text-white">Status</a>
          <a href="#contact" className="transition hover:text-white">Contact</a>
        </nav>
      </div>
    </header>
  )
}

export default Header

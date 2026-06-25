function Footer() {
  return (
    <footer className="border-t border-slate-200/20 bg-white py-10 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:gap-10 lg:px-8">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-pink-600">UPG Store</p>
          <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Modern electronics shopping experience</h3>
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">Fast shipping, verified products, and exclusive offers for the best desktop, laptop, and accessories lineup.</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-900 dark:text-white">Support</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <li>Contact: support@upgstore.com</li>
            <li>Phone: +998 90 123 4567</li>
            <li>Working hours: Mon-Fri 09:00 - 19:00</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-900 dark:text-white">Quick links</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <li>New Products</li>
            <li>Discounts</li>
            <li>Brands</li>
            <li>PC Configurator</li>
          </ul>
        </div>
      </div>
      <div className="mt-10 border-t border-slate-200/70 pt-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-500">© 2026 UPG Store. Built with React, Tailwind and Django REST Framework.</div>
    </footer>
  )
}

export default Footer

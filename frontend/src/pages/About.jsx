function About() {
  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glass">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">About</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Crafting premium computer shopping experiences.</h1>
        <p className="mt-4 text-slate-300 leading-7">Compyuter is built for startups and brands that want a refined technology storefront. We combine elegant black-and-white aesthetics with powerful product browsing, fast backend APIs, and a smooth user journey.</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-white/10 bg-black/60 p-8 shadow-glass">
          <h2 className="text-2xl font-semibold text-white">Design</h2>
          <p className="mt-4 text-slate-300">Sleek glassmorphism cards, luxury type, and thoughtful spacing set the stage for modern tech selling.</p>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass">
          <h2 className="text-2xl font-semibold text-white">Technology</h2>
          <p className="mt-4 text-slate-300">React, Tailwind CSS, and Django REST Framework power the app with fast interactions and secure APIs.</p>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-black/60 p-8 shadow-glass">
          <h2 className="text-2xl font-semibold text-white">Growth</h2>
          <p className="mt-4 text-slate-300">A scalable foundation for future checkout flows, inventory management, and user loyalty features.</p>
        </div>
      </section>
    </div>
  )
}

export default About

function Contact() {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_0.7fr]">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glass">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Contact</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Get in touch with Compyuter support.</h1>
        <p className="mt-4 text-slate-300 leading-7">Questions about a product, order status, or customization? We’re here to help with fast, premium support.</p>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-black/60 p-10 shadow-glass">
        <div className="space-y-6 text-slate-300">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Email</p>
            <p className="mt-2 text-white">hello@compyuter.store</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Support</p>
            <p className="mt-2 text-white">Mon–Fri, 9am–6pm</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Location</p>
            <p className="mt-2 text-white">Online-first boutique experience</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact

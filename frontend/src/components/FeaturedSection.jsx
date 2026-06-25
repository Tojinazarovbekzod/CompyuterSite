function FeaturedSection() {
  const features = [
    {
      title: 'Artisan Builds',
      description: 'High-end systems sculpted for gaming, creation, and sleek desk presence.',
    },
    {
      title: 'Live Support',
      description: 'Premium customer service for product questions and build customization.',
    },
    {
      title: 'Fast Shipping',
      description: 'Carefully packaged gear with priority preparation and delivery.',
    },
  ]

  return (
    <section className="grid gap-6 lg:grid-cols-3">
      {features.map((feature) => (
        <div key={feature.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass transition hover:-translate-y-1">
          <h3 className="text-2xl font-semibold text-white">{feature.title}</h3>
          <p className="mt-4 text-slate-300">{feature.description}</p>
        </div>
      ))}
    </section>
  )
}

export default FeaturedSection

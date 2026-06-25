function ReviewSection() {
  const reviews = [
    {
      name: 'Mia R.',
      title: 'Studio designer',
      text: 'The Compyuter build was flawless. Beautiful design, fast delivery, and the setup felt premium from unboxing through first boot.',
    },
    {
      name: 'Liam P.',
      title: 'Pro gamer',
      text: 'The custom rig performs beautifully and the minimal UI matches the aesthetic perfectly. This shop feels luxury and reliable.',
    },
    {
      name: 'Noah S.',
      title: 'Creative director',
      text: 'Everything from browsing to checkout was smooth. The vibe is professional and the store experience gave me confidence in the product.',
    },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {reviews.map((review) => (
        <div key={review.name} className="rounded-[2rem] border border-white/10 bg-black/60 p-8 text-slate-300 shadow-glass transition hover:-translate-y-1">
          <p className="leading-7">“{review.text}”</p>
          <div className="mt-6 border-t border-white/10 pt-6">
            <p className="font-semibold text-white">{review.name}</p>
            <p className="text-sm text-slate-400">{review.title}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ReviewSection

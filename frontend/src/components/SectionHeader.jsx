function SectionHeader({ eyebrow, title, description, actionLabel, actionHref }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.35em] text-pink-600">{eyebrow}</p>
        <h2 className="text-3xl font-semibold text-slate-950 dark:text-white sm:text-4xl">{title}</h2>
        {description ? <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">{description}</p> : null}
      </div>
      {actionLabel ? (
        <a href={actionHref} className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-pink-500 hover:bg-pink-50 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
          {actionLabel}
        </a>
      ) : null}
    </div>
  )
}

export default SectionHeader

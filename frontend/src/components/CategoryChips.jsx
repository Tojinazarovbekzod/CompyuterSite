function CategoryChips({ categories = [], activeCategory = '', onCategoryClick }) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => onCategoryClick('')}
        className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${!activeCategory ? 'border-white/20 bg-white/10 text-white' : 'border-white/10 bg-black/60 text-slate-300 hover:border-white/20 hover:bg-white/5'}`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.slug || category.name}
          onClick={() => onCategoryClick(category.slug || category.name)}
          className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${activeCategory === (category.slug || category.name) ? 'border-white/20 bg-white/10 text-white' : 'border-white/10 bg-black/60 text-slate-300 hover:border-white/20 hover:bg-white/5'}`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

export default CategoryChips

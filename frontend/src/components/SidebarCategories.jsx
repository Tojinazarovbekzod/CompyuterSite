import { Cpu, Monitor, Keyboard, MousePointerClick, Gamepad2, Headphones, Speaker, Wifi } from 'lucide-react'

function getCategoryIcon(value = '') {
  const label = value.toLowerCase()

  if (label.includes('game')) return Gamepad2
  if (label.includes('monitor') || label.includes('graphic')) return Monitor
  if (label.includes('keyboard')) return Keyboard
  if (label.includes('mouse')) return MousePointerClick
  if (label.includes('headphone')) return Headphones
  if (label.includes('speaker')) return Speaker
  if (label.includes('router') || label.includes('wifi')) return Wifi
  return Cpu
}

function SidebarCategories({ active, onSelect, categories = [] }) {
  const visibleCategories = categories.length > 0 ? categories : []

  return (
    <aside className="space-y-3 rounded-[2rem] border border-slate-200/70 bg-white p-5 shadow-sm shadow-slate-200/10 dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-4 text-sm uppercase tracking-[0.35em] text-pink-600">Categories</div>
      <div className="grid gap-3">
        {visibleCategories.length === 0 ? (
          <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-500 dark:bg-slate-900 dark:text-slate-400">Loading categories...</div>
        ) : visibleCategories.map((category) => {
          const Icon = getCategoryIcon(category.name || category.slug)
          const isActive = active === category.name
          return (
            <button
              key={category.slug}
              onClick={() => onSelect(category.name)}
              className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-left text-sm transition ${isActive ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/10' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'}`}>
              <Icon className="h-5 w-5" />
              <span className="flex-1">{category.name}</span>
            </button>
          )
        })}
      </div>
    </aside>
  )
}

export default SidebarCategories

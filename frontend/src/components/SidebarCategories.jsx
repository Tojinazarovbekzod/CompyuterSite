import { Cpu, Monitor, Keyboard, MousePointerClick, Gamepad2, Headphones, Speaker, Wifi2 } from 'lucide-react'

const categories = [
  { label: 'Laptops', icon: Cpu },
  { label: 'Gaming PCs', icon: Gamepad2 },
  { label: 'Graphics Cards', icon: Monitor },
  { label: 'Processors', icon: Cpu },
  { label: 'Monitors', icon: Monitor },
  { label: 'Keyboards', icon: Keyboard },
  { label: 'Mouse', icon: MousePointerClick },
  { label: 'Headphones', icon: Headphones },
  { label: 'Speakers', icon: Speaker },
  { label: 'Routers', icon: Wifi2 },
]

function SidebarCategories({ active, onSelect }) {
  return (
    <aside className="space-y-3 rounded-[2rem] border border-slate-200/70 bg-white p-5 shadow-sm shadow-slate-200/10 dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-4 text-sm uppercase tracking-[0.35em] text-pink-600">Categories</div>
      <div className="grid gap-3">
        {categories.map((category) => {
          const Icon = category.icon
          const isActive = active === category.label
          return (
            <button
              key={category.label}
              onClick={() => onSelect(category.label)}
              className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-left text-sm transition ${isActive ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/10' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'}`}>
              <Icon className="h-5 w-5" />
              {category.label}
            </button>
          )
        })}
      </div>
    </aside>
  )
}

export default SidebarCategories

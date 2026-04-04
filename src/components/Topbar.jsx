import { useLocation } from 'react-router-dom'
import { Menu, Search, Bell } from 'lucide-react'

const breadcrumbs = {
  '/dashboard':  'Tableau de bord',
  '/produits':   'Produits',
  '/commandes':  'Commandes',
  '/clients':    'Clients',
  '/stock':      'Stock',
  '/analytics':  'Analytics',
  '/parametres': 'Paramètres',
  '/aide':       'Aide',
}

export default function Topbar({ onToggle }) {
  const { pathname } = useLocation()
  const title = breadcrumbs[pathname] ?? 'inZeek'

  return (
    <header className="h-16 bg-white border-b border-pink-100 flex items-center justify-between px-5 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button onClick={onToggle}
          className="w-9 h-9 rounded-xl hover:bg-pink-50 flex items-center justify-center text-gray-400 hover:text-brand-500 transition">
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-sm font-bold text-gray-900">{title}</h1>
          <p className="text-[11px] text-gray-400 leading-none">inZeek · Dashboard</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="hidden sm:flex items-center gap-2 text-xs text-gray-400 bg-pink-50 border border-pink-100 rounded-xl px-3 py-2 hover:border-pink-200 transition">
          <Search className="w-3.5 h-3.5" />
          Rechercher…
        </button>

        <button className="w-9 h-9 rounded-xl hover:bg-pink-50 flex items-center justify-center text-gray-400 hover:text-brand-500 transition relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full border-2 border-white" />
        </button>

        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer shadow-rose ml-1">
          lo
        </div>
      </div>
    </header>
  )
}

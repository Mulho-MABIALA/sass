import { useLocation } from 'react-router-dom'

const breadcrumbs = {
  '/dashboard': 'Tableau de bord',
  '/produits': 'Produits',
  '/commandes': 'Commandes',
  '/clients': 'Clients',
  '/stock': 'Stock',
  '/analytics': 'Analytics',
  '/parametres': 'Paramètres',
  '/aide': 'Aide',
}

export default function Topbar({ onToggle }) {
  const { pathname } = useLocation()
  const title = breadcrumbs[pathname] ?? 'SaasPanel'

  return (
    <header className="h-16 bg-white border-b border-pink-100 flex items-center justify-between px-5 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button onClick={onToggle}
          className="w-9 h-9 rounded-xl hover:bg-pink-50 flex items-center justify-center text-gray-400 hover:text-brand-500 transition">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        <div>
          <h1 className="text-sm font-bold text-gray-900">{title}</h1>
          <p className="text-[11px] text-gray-400 leading-none">SaasPanel · Dashboard</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <button className="hidden sm:flex items-center gap-2 text-xs text-gray-400 bg-pink-50 border border-pink-100 rounded-xl px-3 py-2 hover:border-pink-200 transition">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          Rechercher…
        </button>

        {/* Notification */}
        <button className="w-9 h-9 rounded-xl hover:bg-pink-50 flex items-center justify-center text-gray-400 hover:text-brand-500 transition relative">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full border-2 border-white"/>
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer shadow-rose ml-1">
          AD
        </div>
      </div>
    </header>
  )
}

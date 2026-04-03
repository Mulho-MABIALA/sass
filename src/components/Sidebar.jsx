import { NavLink } from 'react-router-dom'

const navItems = [
  {
    section: 'Principal',
    links: [
      { to: '/dashboard', label: 'Tableau de bord', icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
          <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
        </svg>
      )},
      { to: '/produits', label: 'Produits', icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/>
        </svg>
      )},
      { to: '/commandes', label: 'Commandes', icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
        </svg>
      )},
      { to: '/clients', label: 'Clients', icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5.196-3.793M9 20H4v-2a4 4 0 015.196-3.793M15 7a4 4 0 11-8 0 4 4 0 018 0zm6 4a3 3 0 11-6 0 3 3 0 016 0zM3 11a3 3 0 116 0 3 3 0 01-6 0z"/>
        </svg>
      )},
    ]
  },
  {
    section: 'Gestion',
    links: [
      { to: '/stock', label: 'Stock', icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
        </svg>
      )},
      { to: '/analytics', label: 'Analytics', icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
        </svg>
      )},
    ]
  }
]

const bottomLinks = [
  { to: '/aide', label: 'Aide', icon: (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="9"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01"/>
    </svg>
  )},
  { to: '/parametres', label: 'Paramètres', icon: (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )},
]

export default function Sidebar({ collapsed }) {
  return (
    <aside
      style={{ background: 'linear-gradient(180deg, #1a0012 0%, #2d0020 100%)' }}
      className={`${collapsed ? 'w-[72px]' : 'w-64'} flex flex-col min-h-screen sticky top-0 z-30 transition-all duration-200`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-5 py-5 border-b border-white/5 ${collapsed ? 'justify-center px-0' : ''}`}>
        <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-rose shrink-0">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        </div>
        {!collapsed && (
          <div>
            <span className="text-base font-extrabold text-white tracking-tight">SaasPanel</span>
            <p className="text-[10px] text-white/30 -mt-0.5">Dashboard Pro</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ section, links }) => (
          <div key={section} className="mb-2">
            {!collapsed && (
              <p className="text-[10px] font-bold text-white/25 uppercase tracking-[0.12em] px-3 mb-1.5 mt-2">{section}</p>
            )}
            {links.map(({ to, label, icon }) => (
              <NavLink key={to} to={to}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center' : ''}`
                }>
                {icon}
                {!collapsed && <span>{label}</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* User profile card */}
      {!collapsed && (
        <div className="mx-3 mb-3 p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
            AD
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white truncate">Admin</p>
            <p className="text-[10px] text-white/30 truncate">admin@saaspanel.io</p>
          </div>
        </div>
      )}

      {/* Bottom links */}
      <div className="px-3 pb-4 border-t border-white/5 pt-3 space-y-0.5">
        {bottomLinks.map(({ to, label, icon }) => (
          <NavLink key={to} to={to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center' : ''}`
            }>
            {icon}
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </div>
    </aside>
  )
}

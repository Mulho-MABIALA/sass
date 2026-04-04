import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Package, ShoppingCart, Users,
  Boxes, BarChart2, Settings, Zap, X
} from 'lucide-react'

const navItems = [
  {
    section: 'Principal',
    links: [
      { to: '/dashboard', label: 'Tableau de bord', icon: <LayoutDashboard className="w-5 h-5 shrink-0" /> },
      { to: '/produits',  label: 'Produits',         icon: <Package        className="w-5 h-5 shrink-0" /> },
      { to: '/commandes', label: 'Commandes',         icon: <ShoppingCart   className="w-5 h-5 shrink-0" /> },
      { to: '/clients',   label: 'Clients',           icon: <Users          className="w-5 h-5 shrink-0" /> },
    ],
  },
  {
    section: 'Gestion',
    links: [
      { to: '/stock',     label: 'Stock',     icon: <Boxes    className="w-5 h-5 shrink-0" /> },
      { to: '/analytics', label: 'Analytics', icon: <BarChart2 className="w-5 h-5 shrink-0" /> },
    ],
  },
]

const bottomLinks = [
  { to: '/parametres', label: 'Paramètres', icon: <Settings className="w-5 h-5 shrink-0" /> },
]

export default function Sidebar({ collapsed, onClose }) {
  return (
    <aside
      style={{ background: 'linear-gradient(180deg, #1a0012 0%, #2d0020 100%)' }}
      className={`${collapsed ? 'w-[72px]' : 'w-64'} flex flex-col h-screen sticky top-0 z-50 transition-all duration-200`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-5 py-5 border-b border-white/5 ${collapsed ? 'justify-center px-0' : ''}`}>
        <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-rose shrink-0">
          <Zap className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="flex-1 flex items-center justify-between">
            <div>
              <span className="text-base font-extrabold text-white tracking-tight">inZeek</span>
              <p className="text-[10px] text-white/30 -mt-0.5">Dashboard Pro</p>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden w-7 h-7 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ section, links }) => (
          <div key={section} className="mb-2">
            {!collapsed && (
              <p className="text-[10px] font-bold text-white/25 uppercase tracking-[0.12em] px-3 mb-1.5 mt-2">
                {section}
              </p>
            )}
            {links.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={onClose}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center' : ''}`
                }
              >
                {icon}
                {!collapsed && <span>{label}</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Profil */}
      {!collapsed && (
        <div className="mx-3 mb-3 p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
            lo
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white truncate">lo</p>
            <p className="text-[10px] text-white/30 truncate">Administrateur</p>
          </div>
        </div>
      )}

      {/* Bas */}
      <div className="px-3 pb-4 border-t border-white/5 pt-3 space-y-0.5">
        {bottomLinks.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center' : ''}`
            }
          >
            {icon}
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </div>
    </aside>
  )
}

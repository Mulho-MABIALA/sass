import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#fff7fa]">

      {/* ── Desktop sidebar (dans le flux normal) ── */}
      <div className={`hidden lg:flex shrink-0 transition-all duration-200 ${collapsed ? 'w-[72px]' : 'w-64'}`}>
        <Sidebar collapsed={collapsed} onClose={() => {}} />
      </div>

      {/* ── Mobile sidebar (drawer fixe) ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div className={`
        fixed inset-y-0 left-0 z-50 lg:hidden
        transition-transform duration-300
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar collapsed={false} onClose={() => setMobileOpen(false)} />
      </div>

      {/* ── Contenu principal ── */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          onToggle={() => {
            if (window.innerWidth < 1024) {
              setMobileOpen(o => !o)
            } else {
              setCollapsed(c => !c)
            }
          }}
        />
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-auto">
          <Outlet />
          <footer className="mt-8 border-t border-gray-100 pt-4 pb-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
            <span>© 2026 <span className="font-semibold text-brand-500">inZeek</span>. Tous droits réservés.</span>
            <div className="flex items-center gap-4">
              <span>v1.0.0</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"/>
                Système opérationnel
              </span>
            </div>
          </footer>
        </main>
      </div>

    </div>
  )
}

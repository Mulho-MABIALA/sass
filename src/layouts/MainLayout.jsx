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
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>

    </div>
  )
}

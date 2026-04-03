import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#fff7fa]">

      {/* Overlay mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar — desktop toujours visible, mobile en drawer */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        transition-transform duration-300
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar
          collapsed={collapsed}
          onClose={() => setMobileOpen(false)}
        />
      </div>

      {/* Contenu principal */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ${collapsed ? 'lg:ml-[72px]' : 'lg:ml-64'}`}>
        <Topbar
          onToggle={() => {
            if (window.innerWidth < 1024) {
              setMobileOpen(o => !o)
            } else {
              setCollapsed(c => !c)
            }
          }}
        />
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

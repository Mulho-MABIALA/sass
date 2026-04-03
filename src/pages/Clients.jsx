import { useState } from 'react'
import Badge from '../components/ui/Badge'
import SlidePanel from '../components/ui/SlidePanel'
import { clients, clientTypeConfig, avatarColors, orders } from '../data/mockData'

export default function Clients() {
  const [search, setSearch] = useState('')
  const [panel, setPanel] = useState(false)
  const [selected, setSelected] = useState(null)

  const openClient = (c) => { setSelected(c); setPanel(true) }

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  const clientOrders = selected ? orders.filter(o => o.client === selected.name) : []

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">Clients</h1>
          <p className="text-sm text-gray-500">{clients.length} clients au total</p>
        </div>
        <button className="btn-primary text-sm">+ Nouveau client</button>
      </div>

      {/* Search */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input className="input-field pl-9 text-sm" placeholder="Rechercher un client…" value={search} onChange={e => setSearch(e.target.value)}/>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(c => {
          const type = clientTypeConfig[c.type]
          const av = avatarColors[c.id % avatarColors.length]
          return (
            <div key={c.id} className="card-hover cursor-pointer" onClick={() => openClient(c)}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 ${av}`}>
                  {c.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{c.name}</p>
                  <p className="text-xs text-gray-400 truncate">{c.email}</p>
                </div>
                <Badge color={type.color}>{type.label}</Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-gray-50 rounded-xl py-2">
                  <p className="text-sm font-bold text-gray-800">{c.orders}</p>
                  <p className="text-[10px] text-gray-400">Commandes</p>
                </div>
                <div className="bg-gray-50 rounded-xl py-2">
                  <p className="text-sm font-bold text-gray-800">{c.spent}</p>
                  <p className="text-[10px] text-gray-400">Dépenses</p>
                </div>
                <div className="bg-gray-50 rounded-xl py-2">
                  <p className="text-sm font-bold text-gray-800">{c.lastOrder}</p>
                  <p className="text-[10px] text-gray-400">Dernier achat</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Panel */}
      <SlidePanel
        open={panel}
        onClose={() => setPanel(false)}
        title={selected?.name}
        subtitle={selected?.email}
        footer={
          <div className="flex gap-2">
            <button onClick={() => setPanel(false)} className="btn-secondary flex-1 text-sm">Fermer</button>
            <button className="btn-primary flex-1 text-sm">Modifier</button>
          </div>
        }
      >
        {selected && (() => {
          const type = clientTypeConfig[selected.type]
          const av = avatarColors[selected.id % avatarColors.length]
          return (
            <div className="space-y-5">
              {/* Avatar + badge */}
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0 ${av}`}>
                  {selected.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{selected.name}</p>
                  <Badge color={type.color}>{type.label}</Badge>
                </div>
              </div>

              {/* Contact info */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Contact</p>
                {[
                  { icon: '✉', label: selected.email },
                  { icon: '📞', label: selected.phone || '+33 6 00 00 00 00' },
                  { icon: '📍', label: selected.address || 'Paris, France' },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-base">{icon}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-brand-50 rounded-xl py-3">
                  <p className="text-base font-extrabold text-brand-600">{selected.orders}</p>
                  <p className="text-[10px] text-gray-400">Commandes</p>
                </div>
                <div className="bg-brand-50 rounded-xl py-3">
                  <p className="text-base font-extrabold text-brand-600">{selected.spent}</p>
                  <p className="text-[10px] text-gray-400">Total dépensé</p>
                </div>
                <div className="bg-brand-50 rounded-xl py-3">
                  <p className="text-base font-extrabold text-brand-600">{selected.lastOrder}</p>
                  <p className="text-[10px] text-gray-400">Dernier achat</p>
                </div>
              </div>

              {/* Recent orders */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Commandes récentes</p>
                {clientOrders.length === 0 ? (
                  <p className="text-sm text-gray-400 italic">Aucune commande trouvée.</p>
                ) : (
                  <div className="space-y-2">
                    {clientOrders.map(o => (
                      <div key={o.id} className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2 text-sm">
                        <div>
                          <p className="font-semibold text-gray-800">{o.id}</p>
                          <p className="text-xs text-gray-400">{o.date}</p>
                        </div>
                        <p className="font-bold text-brand-600">{o.total}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })()}
      </SlidePanel>
    </div>
  )
}

import { useState } from 'react'
import SlidePanel from '../components/ui/SlidePanel'
import { clients, orders, statusConfig } from '../data/mockData'

const TABS = ['Tous', 'VIP', 'Fideles', 'Nouveaux']

const AVATAR_COLORS = [
  'bg-brand-500', 'bg-pink-500', 'bg-emerald-500',
  'bg-orange-500', 'bg-purple-500', 'bg-blue-500',
]

const segmentStyle = {
  vip:     { label: 'VIP',     cls: 'bg-amber-50 text-amber-600 border border-amber-300' },
  fidele:  { label: 'FIDELE',  cls: 'bg-teal-50 text-teal-600 border border-teal-300' },
  nouveau: { label: 'NOUVEAU', cls: 'bg-emerald-50 text-emerald-600 border border-emerald-300' },
}

const formatPrice = (v) => v?.toLocaleString('fr-FR') + ' F'

const relativeDate = (dateStr) => {
  if (!dateStr) return '—'
  const [d, m, y] = dateStr.split('/')
  const date = new Date(`${y}-${m}-${d}`)
  const diffDays = Math.round((new Date() - date) / 86400000)
  if (diffDays === 0) return "A l'instant"
  if (diffDays === 1) return 'Hier'
  if (diffDays < 7) return `Il y a ${diffDays}j`
  return dateStr
}

export default function Clients() {
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState('Tous')
  const [panel, setPanel] = useState(false)
  const [selected, setSelected] = useState(null)

  const openClient = (c) => { setSelected(c); setPanel(true) }

  const filtered = clients.filter(c => {
    const q = search.toLowerCase()
    const matchSearch = !q ||
      c.name.toLowerCase().includes(q) ||
      c.phone?.includes(q) ||
      c.address?.toLowerCase().includes(q)
    const matchTab =
      tab === 'Tous' ? true :
      tab === 'VIP' ? c.type === 'vip' :
      tab === 'Fideles' ? c.type === 'fidele' :
      tab === 'Nouveaux' ? c.type === 'nouveau' : true
    return matchSearch && matchTab
  })

  const revenuTotal = clients.reduce((s, c) => s + (c.total || 0), 0)
  const fideles = clients.filter(c => c.orders >= 2).length
  const panierMoyen = clients.length ? Math.round(clients.reduce((s, c) => s + (c.panier || 0), 0) / clients.length) : 0

  const clientOrders = selected ? orders.filter(o => o.client === selected.name) : []
  const livrees = clientOrders.filter(o => o.status === 'livree').length

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Clients</h1>
        <p className="text-sm text-gray-500">Base de donnees de vos clients</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total clients', value: clients.length,
            icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
            iconBg: 'bg-brand-50 text-brand-500', suffix: '',
          },
          {
            label: 'Revenu total', value: formatPrice(revenuTotal),
            icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
            iconBg: 'bg-amber-50 text-amber-500', suffix: '',
          },
          {
            label: 'Fideles (2+ cmd)', value: fideles,
            icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>,
            iconBg: 'bg-emerald-50 text-emerald-500', suffix: '',
          },
          {
            label: 'Panier moyen', value: formatPrice(panierMoyen),
            icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>,
            iconBg: 'bg-blue-50 text-blue-500', suffix: '',
          },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${s.iconBg}`}>
              {s.icon}
            </div>
            <div>
              <p className="text-xl font-extrabold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search + sort */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder-gray-400"
            placeholder="Rechercher par nom, telephone, adresse..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-gray-700">
          <option>Plus recents</option>
          <option>Plus anciens</option>
          <option>Plus depensiers</option>
        </select>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              tab === t
                ? 'bg-brand-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-sm text-gray-500">{filtered.length} client{filtered.length > 1 ? 's' : ''}</p>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {['CLIENT', 'TELEPHONE', 'SEGMENT', 'COMMANDES', 'TOTAL DEPENSE', 'PANIER MOY.', 'DERNIERE CMD'].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((c, i) => {
              const seg = segmentStyle[c.type]
              const initials = c.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
              const avatarBg = AVATAR_COLORS[i % AVATAR_COLORS.length]
              return (
                <tr key={c.id} className="hover:bg-gray-50 transition cursor-pointer" onClick={() => openClient(c)}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${avatarBg}`}>
                        {initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{c.name}</p>
                        <p className="text-xs text-gray-400">{c.address}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-gray-700">+{c.phone?.replace(/\s/g, '')}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${seg.cls}`}>{seg.label}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand-100 text-brand-700 text-xs font-bold">
                      {c.orders}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-bold text-gray-900">{formatPrice(c.total)}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-gray-600">{formatPrice(c.panier)}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-gray-400">{relativeDate(c.date)}</span>
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-400 text-sm">Aucun client trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Slide Panel */}
      <SlidePanel
        open={panel}
        onClose={() => setPanel(false)}
        title={selected?.name}
        footer={
          <a
            href={`https://wa.me/${selected?.phone?.replace(/\s/g, '')}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition text-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896.002-3.176-1.24-6.165-3.48-8.45zM12.045 21.785h-.004c-1.774 0-3.513-.476-5.031-1.378l-.361-.213-3.741.975.999-3.648-.235-.374a9.86 9.86 0 01-1.521-5.26c.001-5.45 4.436-9.884 9.892-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.452-4.437 9.887-9.879 9.89zm5.441-7.4c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            </svg>
            WhatsApp
          </a>
        }
      >
        {selected && (
          <div className="space-y-6">
            {/* Mini stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-lg font-extrabold text-gray-900">{formatPrice(selected.panier)}</p>
                <p className="text-xs text-gray-400 font-semibold tracking-wide mt-1">PANIER MOYEN</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-lg font-extrabold text-gray-900">{livrees}</p>
                <p className="text-xs text-gray-400 font-semibold tracking-wide mt-1">LIVREES</p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <p className="text-xs font-bold text-gray-500 tracking-widest uppercase">Contact</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Telephone</span>
                  <span className="text-sm font-medium text-gray-800">+{selected.phone?.replace(/\s/g, '')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Adresse</span>
                  <span className="text-sm font-medium text-gray-800">{selected.address}</span>
                </div>
              </div>
            </div>

            <hr className="border-gray-100"/>

            {/* Produits préférés */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <p className="text-xs font-bold text-gray-500 tracking-widest uppercase">Produits preferes</p>
              </div>
              {clientOrders.length === 0 ? (
                <p className="text-sm text-gray-400 italic">Aucun produit</p>
              ) : (
                <div className="space-y-2">
                  {clientOrders.map(o => (
                    <div key={o.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{o.product} x1</span>
                      <span className="text-sm font-bold text-brand-600">{formatPrice(o.amount)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <hr className="border-gray-100"/>

            {/* Historique */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p className="text-xs font-bold text-gray-500 tracking-widest uppercase">
                  Historique ({clientOrders.length} commande{clientOrders.length > 1 ? 's' : ''})
                </p>
              </div>
              {clientOrders.length === 0 ? (
                <p className="text-sm text-gray-400 italic">Aucune commande</p>
              ) : (
                <div className="space-y-4">
                  {clientOrders.map(o => {
                    const s = statusConfig[o.status]
                    const badgeStyle =
                      o.status === 'attente'   ? 'border border-amber-400 text-amber-600 bg-amber-50' :
                      o.status === 'livraison' ? 'border border-blue-400 text-blue-600 bg-blue-50' :
                      o.status === 'livree'    ? 'border border-emerald-400 text-emerald-600 bg-emerald-50' :
                      'border border-gray-300 text-gray-500 bg-gray-50'
                    return (
                      <div key={o.id}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-brand-600">{o.id}</span>
                          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-lg ${badgeStyle}`}>{s?.label}</span>
                        </div>
                        <p className="text-sm text-gray-700">{o.product} x1</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-400">{relativeDate(o.date)}</span>
                          <span className="text-sm font-bold text-gray-900">{formatPrice(o.amount)}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </SlidePanel>
    </div>
  )
}

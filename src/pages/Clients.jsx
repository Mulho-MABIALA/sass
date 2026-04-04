import { useState } from 'react'
import SlidePanel from '../components/ui/SlidePanel'
import { clients, orders, statusConfig } from '../data/mockData'
import { Users, DollarSign, UserCheck, ShoppingBasket, Search, Phone, MapPin, CalendarDays, Clock, MessageCircle } from 'lucide-react'

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
          { label: 'Total clients',   value: clients.length,           icon: <Users          className="w-5 h-5" />, iconBg: 'bg-brand-50 text-brand-500' },
          { label: 'Revenu total',    value: formatPrice(revenuTotal), icon: <DollarSign     className="w-5 h-5" />, iconBg: 'bg-amber-50 text-amber-500' },
          { label: 'Fideles (2+ cmd)',value: fideles,                  icon: <UserCheck      className="w-5 h-5" />, iconBg: 'bg-emerald-50 text-emerald-500' },
          { label: 'Panier moyen',    value: formatPrice(panierMoyen), icon: <ShoppingBasket className="w-5 h-5" />, iconBg: 'bg-blue-50 text-blue-500' },
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
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
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
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full min-w-[750px]">
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
            <MessageCircle className="w-5 h-5" />
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
                <Phone className="w-4 h-4 text-gray-400" />
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
                <CalendarDays className="w-4 h-4 text-gray-400" />
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
                <Clock className="w-4 h-4 text-gray-400" />
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

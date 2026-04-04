import { useState } from 'react'
import SlidePanel from '../components/ui/SlidePanel'
import { orders, statusConfig } from '../data/mockData'
import { ClipboardList, Clock, Truck, CheckCircle, DollarSign, Search, MessageCircle } from 'lucide-react'

const TIME_FILTERS = ['Tout', "Aujourd'hui", 'Cette semaine', 'Ce mois']

const STATUS_TABS = [
  { key: 'toutes',    label: 'Toutes',       statuses: null },
  { key: 'attente',   label: 'En attente',   statuses: ['attente'] },
  { key: 'livraison', label: 'En livraison', statuses: ['livraison'] },
  { key: 'livree',    label: 'Livrees',      statuses: ['livree'] },
  { key: 'annulee',   label: 'Annulees',     statuses: ['annulee'] },
]

const formatPrice = (v) => v?.toLocaleString('fr-FR') + ' F'

const relativeDate = (dateStr) => {
  const today = new Date()
  const [d, m, y] = dateStr.split('/')
  const date = new Date(`${y}-${m}-${d}`)
  const diffDays = Math.round((today - date) / 86400000)
  if (diffDays === 0) return "A l'instant"
  if (diffDays === 1) return 'Hier'
  if (diffDays < 7) return `Il y a ${diffDays}j`
  return dateStr
}

export default function Commandes() {
  const [timeFilter, setTimeFilter] = useState('Tout')
  const [statusTab, setStatusTab] = useState('toutes')
  const [search, setSearch] = useState('')
  const [panel, setPanel] = useState(false)
  const [selected, setSelected] = useState(null)

  const openOrder = (order) => { setSelected(order); setPanel(true) }

  const filtered = orders.filter(o => {
    const tab = STATUS_TABS.find(t => t.key === statusTab)
    const matchStatus = !tab?.statuses || tab.statuses.includes(o.status)
    const q = search.toLowerCase()
    const matchSearch = !q || o.client.toLowerCase().includes(q) || o.phone?.includes(q) || o.id.toLowerCase().includes(q)
    return matchStatus && matchSearch
  })

  const count = (statuses) => statuses ? orders.filter(o => statuses.includes(o.status)).length : orders.length
  const revenu = orders.filter(o => o.status === 'livree').reduce((s, o) => s + o.amount, 0)

  return (
    <div className="space-y-5 pb-20">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total',       value: orders.length,        icon: <ClipboardList className="w-5 h-5" />, iconBg: 'bg-brand-50 text-brand-500' },
          { label: 'En attente',  value: count(['attente']),   icon: <Clock         className="w-5 h-5" />, iconBg: 'bg-amber-50 text-amber-500' },
          { label: 'En livraison',value: count(['livraison']), icon: <Truck         className="w-5 h-5" />, iconBg: 'bg-blue-50 text-blue-500' },
          { label: 'Livrees',     value: count(['livree']),    icon: <CheckCircle   className="w-5 h-5" />, iconBg: 'bg-emerald-50 text-emerald-500' },
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

      {/* Revenu card */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-center gap-4 w-full sm:max-w-xs shadow-sm">
        <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
          <DollarSign className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xl font-extrabold text-gray-900">{formatPrice(revenu || orders.reduce((s, o) => s + o.amount, 0))}</p>
          <p className="text-xs text-amber-600 font-medium mt-0.5">Revenu (FCFA)</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder-gray-400"
          placeholder="Rechercher par nom, telephone, numero..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Time filter pills */}
      <div className="flex gap-2 flex-wrap">
        {TIME_FILTERS.map(t => (
          <button
            key={t}
            onClick={() => setTimeFilter(t)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              timeFilter === t
                ? 'bg-brand-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Status underline tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-0 overflow-x-auto">
          {STATUS_TABS.map(t => {
            const c = count(t.statuses)
            const active = statusTab === t.key
            return (
              <button
                key={t.key}
                onClick={() => setStatusTab(t.key)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition ${
                  active
                    ? 'border-brand-600 text-brand-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {t.label} ({c})
              </button>
            )
          })}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-100">
              {['COMMANDE', 'CLIENT', 'PRODUIT', 'TOTAL', 'PAIEMENT', 'STATUT', 'DATE'].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(order => {
              const s = statusConfig[order.status]
              const badgeStyle =
                order.status === 'attente'   ? 'border border-amber-400 text-amber-600 bg-amber-50' :
                order.status === 'livraison' ? 'border border-blue-400 text-blue-600 bg-blue-50' :
                order.status === 'livree'    ? 'border border-emerald-400 text-emerald-600 bg-emerald-50' :
                'border border-gray-300 text-gray-500 bg-gray-50'
              return (
                <tr key={order.id} className="hover:bg-gray-50 transition cursor-pointer" onClick={() => openOrder(order)}>
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-brand-600">{order.id}</span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-800">{order.client}</p>
                    {order.phone && <p className="text-xs text-gray-400 mt-0.5">+{order.phone.replace(/\s/g, '')}</p>}
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-gray-800">{order.product}</p>
                    <p className="text-xs text-gray-400 mt-0.5">x1 · {formatPrice(order.amount)}/u</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-bold text-gray-900">{formatPrice(order.amount)}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-gray-600">Paiement a la livraison</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-lg ${badgeStyle}`}>
                      {s?.label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-gray-400">{relativeDate(order.date)}</span>
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-400 text-sm">Aucune commande trouvée</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Floating WhatsApp button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center transition z-50">
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Slide panel */}
      <SlidePanel
        open={panel}
        onClose={() => setPanel(false)}
        title={`Commande ${selected?.id}`}
        subtitle={`${selected?.client} — ${selected?.date}`}
        footer={
          <button onClick={() => setPanel(false)} className="btn-secondary w-full text-sm">Fermer</button>
        }
      >
        {selected && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-0.5">Client</p>
                <p className="font-semibold text-gray-800">{selected.client}</p>
                {selected.phone && <p className="text-xs text-gray-500">+{selected.phone.replace(/\s/g, '')}</p>}
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-0.5">Total</p>
                <p className="font-semibold text-brand-600">{formatPrice(selected.amount)}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-0.5">Produit</p>
                <p className="font-semibold text-gray-800">{selected.product}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-0.5">Statut</p>
                <p className="font-semibold text-gray-800">{statusConfig[selected.status]?.label}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800 mb-2">Changer le statut</p>
              <div className="grid grid-cols-2 gap-2">
                {['attente', 'livraison', 'livree', 'annulee'].map(s => (
                  <button key={s}
                    className={`text-xs font-semibold py-2 px-3 rounded-xl border transition ${
                      selected.status === s
                        ? 'border-brand-500 bg-brand-50 text-brand-700'
                        : 'border-gray-200 text-gray-600 hover:border-brand-400 hover:bg-brand-50'
                    }`}>
                    {statusConfig[s]?.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Note interne</label>
              <textarea className="input-field text-sm resize-none" rows={3} placeholder="Ajouter une note…"/>
            </div>

            <button className="btn-primary w-full text-sm">Enregistrer les modifications</button>
          </div>
        )}
      </SlidePanel>
    </div>
  )
}

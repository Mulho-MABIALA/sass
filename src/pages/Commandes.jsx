import { useState } from 'react'
import Badge from '../components/ui/Badge'
import SlidePanel from '../components/ui/SlidePanel'
import { orders, statusConfig } from '../data/mockData'

const periods = ['Aujourd\'hui', 'Cette semaine', 'Ce mois', '3 mois', 'Cette année']
const tabs = ['Tous', 'En attente', 'Confirmé', 'Expédié', 'Livré', 'Annulé']

const kpis = [
  { label: 'Total commandes', value: '348', color: 'text-blue-600 bg-blue-50' },
  { label: 'En attente', value: '24', color: 'text-amber-600 bg-amber-50' },
  { label: 'Expédiées', value: '89', color: 'text-brand-600 bg-brand-50' },
  { label: 'Livrées', value: '201', color: 'text-emerald-600 bg-emerald-50' },
  { label: 'Revenu total', value: '24 380 FCFA', color: 'text-amber-700 bg-amber-100', highlight: true },
]

export default function Commandes() {
  const [period, setPeriod] = useState('Ce mois')
  const [tab, setTab] = useState('Tous')
  const [panel, setPanel] = useState(false)
  const [selected, setSelected] = useState(null)
  const [note, setNote] = useState('')

  const openOrder = (order) => {
    setSelected(order)
    setNote('')
    setPanel(true)
  }

  const filtered = tab === 'Tous' ? orders : orders.filter(o => statusConfig[o.status]?.label === tab)

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">Commandes</h1>
          <p className="text-sm text-gray-500">{orders.length} commandes au total</p>
        </div>
        <button className="btn-secondary text-sm gap-2 flex items-center">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          Exporter
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
        {kpis.map(k => (
          <div key={k.label} className={`card ${k.highlight ? 'border-amber-200 ring-1 ring-amber-200' : ''}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${k.color}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
              </svg>
            </div>
            <p className="text-lg font-extrabold text-gray-900">{k.value}</p>
            <p className="text-xs text-gray-500">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Period pills */}
      <div className="flex gap-2 flex-wrap">
        {periods.map(p => (
          <button key={p} onClick={() => setPeriod(p)}
            className={`period-btn ${period === p ? 'active' : ''}`}>{p}</button>
        ))}
      </div>

      {/* Status tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`tab-btn ${tab === t ? 'active' : ''}`}>{t}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {['Commande', 'Client', 'Produit', 'Date', 'Total', 'Statut', ''].map(h => (
                <th key={h} className="text-left text-xs font-medium text-gray-400 pb-3 pr-4 last:pr-0">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(order => {
              const s = statusConfig[order.status]
              return (
                <tr key={order.id} className="hover:bg-gray-50 transition cursor-pointer" onClick={() => openOrder(order)}>
                  <td className="py-3 pr-4 font-semibold text-gray-800">{order.id}</td>
                  <td className="py-3 pr-4 text-gray-700">{order.client}</td>
                  <td className="py-3 pr-4 text-gray-500">{order.product}</td>
                  <td className="py-3 pr-4 text-gray-400 text-xs">{order.date}</td>
                  <td className="py-3 pr-4 font-semibold text-gray-800">{order.total}</td>
                  <td className="py-3 pr-4"><Badge color={s.color}>{s.label}</Badge></td>
                  <td className="py-3 text-right">
                    <button className="text-gray-400 hover:text-brand-600 transition">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

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
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-0.5">Total</p>
                <p className="font-semibold text-brand-600">{selected.total}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-0.5">Produit</p>
                <p className="font-semibold text-gray-800">{selected.product}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-0.5">Statut actuel</p>
                <Badge color={statusConfig[selected.status].color}>{statusConfig[selected.status].label}</Badge>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800 mb-2">Changer le statut</p>
              <div className="grid grid-cols-2 gap-2">
                {['pending', 'confirmed', 'shipped', 'delivered'].map(s => {
                  const cfg = statusConfig[s]
                  return (
                    <button key={s}
                      className={`text-xs font-semibold py-2 px-3 rounded-xl border transition ${selected.status === s ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200 text-gray-600 hover:border-brand-400 hover:bg-brand-50'}`}>
                      {cfg.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Note interne</label>
              <textarea className="input-field text-sm resize-none" rows={3} placeholder="Ajouter une note…" value={note} onChange={e => setNote(e.target.value)}/>
            </div>

            <button className="btn-primary w-full text-sm">Enregistrer les modifications</button>
          </div>
        )}
      </SlidePanel>
    </div>
  )
}

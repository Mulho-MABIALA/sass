import { useState } from 'react'
import Badge from '../components/ui/Badge'
import Modal from '../components/ui/Modal'
import { products, stockMovements, suppliers } from '../data/mockData'

const views = ['Vue d\'ensemble', 'Historique']
const moveTypes = ['Entrée', 'Sortie', 'Ajustement']

export default function Stock() {
  const [view, setView] = useState('Vue d\'ensemble')
  const [supplierModal, setSupplierModal] = useState(false)
  const [moveModal, setMoveModal] = useState(false)
  const [moveType, setMoveType] = useState('Entrée')

  const getStockColor = (qty) => {
    if (qty >= 20) return 'bg-emerald-500'
    if (qty >= 10) return 'bg-amber-400'
    return 'bg-red-500'
  }
  const getStockBadge = (qty) => {
    if (qty >= 20) return { color: 'green', label: 'Normal' }
    if (qty >= 10) return { color: 'amber', label: 'Faible' }
    return { color: 'red', label: 'Critique' }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">Stock</h1>
          <p className="text-sm text-gray-500">Gestion des inventaires</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setSupplierModal(true)} className="btn-secondary text-sm">Fournisseurs</button>
          <button onClick={() => setMoveModal(true)} className="btn-primary text-sm">+ Mouvement</button>
        </div>
      </div>

      {/* View toggle */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {views.map(v => (
          <button key={v} onClick={() => setView(v)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${view === v ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
            {v}
          </button>
        ))}
      </div>

      {view === 'Vue d\'ensemble' ? (
        <div className="space-y-3">
          {products.map(p => {
            const pct = Math.min(100, Math.round((p.stock / 50) * 100))
            const badge = getStockBadge(p.stock)
            return (
              <div key={p.id} className="card">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.category}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-extrabold text-gray-800">{p.stock}</span>
                    <Badge color={badge.color}>{badge.label}</Badge>
                  </div>
                </div>
                <div className="stock-bar">
                  <div className={`stock-fill ${getStockColor(p.stock)}`} style={{ width: `${pct}%` }}/>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0</span>
                  <span>Max : 50 unités</span>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Date', 'Produit', 'Type', 'Quantité', 'Motif', 'Par'].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-gray-400 pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stockMovements.map((m, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="py-3 pr-4 text-gray-400 text-xs">{m.date}</td>
                  <td className="py-3 pr-4 font-medium text-gray-800">{m.product}</td>
                  <td className="py-3 pr-4">
                    <Badge color={m.type === 'Entrée' ? 'green' : m.type === 'Sortie' ? 'red' : 'blue'}>{m.type}</Badge>
                  </td>
                  <td className="py-3 pr-4 font-semibold text-gray-800">
                    <span className={m.type === 'Entrée' ? 'text-emerald-600' : 'text-red-500'}>
                      {m.type === 'Entrée' ? '+' : '-'}{m.qty}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-gray-500">{m.reason}</td>
                  <td className="py-3 text-gray-400 text-xs">{m.by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Suppliers modal */}
      <Modal open={supplierModal} onClose={() => setSupplierModal(false)} title="Fournisseurs">
        <div className="space-y-4">
          <div className="space-y-2">
            {suppliers.map(s => (
              <div key={s.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{s.name}</p>
                  <p className="text-xs text-gray-400">{s.email}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs text-brand-600 font-medium hover:underline">Modifier</button>
                  <button className="text-xs text-red-400 font-medium hover:underline">Suppr.</button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm font-semibold text-gray-800 mb-3">Ajouter un fournisseur</p>
            <div className="space-y-2">
              <input className="input-field text-sm" placeholder="Nom du fournisseur"/>
              <input className="input-field text-sm" placeholder="Email"/>
              <input className="input-field text-sm" placeholder="Téléphone"/>
              <button className="btn-primary w-full text-sm">Ajouter</button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Movement modal */}
      <Modal open={moveModal} onClose={() => setMoveModal(false)} title="Enregistrer un mouvement">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type de mouvement</label>
            <div className="flex gap-2">
              {moveTypes.map(t => (
                <button key={t} onClick={() => setMoveType(t)}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition ${moveType === t ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200 text-gray-600 hover:border-brand-300'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Produit</label>
            <select className="input-field text-sm">
              <option value="">Sélectionner…</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantité</label>
            <input type="number" className="input-field text-sm" placeholder="0" min="1"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Motif</label>
            <input className="input-field text-sm" placeholder="ex. Réception fournisseur…"/>
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={() => setMoveModal(false)} className="btn-secondary flex-1 text-sm">Annuler</button>
            <button onClick={() => setMoveModal(false)} className="btn-primary flex-1 text-sm">Enregistrer</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

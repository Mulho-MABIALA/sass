import { useState } from 'react'
import Modal from '../components/ui/Modal'
import { products, stockMovements, suppliers, categories } from '../data/mockData'

const STOCK_TABS = ['Tous', 'En stock', 'Stock faible', 'Rupture']

const formatPrice = (v) => v?.toLocaleString('fr-FR') + ' F'

export default function Stock() {
  const [view, setView] = useState('overview')
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('')
  const [stockTab, setStockTab] = useState('Tous')
  const [supplierModal, setSupplierModal] = useState(false)
  const [moveModal, setMoveModal] = useState(false)
  const [moveType, setMoveType] = useState('entree')

  const filtered = products.filter(p => {
    const q = search.toLowerCase()
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    const matchCat = !catFilter || p.category === catFilter
    const matchTab =
      stockTab === 'Tous' ? true :
      stockTab === 'En stock' ? p.stock > 5 :
      stockTab === 'Stock faible' ? p.stock > 0 && p.stock <= 5 :
      stockTab === 'Rupture' ? p.stock === 0 : true
    return matchSearch && matchCat && matchTab
  })

  const totalProduits = products.filter(p => p.stock > 0).length
  const valeurStock = products.reduce((s, p) => s + p.price * p.stock, 0)
  const stockFaible = products.filter(p => p.stock > 0 && p.stock <= 5).length
  const ruptures = products.filter(p => p.stock === 0).length

  const niveauStyle = (stock) => {
    if (stock > 10) return 'bg-emerald-100 text-emerald-700'
    if (stock > 0) return 'bg-amber-100 text-amber-700'
    return 'bg-red-100 text-red-600'
  }
  const barColor = (stock) => {
    if (stock > 10) return 'bg-emerald-400'
    if (stock > 0) return 'bg-amber-400'
    return 'bg-red-400'
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Gestion du stock</h1>
          <p className="text-sm text-gray-500">Suivez et gerez vos niveaux de stock</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSupplierModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition bg-white"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Fournisseurs
          </button>
          <button
            onClick={() => setMoveModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold transition"
          >
            <span className="text-lg leading-none">+</span> Mouvement de stock
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Produits en stock', value: totalProduits,
            icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>,
            iconBg: 'bg-brand-50 text-brand-500',
          },
          {
            label: 'Valeur du stock', value: formatPrice(valeurStock),
            icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
            iconBg: 'bg-amber-50 text-amber-500',
          },
          {
            label: 'Stock faible', value: stockFaible,
            icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>,
            iconBg: 'bg-orange-50 text-orange-500',
          },
          {
            label: 'Ruptures', value: ruptures,
            icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
            iconBg: 'bg-red-50 text-red-500',
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

      {/* View toggle — full-width segmented */}
      <div className="grid grid-cols-2 gap-0 bg-gray-100 rounded-xl p-1">
        <button
          onClick={() => setView('overview')}
          className={`py-2.5 rounded-lg text-sm font-semibold transition ${view === 'overview' ? 'bg-brand-600 text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Vue d'ensemble
        </button>
        <button
          onClick={() => setView('history')}
          className={`py-2.5 rounded-lg text-sm font-semibold transition ${view === 'history' ? 'bg-brand-600 text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Historique mouvements
        </button>
      </div>

      {view === 'overview' ? (
        <>
          {/* Search + category */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder-gray-400"
                placeholder="Rechercher un produit..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-gray-700"
              value={catFilter}
              onChange={e => setCatFilter(e.target.value)}
            >
              <option value="">Toutes categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Stock filter tabs */}
          <div className="flex gap-2 flex-wrap">
            {STOCK_TABS.map(t => (
              <button
                key={t}
                onClick={() => setStockTab(t)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                  stockTab === t
                    ? 'bg-brand-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {['PRODUIT', 'CATEGORIE', 'PRIX', 'STOCK', 'NIVEAU', 'VALEUR', 'ACTIONS'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(p => {
                  const pct = Math.min(100, Math.round((p.stock / (p.maxStock || 50)) * 100))
                  const valeur = p.price * p.stock
                  return (
                    <tr key={p.id} className="hover:bg-gray-50 transition">
                      <td className="px-5 py-4">
                        <span className="text-sm font-semibold text-gray-900">{p.name}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-gray-600">{p.category.toLowerCase()}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-gray-700">{formatPrice(p.price)}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-800 w-6">{p.stock}</span>
                          <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${barColor(p.stock)}`} style={{ width: `${pct}%` }}/>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center justify-center w-10 h-7 rounded-full text-xs font-bold ${niveauStyle(p.stock)}`}>
                          {p.stock}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm font-bold text-gray-900">{formatPrice(valeur)}</span>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => setMoveModal(true)}
                          className="px-4 py-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-lg transition"
                        >
                          Ajuster
                        </button>
                      </td>
                    </tr>
                  )
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-400 text-sm">Aucun produit trouvé</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* Historique mouvements */
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {['DATE', 'PRODUIT', 'TYPE', 'QUANTITE', 'FOURNISSEUR'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stockMovements.map((m, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-4 text-xs text-gray-400">{m.date}</td>
                  <td className="px-5 py-4 text-sm font-medium text-gray-800">{m.product}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      m.type === 'entree' ? 'bg-emerald-50 text-emerald-700' :
                      m.type === 'sortie' ? 'bg-red-50 text-red-600' :
                      'bg-blue-50 text-blue-600'
                    }`}>
                      {m.type === 'entree' ? 'Entrée' : m.type === 'sortie' ? 'Sortie' : 'Ajustement'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-sm font-bold ${m.qty > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                      {m.qty > 0 ? '+' : ''}{m.qty}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">{m.supplier}</td>
                </tr>
              ))}
              {stockMovements.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400 text-sm">Aucun mouvement</td>
                </tr>
              )}
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
          <div className="border-t border-gray-100 pt-4 space-y-2">
            <p className="text-sm font-semibold text-gray-800">Ajouter un fournisseur</p>
            <input className="input-field text-sm" placeholder="Nom du fournisseur"/>
            <input className="input-field text-sm" placeholder="Email"/>
            <input className="input-field text-sm" placeholder="Téléphone"/>
            <button className="btn-primary w-full text-sm">Ajouter</button>
          </div>
        </div>
      </Modal>

      {/* Movement modal */}
      <Modal open={moveModal} onClose={() => setMoveModal(false)} title="Mouvement de stock">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type de mouvement</label>
            <div className="flex gap-2">
              {[{ k: 'entree', l: 'Entrée' }, { k: 'sortie', l: 'Sortie' }, { k: 'ajustement', l: 'Ajustement' }].map(t => (
                <button key={t.k} onClick={() => setMoveType(t.k)}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition ${moveType === t.k ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200 text-gray-600 hover:border-brand-300'}`}>
                  {t.l}
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

import { useState } from 'react'
import Badge from '../components/ui/Badge'
import SlidePanel from '../components/ui/SlidePanel'
import Modal from '../components/ui/Modal'
import Toggle from '../components/ui/Toggle'
import { products, categories } from '../data/mockData'

export default function Produits() {
  const [search, setSearch] = useState('')
  const [panel, setPanel] = useState(false)
  const [catModal, setCatModal] = useState(false)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ name: '', price: '', category: '', stock: '', description: '', imageUrl: '', popular: false, recommended: false, active: true })

  const openNew = () => {
    setSelected(null)
    setForm({ name: '', price: '', category: '', stock: '', description: '', imageUrl: '', popular: false, recommended: false, active: true })
    setPanel(true)
  }

  const openEdit = (p) => {
    setSelected(p)
    setForm({ name: p.name, price: p.price, category: p.category, stock: p.stock, description: p.description || '', imageUrl: '', popular: p.popular, recommended: p.recommended, active: p.active })
    setPanel(true)
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">Produits</h1>
          <p className="text-sm text-gray-500">{products.length} produits au total</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setCatModal(true)} className="btn-secondary text-sm">Catégories</button>
          <button onClick={openNew} className="btn-primary text-sm">+ Nouveau produit</button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input className="input-field pl-9 text-sm" placeholder="Rechercher un produit…" value={search} onChange={e => setSearch(e.target.value)}/>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(p => (
          <div key={p.id} className="card-hover group relative">
            <div className="h-36 bg-gradient-to-br from-brand-50 to-purple-100 rounded-xl mb-3 flex items-center justify-center">
              <svg className="w-12 h-12 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/>
              </svg>
            </div>
            {/* Hover actions */}
            <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
              <button onClick={() => openEdit(p)} className="bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-50">Modifier</button>
              <button className="bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-600">Supprimer</button>
            </div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <p className="font-semibold text-gray-900 text-sm leading-tight">{p.name}</p>
              {!p.active && <Badge color="gray">Inactif</Badge>}
            </div>
            <p className="text-xs text-gray-400 mb-2">{p.category}</p>
            <div className="flex items-center justify-between">
              <span className="text-base font-extrabold text-brand-600">{p.price}</span>
              <span className="text-xs text-gray-400">{p.stock} en stock</span>
            </div>
            <div className="flex gap-1 mt-2 flex-wrap">
              {p.popular && <Badge color="purple">Populaire</Badge>}
              {p.recommended && <Badge color="teal">Recommandé</Badge>}
            </div>
          </div>
        ))}
      </div>

      {/* Slide panel — new / edit */}
      <SlidePanel
        open={panel}
        onClose={() => setPanel(false)}
        title={selected ? 'Modifier le produit' : 'Nouveau produit'}
        subtitle={selected ? selected.name : 'Remplissez les informations du produit'}
        footer={
          <div className="flex gap-2">
            <button onClick={() => setPanel(false)} className="btn-secondary flex-1 text-sm">Annuler</button>
            <button onClick={() => setPanel(false)} className="btn-primary flex-1 text-sm">
              {selected ? 'Enregistrer' : 'Créer le produit'}
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom du produit</label>
            <input className="input-field text-sm" placeholder="ex. Pack Premium" value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prix</label>
              <input className="input-field text-sm" placeholder="0.00 €" value={form.price} onChange={e => setForm({...form, price: e.target.value})}/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <input className="input-field text-sm" type="number" placeholder="0" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})}/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <select className="input-field text-sm" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
              <option value="">Sélectionner…</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea className="input-field text-sm resize-none" rows={3} placeholder="Description du produit…" value={form.description} onChange={e => setForm({...form, description: e.target.value})}/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL de l'image</label>
            <input className="input-field text-sm" placeholder="https://…" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})}/>
          </div>

          <div className="space-y-3 pt-1">
            {[
              { key: 'popular', label: 'Populaire', desc: 'Afficher dans les mises en avant' },
              { key: 'recommended', label: 'Recommandé', desc: 'Badge recommandé sur la fiche' },
              { key: 'active', label: 'Actif', desc: 'Visible dans le catalogue' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400">{desc}</p>
                </div>
                <Toggle defaultChecked={form[key]} onChange={v => setForm({...form, [key]: v})}/>
              </div>
            ))}
          </div>
        </div>
      </SlidePanel>

      {/* Category modal */}
      <Modal open={catModal} onClose={() => setCatModal(false)} title="Gérer les catégories">
        <div className="space-y-3">
          <div className="flex gap-2">
            <input className="input-field text-sm flex-1" placeholder="Nouvelle catégorie…"/>
            <button className="btn-primary text-sm px-4">Ajouter</button>
          </div>
          <div className="space-y-1">
            {categories.map(c => (
              <div key={c} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50">
                <span className="text-sm text-gray-700">{c}</span>
                <button className="text-red-400 hover:text-red-600 text-xs">Supprimer</button>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  )
}

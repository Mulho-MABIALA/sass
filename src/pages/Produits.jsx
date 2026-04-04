import { useState } from 'react'
import Badge from '../components/ui/Badge'
import SlidePanel from '../components/ui/SlidePanel'
import Modal from '../components/ui/Modal'
import Toggle from '../components/ui/Toggle'
import { products, categories } from '../data/mockData'
import { Search, LayoutList, Plus, Package, Link, Eye, Pencil, Trash2 } from 'lucide-react'

const formatPrice = (v) => v?.toLocaleString('fr-FR') + ' F'

const TABS = [
  { key: 'tous', label: 'Tous' },
  { key: 'actif', label: 'Actifs' },
  { key: 'inactif', label: 'Inactifs' },
  { key: 'popular', label: 'Populaires' },
  { key: 'stock_faible', label: 'Stock faible' },
  { key: 'promo', label: 'En promo' },
]

export default function Produits() {
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState('tous')
  const [catFilter, setCatFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [panel, setPanel] = useState(false)
  const [catModal, setCatModal] = useState(false)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({
    name: '', price: '', promoPrice: '', category: '', stock: '',
    description: '', imageUrl: '', popular: false, recommended: false, active: true,
  })

  const openNew = () => {
    setSelected(null)
    setForm({ name: '', price: '', promoPrice: '', category: '', stock: '', description: '', imageUrl: '', popular: false, recommended: false, active: true })
    setPanel(true)
  }

  const openEdit = (p) => {
    setSelected(p)
    setForm({
      name: p.name, price: p.price, promoPrice: p.promoPrice || '',
      category: p.category, stock: p.stock, description: p.description || '',
      imageUrl: '', popular: p.popular, recommended: p.recommended, active: p.status === 'actif',
    })
    setPanel(true)
  }

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
    const matchCat = !catFilter || p.category === catFilter
    const matchStatus = !statusFilter || p.status === statusFilter
    const matchTab =
      tab === 'tous' ? true :
      tab === 'actif' ? p.status === 'actif' :
      tab === 'inactif' ? p.status === 'inactif' :
      tab === 'popular' ? p.popular :
      tab === 'stock_faible' ? p.stock < 5 :
      tab === 'promo' ? !!p.promoPrice : true
    return matchSearch && matchCat && matchStatus && matchTab
  })

  const totalActifs = products.filter(p => p.status === 'actif').length
  const stockFaible = products.filter(p => p.stock < 5).length
  const valeurStock = products.reduce((acc, p) => acc + (p.price * p.stock), 0)

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Produits</h1>
          <p className="text-sm text-gray-500">Gerez votre catalogue de produits</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCatModal(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition bg-white"
          >
            <LayoutList className="w-4 h-4" />
            Categories
          </button>
          <button
            onClick={openNew}
            className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold transition"
          >
            <span className="text-lg leading-none">+</span> Ajouter un produit
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'TOTAL PRODUITS', value: products.length },
          { label: 'ACTIFS', value: totalActifs },
          { label: 'STOCK FAIBLE', value: stockFaible },
          { label: 'VALEUR STOCK', value: formatPrice(valeurStock) },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm">
            <p className="text-2xl font-extrabold text-gray-900">{s.value}</p>
            <p className="text-xs font-semibold text-gray-400 mt-1 tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search + filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-gray-700"
          value={catFilter}
          onChange={e => setCatFilter(e.target.value)}
        >
          <option value="">Toutes les categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-gray-700"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="">Tous les statuts</option>
          <option value="actif">Actif</option>
          <option value="inactif">Inactif</option>
        </select>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              tab === t.key
                ? 'bg-brand-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 tracking-wider uppercase">Produit</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 tracking-wider uppercase">Categorie</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 tracking-wider uppercase">Prix</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 tracking-wider uppercase">Stock</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 tracking-wider uppercase">Statut</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 tracking-wider uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(p => {
              const stockPct = Math.min(100, Math.round((p.stock / (p.maxStock || 50)) * 100))
              const isActif = p.status === 'actif'
              return (
                <tr key={p.id} className="hover:bg-gray-50 transition">
                  {/* Produit */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                        {p.imageUrl
                          ? <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover"/>
                          : <Package className="w-5 h-5 text-gray-300" />
                        }
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-sm font-semibold text-gray-900">{p.name}</span>
                          {p.popular && (
                            <span className="text-[10px] font-bold bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded">POP</span>
                          )}
                          {p.promoPrice && (
                            <span className="text-[10px] font-bold bg-red-100 text-red-600 px-1.5 py-0.5 rounded">PROMO</span>
                          )}
                          {p.recommended && (
                            <span className="text-[10px] font-bold bg-teal-100 text-teal-600 px-1.5 py-0.5 rounded">REC</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">{p.sku}</p>
                      </div>
                    </div>
                  </td>

                  {/* Categorie */}
                  <td className="px-4 py-4">
                    <span className="text-xs font-medium bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full">
                      {p.category.toLowerCase()}
                    </span>
                  </td>

                  {/* Prix */}
                  <td className="px-4 py-4">
                    {p.promoPrice ? (
                      <div>
                        <span className="text-xs text-gray-400 line-through">{formatPrice(p.promoPrice)}</span>
                        <span className="ml-1.5 text-sm font-bold text-red-500">{formatPrice(p.price)}</span>
                      </div>
                    ) : (
                      <span className="text-sm font-bold text-gray-900">{formatPrice(p.price)}</span>
                    )}
                  </td>

                  {/* Stock */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-700 w-6">{p.stock}</span>
                      <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${stockPct > 30 ? 'bg-emerald-400' : stockPct > 10 ? 'bg-amber-400' : 'bg-red-400'}`}
                          style={{ width: `${stockPct}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Statut */}
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${isActif ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isActif ? 'bg-emerald-500' : 'bg-gray-400'}`}/>
                      {isActif ? 'Actif' : 'Inactif'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5">
                      <button title="Copier le lien" className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition">
                        <Link className="w-4 h-4" />
                      </button>
                      <button title="Voir" className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button title="Modifier" onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button title="Supprimer" className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-400 text-sm">Aucun produit trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Slide panel */}
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
              <input className="input-field text-sm" placeholder="0 FCFA" value={form.price} onChange={e => setForm({...form, price: e.target.value})}/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prix promo</label>
              <input className="input-field text-sm" placeholder="0 FCFA" value={form.promoPrice} onChange={e => setForm({...form, promoPrice: e.target.value})}/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <input className="input-field text-sm" type="number" placeholder="0" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})}/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
              <select className="input-field text-sm" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                <option value="">Sélectionner…</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
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

import { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js'
import { useNavigate } from 'react-router-dom'
import {
  DollarSign, ShoppingCart, Users, Package,
  Clock, ArrowRight, ChevronRight, Star, TrendingUp
} from 'lucide-react'
import { products, orders, clients } from '../data/mockData'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

const formatPrice = (v) => v?.toLocaleString('fr-FR') + ' F'

const relativeDate = (dateStr) => {
  if (!dateStr) return '—'
  const [d, m, y] = dateStr.split('/')
  const date = new Date(`${y}-${m}-${d}`)
  const diff = Math.round((new Date() - date) / 86400000)
  if (diff === 0) return "A l'instant"
  if (diff === 1) return 'Hier'
  if (diff < 7) return `Il y a ${diff}j`
  return dateStr
}

const greeting = () => {
  const h = new Date().getHours()
  if (h < 12) return { text: 'Bonjour', emoji: '☀️' }
  if (h < 18) return { text: 'Bon après-midi', emoji: '🌤️' }
  return { text: 'Bonsoir', emoji: '🌙' }
}

const weekDays = ['Sam', 'Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Auj.']
const weekRevenue = [0, 0, 0, 0, 0, 0, orders.reduce((s, o) => s + o.amount, 0)]

export default function Dashboard() {
  const [period, setPeriod] = useState('Ce mois')
  const navigate = useNavigate()
  const { text: greetText, emoji: greetEmoji } = greeting()

  const revenuTotal = orders.reduce((s, o) => s + o.amount, 0)
  const commandesAttente = orders.filter(o => o.status === 'attente').length
  const statusCounts = {
    attente:   orders.filter(o => o.status === 'attente').length,
    livraison: orders.filter(o => o.status === 'livraison').length,
    livree:    orders.filter(o => o.status === 'livree').length,
    annulee:   orders.filter(o => o.status === 'annulee').length,
  }
  const maxStatus = Math.max(...Object.values(statusCounts), 1)

  const topProds = [...products]
    .map(p => ({ ...p, sold: orders.filter(o => o.product.includes(p.name)).length }))
    .sort((a, b) => b.sold - a.sold).slice(0, 5)
  const maxSold = Math.max(...topProds.map(p => p.sold), 1)

  const chartData = {
    labels: weekDays,
    datasets: [{
      data: weekRevenue,
      backgroundColor: weekRevenue.map((_, i) => i === weekRevenue.length - 1 ? '#7c3aed' : '#e5e7eb'),
      borderRadius: 6,
    }],
  }
  const chartOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => formatPrice(ctx.raw) } } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 10 } } },
      y: { grid: { color: '#f3f4f6' }, beginAtZero: true, ticks: { color: '#9ca3af', font: { size: 10 }, callback: v => v === 0 ? '0' : `${Math.round(v / 1000)}K` } },
    },
  }

  const kpis = [
    { label: 'Revenu total',     value: formatPrice(revenuTotal), change: '+100%', Icon: DollarSign,   iconBg: 'bg-brand-50 text-brand-500',   bar: 'bg-brand-500' },
    { label: 'Total commandes',  value: orders.length,            change: '+100%', Icon: ShoppingCart, iconBg: 'bg-amber-50 text-amber-500',   bar: 'bg-amber-400' },
    { label: 'Clients',          value: clients.length,           change: '+100%', Icon: Users,        iconBg: 'bg-emerald-50 text-emerald-500', bar: 'bg-emerald-400' },
    { label: 'Produits actifs',  value: products.filter(p => p.status === 'actif').length, change: null, Icon: Package, iconBg: 'bg-purple-50 text-purple-500', bar: 'bg-purple-400' },
  ]

  return (
    <div className="space-y-4 pb-10">

      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs text-gray-400">{greetText} {greetEmoji}</p>
          <h1 className="text-xl font-extrabold text-gray-900 mt-0.5">lo 👋</h1>
          <p className="text-xs text-gray-400 mt-0.5">Voici le resume de votre activite</p>
        </div>
        <select
          className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none text-gray-700"
          value={period} onChange={e => setPeriod(e.target.value)}
        >
          {["Aujourd'hui", 'Cette semaine', 'Ce mois', 'Cette année'].map(p => <option key={p}>{p}</option>)}
        </select>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map(({ label, value, change, Icon, iconBg, bar }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400 font-medium leading-tight">{label}</p>
            </div>
            <p className="text-lg sm:text-2xl font-extrabold text-gray-900 leading-tight">{value}</p>
            {change && (
              <div className="mt-2">
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <TrendingUp className="w-3 h-3" />{change}
                </span>
                <div className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${bar}`} style={{ width: '100%' }} />
                </div>
              </div>
            )}
            <div className={`absolute -bottom-3 -right-3 w-14 h-14 rounded-full opacity-10 ${iconBg.split(' ')[0]}`} />
          </div>
        ))}
      </div>

      {/* Alerte attente */}
      {commandesAttente > 0 && (
        <div className="flex items-center justify-between bg-amber-50 border-l-4 border-amber-400 rounded-xl px-4 py-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-sm font-medium text-amber-700">
              {commandesAttente} commande{commandesAttente > 1 ? 's' : ''} en attente
            </span>
          </div>
          <button onClick={() => navigate('/commandes')} className="text-sm font-semibold text-brand-600 hover:underline flex items-center gap-1">
            Voir <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Chart + Répartition */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-900 border-l-4 border-brand-500 pl-3">Revenu cette semaine</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-500 inline-block" />
              <span className="text-xs text-gray-500">Revenu (FCFA)</span>
            </div>
          </div>
          <div style={{ height: 180 }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-900 border-l-4 border-brand-500 pl-3">Repartition commandes</h2>
            <span className="text-xs text-gray-400">Par statut</span>
          </div>
          <div className="space-y-4">
            {[
              { key: 'attente',   label: 'En attente',   dot: 'bg-amber-400' },
              { key: 'livraison', label: 'En livraison', dot: 'bg-blue-400' },
              { key: 'livree',    label: 'Livrees',      dot: 'bg-emerald-500' },
              { key: 'annulee',   label: 'Annulees',     dot: 'bg-red-400' },
            ].map(s => {
              const count = statusCounts[s.key]
              const pct = Math.round((count / maxStatus) * 100)
              return (
                <div key={s.key} className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${s.dot}`} />
                  <span className="text-xs text-gray-700 w-20 shrink-0">{s.label}</span>
                  <span className="text-xs font-bold text-gray-900 w-4 shrink-0">{count}</span>
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${s.dot}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mes Produits */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-brand-500" />
            <h2 className="text-sm font-bold text-gray-900">Mes Produits</h2>
          </div>
          <button onClick={() => navigate('/produits')} className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition">
            Voir tout <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:overflow-visible sm:pb-0">
          {products.filter(p => p.status === 'actif').map(p => {
            const sold = orders.filter(o => o.product.includes(p.name)).length
            const hasPromo = !!p.promoPrice
            const discountPct = hasPromo ? Math.round((1 - p.price / p.promoPrice) * 100) : null
            return (
              <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition shrink-0 w-44 sm:w-auto">
                <div className="relative bg-gray-100 h-32 sm:h-40 flex items-center justify-center">
                  {p.imageUrl
                    ? <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                    : <Package className="w-8 h-8 text-gray-300" />
                  }
                  {discountPct && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-lg">-{discountPct}%</span>
                  )}
                  {p.popular && <Star className="absolute top-2 right-2 w-4 h-4 text-amber-400 fill-amber-400" />}
                </div>
                <div className="p-3">
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 truncate">{p.name}</p>
                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                    <span className="text-xs sm:text-sm font-bold text-brand-600">{formatPrice(p.price)}</span>
                    {hasPromo && <span className="text-[10px] text-gray-400 line-through">{formatPrice(p.promoPrice)}</span>}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <ShoppingCart className="w-3 h-3" />
                    {sold} vendus
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Commandes récentes + Top produits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-900 border-l-4 border-brand-500 pl-3">Commandes recentes</h2>
            <button onClick={() => navigate('/commandes')} className="text-xs font-semibold text-brand-600 hover:underline">Voir tout</button>
          </div>
          <div className="space-y-3">
            {orders.slice(0, 5).map(o => {
              const iconBg =
                o.status === 'attente'   ? 'bg-amber-100'   :
                o.status === 'livraison' ? 'bg-blue-100'    :
                o.status === 'livree'    ? 'bg-emerald-100' : 'bg-red-100'
              const iconColor =
                o.status === 'attente'   ? 'text-amber-500'   :
                o.status === 'livraison' ? 'text-blue-500'    :
                o.status === 'livree'    ? 'text-emerald-500' : 'text-red-400'
              return (
                <div key={o.id} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
                    <Clock className={`w-4 h-4 ${iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{o.client}</p>
                    <p className="text-xs text-gray-400 truncate">{o.product} x1</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-gray-900">{formatPrice(o.amount)}</p>
                    <p className="text-xs text-gray-400">{relativeDate(o.date)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-900 border-l-4 border-brand-500 pl-3">Top produits</h2>
            <span className="text-xs text-gray-400">Les plus vendus</span>
          </div>
          <div className="space-y-4">
            {topProds.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-gray-800 truncate">{p.name}</p>
                    <span className="text-sm font-bold text-brand-600 ml-2 shrink-0">{formatPrice(p.price)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full" style={{ width: `${Math.round((p.sold / maxSold) * 100)}%` }} />
                    </div>
                    <span className="text-xs text-gray-400 shrink-0">{p.sold} vendus</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

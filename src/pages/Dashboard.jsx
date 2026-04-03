import Badge from '../components/ui/Badge'
import { products, orders, statusConfig } from '../data/mockData'

const kpis = [
  {
    label: "Chiffre d'affaires",
    value: '24 380 €',
    change: '+12.5%',
    positive: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
      </svg>
    ),
    color: 'text-brand-600 bg-brand-50',
  },
  {
    label: 'Commandes',
    value: '348',
    change: '+8.2%',
    positive: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
      </svg>
    ),
    color: 'text-blue-600 bg-blue-50',
  },
  {
    label: 'Clients actifs',
    value: '1 204',
    change: '+3.1%',
    positive: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5.196-3.793M9 20H4v-2a4 4 0 015.196-3.793M15 7a4 4 0 11-8 0 4 4 0 018 0z"/>
      </svg>
    ),
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    label: 'Produits actifs',
    value: '87',
    change: '-2',
    positive: false,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/>
      </svg>
    ),
    color: 'text-amber-600 bg-amber-50',
  },
]

const topProducts = [
  { name: 'Pack Premium', sales: 124, revenue: '6 200 €', pct: 87 },
  { name: 'Licence Pro', sales: 98, revenue: '4 900 €', pct: 69 },
  { name: 'Starter Kit', sales: 76, revenue: '2 280 €', pct: 53 },
]

const activity = [
  { text: 'Nouvelle commande #1042 reçue', time: 'Il y a 5 min', color: 'bg-brand-100 text-brand-600' },
  { text: 'Client Martin Dupont créé', time: 'Il y a 18 min', color: 'bg-blue-100 text-blue-600' },
  { text: 'Stock faible : Starter Kit (3 restants)', time: 'Il y a 1h', color: 'bg-amber-100 text-amber-600' },
  { text: 'Commande #1039 expédiée', time: 'Il y a 2h', color: 'bg-emerald-100 text-emerald-600' },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map(kpi => (
          <div key={kpi.label} className="card flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${kpi.color}`}>
              {kpi.icon}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 truncate">{kpi.label}</p>
              <p className="text-xl font-extrabold text-gray-900">{kpi.value}</p>
              <p className={`text-xs font-medium ${kpi.positive ? 'text-emerald-600' : 'text-red-500'}`}>{kpi.change} ce mois</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="xl:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Commandes récentes</h2>
            <a href="/commandes" className="text-xs text-brand-600 font-medium hover:underline">Voir tout</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-400 pb-2 pr-4">#</th>
                  <th className="text-left text-xs font-medium text-gray-400 pb-2 pr-4">Client</th>
                  <th className="text-left text-xs font-medium text-gray-400 pb-2 pr-4">Produit</th>
                  <th className="text-left text-xs font-medium text-gray-400 pb-2 pr-4">Total</th>
                  <th className="text-left text-xs font-medium text-gray-400 pb-2">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map(order => {
                  const s = statusConfig[order.status]
                  return (
                    <tr key={order.id} className="hover:bg-gray-50 transition">
                      <td className="py-2.5 pr-4 font-medium text-gray-700">{order.id}</td>
                      <td className="py-2.5 pr-4 text-gray-600">{order.client}</td>
                      <td className="py-2.5 pr-4 text-gray-500">{order.product}</td>
                      <td className="py-2.5 pr-4 font-semibold text-gray-800">{order.total}</td>
                      <td className="py-2.5">
                        <Badge color={s.color}>{s.label}</Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Top products */}
          <div className="card">
            <h2 className="section-title mb-4">Top produits</h2>
            <div className="space-y-3">
              {topProducts.map(p => (
                <div key={p.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{p.name}</span>
                    <span className="text-gray-500">{p.revenue}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: `${p.pct}%` }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="card">
            <h2 className="section-title mb-4">Activité récente</h2>
            <div className="space-y-3">
              {activity.map((a, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${a.color.split(' ')[0]}`}/>
                  <div>
                    <p className="text-xs text-gray-700 font-medium">{a.text}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

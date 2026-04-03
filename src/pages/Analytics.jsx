import { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Legend, Filler
} from 'chart.js'
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Legend, Filler
)

const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
const brandPurple = '#8b3dff'
const brandLight = 'rgba(139,61,255,0.12)'

const revenueData = {
  labels: months,
  datasets: [{
    label: 'Chiffre d\'affaires (FCFA)',
    data: [8200, 9100, 10500, 9800, 11200, 13000, 11800, 14200, 12900, 15800, 17200, 24380],
    borderColor: brandPurple,
    backgroundColor: brandLight,
    fill: true,
    tension: 0.4,
    pointRadius: 4,
    pointBackgroundColor: brandPurple,
  }]
}

const ordersData = {
  labels: months,
  datasets: [{
    label: 'Commandes',
    data: [65, 72, 88, 79, 95, 110, 102, 125, 118, 140, 155, 348],
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(59,130,246,0.1)',
    fill: true,
    tension: 0.4,
    pointRadius: 4,
    pointBackgroundColor: '#3b82f6',
  }]
}

const statusData = {
  labels: ['Livrées', 'Expédiées', 'En attente', 'Annulées'],
  datasets: [{
    data: [201, 89, 24, 34],
    backgroundColor: ['#10b981', brandPurple, '#f59e0b', '#ef4444'],
    borderWidth: 0,
    hoverOffset: 6,
  }]
}

const topProductsData = {
  labels: ['Pack Premium', 'Licence Pro', 'Starter Kit'],
  datasets: [{
    label: 'Ventes',
    data: [124, 98, 76],
    backgroundColor: [brandPurple, '#3b82f6', '#10b981'],
    borderRadius: 8,
  }]
}

const categoriesData = {
  labels: ['Logiciels', 'Licences', 'Services', 'Formations'],
  datasets: [{
    data: [42, 28, 18, 12],
    backgroundColor: [brandPurple, '#3b82f6', '#10b981', '#f59e0b'],
    borderWidth: 0,
  }]
}

const hourlyData = {
  labels: ['8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h'],
  datasets: [{
    label: 'Commandes',
    data: [5, 14, 22, 18, 10, 8, 25, 30, 20, 15, 9],
    backgroundColor: brandPurple,
    borderRadius: 8,
  }]
}

const lineOpts = (title) => ({
  responsive: true,
  plugins: { legend: { display: false }, title: { display: false } },
  scales: {
    x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#9ca3af' } },
    y: { grid: { color: '#f3f4f6' }, ticks: { font: { size: 11 }, color: '#9ca3af' } }
  }
})

const donutOpts = {
  responsive: true,
  cutout: '68%',
  plugins: { legend: { position: 'bottom', labels: { font: { size: 12 }, padding: 16 } } }
}

const pieOpts = {
  responsive: true,
  plugins: { legend: { position: 'bottom', labels: { font: { size: 12 }, padding: 16 } } }
}

const barOpts = (indexAxis = 'x') => ({
  responsive: true,
  indexAxis,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: indexAxis === 'y' }, ticks: { font: { size: 11 }, color: '#9ca3af' } },
    y: { grid: { display: indexAxis === 'x', color: '#f3f4f6' }, ticks: { font: { size: 11 }, color: '#9ca3af' } }
  }
})

const kpis = [
  { label: 'CA ce mois', value: '24 380 FCFA', change: '+12.5%', positive: true },
  { label: 'Commandes totales', value: '348', change: '+8.2%', positive: true },
  { label: 'Panier moyen', value: '70 FCFA', change: '+3.8%', positive: true },
  { label: 'Taux d\'annulation', value: '9.8%', change: '-1.2%', positive: true },
]

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-500">Performances de votre activité</p>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {kpis.map(k => (
          <div key={k.label} className="card">
            <p className="text-xs text-gray-400 mb-1">{k.label}</p>
            <p className="text-xl font-extrabold text-gray-900">{k.value}</p>
            <p className={`text-xs font-medium mt-0.5 ${k.positive ? 'text-emerald-600' : 'text-red-500'}`}>{k.change} vs mois dernier</p>
          </div>
        ))}
      </div>

      {/* Revenue + Orders */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="card">
          <h2 className="section-title mb-4">Chiffre d'affaires mensuel</h2>
          <Line data={revenueData} options={lineOpts()} height={200}/>
        </div>
        <div className="card">
          <h2 className="section-title mb-4">Commandes mensuelles</h2>
          <Line data={ordersData} options={lineOpts()} height={200}/>
        </div>
      </div>

      {/* Status + Top products */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="card">
          <h2 className="section-title mb-4">Répartition des statuts</h2>
          <Doughnut data={statusData} options={donutOpts}/>
        </div>
        <div className="card xl:col-span-2">
          <h2 className="section-title mb-4">Top produits</h2>
          <Bar data={topProductsData} options={barOpts('y')} height={180}/>
        </div>
      </div>

      {/* Categories + Hourly */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="card">
          <h2 className="section-title mb-4">Ventes par catégorie</h2>
          <Pie data={categoriesData} options={pieOpts}/>
        </div>
        <div className="card">
          <h2 className="section-title mb-4">Commandes par heure</h2>
          <Bar data={hourlyData} options={barOpts()} height={220}/>
        </div>
      </div>
    </div>
  )
}

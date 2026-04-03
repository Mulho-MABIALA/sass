import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
      </svg>
    ),
    color: 'bg-brand-100 text-brand-500',
    title: 'Un lien = une commande',
    desc: 'Partagez sur Insta, WhatsApp, TikTok. Le client commande en 30 secondes.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
      </svg>
    ),
    color: 'bg-pink-100 text-pink-500',
    title: 'Suivi des commandes',
    desc: 'En attente → En livraison → Livrée. Changez le statut en un tap.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5.196-3.793M9 20H4v-2a4 4 0 015.196-3.793M15 7a4 4 0 11-8 0 4 4 0 018 0z"/>
      </svg>
    ),
    color: 'bg-amber-100 text-amber-500',
    title: 'Base clients auto',
    desc: 'Segmentation VIP, fidèle, nouveau — automatique à chaque commande.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
      </svg>
    ),
    color: 'bg-emerald-100 text-emerald-500',
    title: 'Chiffres en temps réel',
    desc: 'Revenus, tendances, taux de livraison — les données qui comptent.',
  },
]

const steps = [
  { n: '01', title: 'Créez votre compte', desc: 'Email + nom de boutique. Dashboard prêt en 30 secondes.', color: 'from-brand-500 to-brand-700' },
  { n: '02', title: 'Ajoutez vos produits', desc: 'Nom, prix, variantes. SaasPanel génère le lien automatiquement.', color: 'from-pink-400 to-brand-500' },
  { n: '03', title: 'Partagez et vendez', desc: 'Collez le lien sur vos réseaux. Commandes en temps réel.', color: 'from-rose-400 to-pink-600' },
]

const before = ['Messages WhatsApp perdus', 'Commandes recopiées à la main', 'Aucune visibilité sur le stock', 'Revenus impossibles à suivre']
const after  = ['Commandes centralisées', 'Client remplit seul via le lien', 'Stock mis à jour automatiquement', 'Analytics et KPIs en temps réel']

const stats = [
  { value: '1 200+', label: 'Vendeurs actifs' },
  { value: '48 000', label: 'Commandes traitées' },
  { value: '99.9%', label: 'Disponibilité' },
  { value: '< 30s', label: 'Pour commander' },
]

export default function Landing() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-pink-100">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center shadow-rose">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <span className="font-extrabold text-lg tracking-tight text-gray-900">SaasPanel</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            <a href="#features" className="hover:text-brand-500 transition font-medium">Fonctionnalités</a>
            <a href="#how" className="hover:text-brand-500 transition font-medium">Comment ça marche</a>
            <a href="#why" className="hover:text-brand-500 transition font-medium">Pourquoi nous</a>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => navigate('/login')}
              className="text-sm font-medium text-gray-600 hover:text-brand-500 transition px-4 py-2 rounded-xl hover:bg-pink-50">
              Connexion
            </button>
            <button onClick={() => navigate('/login')}
              className="text-sm font-bold bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 rounded-xl transition shadow-rose">
              Commencer →
            </button>
          </div>

          <button className="md:hidden text-gray-500" onClick={() => setMenuOpen(m => !m)}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}/>
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-pink-100 bg-white px-5 py-4 space-y-2 text-sm">
            <a href="#features" className="block text-gray-500 hover:text-brand-500 py-1" onClick={() => setMenuOpen(false)}>Fonctionnalités</a>
            <a href="#how" className="block text-gray-500 hover:text-brand-500 py-1" onClick={() => setMenuOpen(false)}>Comment ça marche</a>
            <a href="#why" className="block text-gray-500 hover:text-brand-500 py-1" onClick={() => setMenuOpen(false)}>Pourquoi nous</a>
            <button onClick={() => navigate('/login')} className="w-full bg-brand-500 text-white font-bold py-2.5 rounded-xl text-sm mt-2">Commencer →</button>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* Background shape */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(225,29,122,0.08) 0%, transparent 70%)' }}/>
          <div className="absolute top-20 -right-20 w-72 h-72 rounded-full bg-brand-100/60 blur-3xl"/>
          <div className="absolute top-40 -left-20 w-56 h-56 rounded-full bg-pink-100/80 blur-3xl"/>
        </div>

        <div className="relative max-w-5xl mx-auto px-5 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 rounded-full px-4 py-1.5 text-xs font-medium text-brand-600 mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"/>
            1 200+ vendeurs gèrent leur boutique avec SaasPanel
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6 text-gray-900">
            Gérez vos commandes<br/>
            <span className="text-brand-500">en un seul endroit</span>
          </h1>

          <p className="text-gray-500 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Un lien par produit. Votre client commande seul.<br/>
            Vous suivez tout depuis un seul dashboard.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={() => navigate('/login')}
              className="w-full sm:w-auto bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-4 rounded-2xl text-sm transition shadow-rose-lg flex items-center gap-2 justify-center">
              Créer mon compte gratuit
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </button>
            <a href="#features"
              className="w-full sm:w-auto border border-gray-200 text-gray-700 hover:border-brand-200 hover:bg-pink-50 hover:text-brand-600 font-medium px-8 py-4 rounded-2xl text-sm transition flex items-center gap-2 justify-center">
              Voir les fonctionnalités
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-4">Gratuit · Sans carte bancaire · Prêt en 2 min</p>

          {/* Dashboard preview mock */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none"/>
            <div className="bg-[#fff7fa] border border-pink-100 rounded-3xl shadow-rose-lg p-4 text-left overflow-hidden">
              {/* Mock topbar */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-400"/>
                <div className="w-3 h-3 rounded-full bg-amber-400"/>
                <div className="w-3 h-3 rounded-full bg-emerald-400"/>
                <div className="flex-1 bg-white rounded-lg h-6 ml-2 border border-pink-100 flex items-center px-3">
                  <span className="text-[10px] text-gray-400">saaspanel.io/dashboard</span>
                </div>
              </div>
              {/* Mock content */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                {['24 380 €', '348', '1 204', '87'].map((v, i) => (
                  <div key={i} className="bg-white rounded-xl p-3 border border-pink-50">
                    <div className="w-6 h-6 rounded-lg bg-brand-100 mb-2"/>
                    <p className="text-sm font-extrabold text-gray-800">{v}</p>
                    <div className="w-12 h-1.5 bg-pink-100 rounded mt-1"/>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2 bg-white rounded-xl p-3 border border-pink-50 h-24">
                  <div className="w-20 h-1.5 bg-pink-100 rounded mb-3"/>
                  {[80, 55, 90, 65, 75].map((h, i) => (
                    <div key={i} className="inline-block w-4 bg-brand-200 rounded mr-1 align-bottom" style={{ height: `${h * 0.45}px` }}/>
                  ))}
                </div>
                <div className="bg-white rounded-xl p-3 border border-pink-50 h-24 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-8 border-brand-100" style={{ borderTopColor: '#e11d7a', borderRightColor: '#e11d7a' }}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-[#fff7fa] border-y border-pink-100">
        <div className="max-w-4xl mx-auto px-5 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(s => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold text-brand-500 mb-1">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="max-w-6xl mx-auto px-5 py-24">
        <div className="text-center mb-14">
          <span className="label-tag">Fonctionnalités</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">Tout ce qu'il faut</h2>
          <p className="text-gray-400 mt-3 max-w-md mx-auto">Chaque fonctionnalité résout un vrai problème de vendeur.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map(f => (
            <div key={f.title}
              className="group bg-white border border-pink-100 rounded-2xl p-8 hover:shadow-rose hover:border-brand-200 transition-all duration-200 hover:-translate-y-1">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${f.color}`}>
                {f.icon}
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how" className="bg-[#fff7fa] border-y border-pink-100">
        <div className="max-w-4xl mx-auto px-5 py-24 text-center">
          <span className="label-tag">Comment ça marche</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3 mb-14">Prêt en 3 étapes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={s.n} className="flex flex-col items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-xl font-black text-white shadow-rose`}>
                  {s.n}
                </div>
                <h3 className="font-bold text-gray-900">{s.title}</h3>
                <p className="text-sm text-gray-500 max-w-[200px]">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute translate-x-32 mt-6">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Before / After ── */}
      <section id="why" className="max-w-5xl mx-auto px-5 py-24">
        <div className="text-center mb-14">
          <span className="label-tag">Pourquoi SaasPanel</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">Avant / Après</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-red-50 border border-red-100 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded-lg bg-red-100 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </div>
              <span className="text-xs font-bold tracking-widest text-red-500 uppercase">Sans SaasPanel</span>
            </div>
            <ul className="space-y-3.5">
              {before.map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-500">
                  <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase">Avec SaasPanel</span>
            </div>
            <ul className="space-y-3.5">
              {after.map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="relative overflow-hidden">
        <div
          className="max-w-5xl mx-auto mx-5 mb-16 rounded-3xl px-8 py-20 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a0012 0%, #3d0030 60%, #6b0b3a 100%)' }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 rounded-full bg-brand-500/20 blur-[80px]"/>
          </div>
          <div className="relative">
            <span className="inline-block bg-white/10 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-white/10">
              🚀 Rejoignez les vendeurs qui utilisent déjà SaasPanel
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Prêt à vendre<br/>plus simplement ?
            </h2>
            <p className="text-white/60 mb-10 text-base">Créez votre compte en 2 minutes. Gratuit, sans engagement.</p>
            <button onClick={() => navigate('/login')}
              className="inline-flex items-center gap-2 bg-white text-brand-600 hover:bg-brand-50 font-extrabold px-10 py-4 rounded-2xl text-sm transition shadow-2xl">
              Commencer maintenant
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </button>
            <p className="text-white/30 text-xs mt-4">Sans carte bancaire · Annulable à tout moment</p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-pink-100 bg-white">
        <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <span className="font-extrabold text-sm text-gray-900">SaasPanel</span>
          </div>
          <p className="text-xs text-gray-400">© 2026 SaasPanel. Tous droits réservés.</p>
          <div className="flex gap-5 text-xs text-gray-400">
            <a href="#" className="hover:text-brand-500 transition">Confidentialité</a>
            <a href="#" className="hover:text-brand-500 transition">Conditions</a>
            <a href="#" className="hover:text-brand-500 transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

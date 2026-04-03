import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex">

      {/* Left panel — deco */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a0012 0%, #3d0030 60%, #6b0b3a 100%)' }}
      >
        {/* Blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brand-500/20 blur-[100px] pointer-events-none"/>
        <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-brand-400/10 blur-[80px] pointer-events-none"/>

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-2xl bg-brand-500 flex items-center justify-center shadow-rose">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <span className="text-xl font-extrabold text-white tracking-tight">SaasPanel</span>
        </div>

        {/* Central quote */}
        <div className="relative z-10">
          <p className="text-3xl font-extrabold text-white leading-tight mb-4">
            Gérez votre activité<br/>
            <span className="text-brand-300">en toute simplicité</span>
          </p>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Un dashboard complet pour piloter vos commandes, clients, stock et analytics — le tout en un seul endroit.
          </p>

          {/* Stats */}
          <div className="flex gap-6 mt-10">
            {[
              { value: '1 200+', label: 'Vendeurs' },
              { value: '48K', label: 'Commandes' },
              { value: '99.9%', label: 'Uptime' },
            ].map(s => (
              <div key={s.label}>
                <p className="text-xl font-extrabold text-white">{s.value}</p>
                <p className="text-xs text-white/40">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-sm text-white/70 italic mb-3">
            "SaasPanel a transformé ma façon de gérer mes commandes. Je gagne 2h par jour !"
          </p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold">SM</div>
            <div>
              <p className="text-xs font-semibold text-white">Sarah M.</p>
              <p className="text-[10px] text-white/40">Boutique en ligne · Paris</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#fff7fa]">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-rose">
              <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <span className="text-lg font-extrabold text-gray-900">SaasPanel</span>
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Bon retour ! 👋</h2>
          <p className="text-sm text-gray-500 mb-8">Connectez-vous à votre espace</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Adresse e-mail</label>
              <input
                type="email"
                className="input-field"
                placeholder="vous@exemple.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-gray-700">Mot de passe</label>
                <a href="#" className="text-xs text-brand-500 hover:text-brand-600 font-medium">Oublié ?</a>
              </div>
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4 accent-brand-500 rounded"/>
              <label htmlFor="remember" className="text-sm text-gray-500">Se souvenir de moi</label>
            </div>

            <button type="submit"
              className="btn-primary w-full py-3 text-sm font-bold shadow-rose-lg mt-2">
              Se connecter →
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-pink-100"/>
            <span className="text-xs text-gray-400">ou</span>
            <div className="flex-1 h-px bg-pink-100"/>
          </div>

          {/* Social (decorative) */}
          <button className="w-full flex items-center justify-center gap-2 border border-pink-200 bg-white hover:bg-pink-50 text-gray-700 text-sm font-medium py-2.5 rounded-xl transition">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuer avec Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Pas encore de compte ?{' '}
            <a href="#" className="text-brand-500 font-semibold hover:text-brand-600">Créer un compte</a>
          </p>
        </div>
      </div>
    </div>
  )
}

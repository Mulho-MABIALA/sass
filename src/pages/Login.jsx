import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: '#13141f' }}>
      <div className="w-full max-w-sm">

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white mb-2">Connexion</h1>
          <p className="text-sm" style={{ color: '#8b8fa8' }}>Accédez à votre dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Email</label>
            <input
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                background: '#1e2030',
                border: '1px solid #2d2f45',
                color: 'white',
                borderRadius: '14px',
                padding: '14px 16px',
                width: '100%',
                fontSize: '14px',
                outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = '#e11d7a'}
              onBlur={e => e.target.style.borderColor = '#2d2f45'}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Mot de passe</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Votre mot de passe"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{
                  background: '#1e2030',
                  border: '1px solid #2d2f45',
                  color: 'white',
                  borderRadius: '14px',
                  padding: '14px 48px 14px 16px',
                  width: '100%',
                  fontSize: '14px',
                  outline: 'none',
                }}
                onFocus={e => e.target.style.borderColor = '#e11d7a'}
                onBlur={e => e.target.style.borderColor = '#2d2f45'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                style={{ color: '#8b8fa8' }}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                )}
              </button>
            </div>
            <div className="text-right mt-2">
              <a href="#" style={{ color: '#e11d7a', fontSize: '13px' }}>Mot de passe oublié ?</a>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full font-bold text-white py-4 rounded-2xl transition-opacity hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, #e11d7a, #c0176a)',
              fontSize: '15px',
              borderRadius: '14px',
            }}
          >
            Se connecter
          </button>
        </form>

        {/* Register link */}
        <p className="text-center mt-6 text-sm" style={{ color: '#8b8fa8' }}>
          Pas de compte ?{' '}
          <Link to="/register" style={{ color: '#e11d7a', fontWeight: '600' }}>
            Créer ma boutique
          </Link>
        </p>

        {/* Footer links */}
        <div className="flex justify-center gap-6 mt-10">
          {['Accueil', 'Confidentialité', 'Conditions'].map(link => (
            <a key={link} href="#" style={{ color: '#8b8fa8', fontSize: '12px' }}
              className="hover:text-white transition-colors">
              {link}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

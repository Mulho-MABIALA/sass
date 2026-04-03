import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    boutique: '',
    prenom: '',
    whatsapp: '',
    email: '',
    password: '',
    terms: false,
  })
  const [showPassword, setShowPassword] = useState(false)

  const update = (field, value) => setForm(f => ({ ...f, [field]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  const inputStyle = {
    background: '#1e2030',
    border: '1px solid #2d2f45',
    color: 'white',
    borderRadius: '14px',
    padding: '14px 16px',
    width: '100%',
    fontSize: '14px',
    outline: 'none',
  }

  const handleFocus = e => e.target.style.borderColor = '#e11d7a'
  const handleBlur = e => e.target.style.borderColor = '#2d2f45'

  // Password strength
  const strength = form.password.length === 0 ? 0
    : form.password.length < 6 ? 1
    : form.password.length < 10 ? 2
    : 3
  const strengthColors = ['#2d2f45', '#ef4444', '#f59e0b', '#22c55e']
  const strengthLabels = ['', 'Faible', 'Moyen', 'Fort']

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10" style={{ background: '#13141f' }}>
      <div className="w-full max-w-sm">

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white mb-2">Créez votre boutique</h1>
          <p className="text-sm" style={{ color: '#8b8fa8' }}>Gratuit, sans engagement, prêt en 2 minutes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Nom boutique */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Nom de la boutique <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Ex: Fatou Fashion"
              value={form.boutique}
              onChange={e => update('boutique', e.target.value)}
              required
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <p className="text-xs mt-1" style={{ color: '#8b8fa8' }}>Visible par vos clients</p>
          </div>

          {/* Prénom + WhatsApp */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Prénom</label>
              <input
                type="text"
                placeholder="Votre prénom"
                value={form.prenom}
                onChange={e => update('prenom', e.target.value)}
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-2">WhatsApp</label>
              <input
                type="tel"
                placeholder="77 123 45 67"
                value={form.whatsapp}
                onChange={e => update('whatsapp', e.target.value)}
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Email <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="email"
              placeholder="votre@email.com"
              value={form.email}
              onChange={e => update('email', e.target.value)}
              required
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Mot de passe <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Minimum 6 caractères"
                value={form.password}
                onChange={e => update('password', e.target.value)}
                required
                minLength={6}
                style={{ ...inputStyle, paddingRight: '48px' }}
                onFocus={handleFocus}
                onBlur={handleBlur}
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

            {/* Strength bar */}
            {form.password.length > 0 && (
              <div className="flex gap-1.5 mt-2">
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className="flex-1 h-1 rounded-full transition-colors"
                    style={{ background: i <= strength ? strengthColors[strength] : '#2d2f45' }}
                  />
                ))}
                <span className="text-xs ml-1" style={{ color: strengthColors[strength] }}>
                  {strengthLabels[strength]}
                </span>
              </div>
            )}
          </div>

          {/* Terms */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.terms}
              onChange={e => update('terms', e.target.checked)}
              required
              className="mt-0.5 w-4 h-4 rounded"
              style={{ accentColor: '#e11d7a' }}
            />
            <span className="text-sm" style={{ color: '#8b8fa8' }}>
              J'accepte les{' '}
              <a href="#" style={{ color: '#e11d7a' }}>Conditions</a>
              {' '}et la{' '}
              <a href="#" style={{ color: '#e11d7a' }}>Politique de confidentialité</a>
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full font-bold text-white py-4 transition-opacity hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, #e11d7a, #c0176a)',
              fontSize: '15px',
              borderRadius: '14px',
            }}
          >
            Créer mon compte
          </button>
        </form>

        {/* Login link */}
        <p className="text-center mt-6 text-sm" style={{ color: '#8b8fa8' }}>
          Déjà un compte ?{' '}
          <Link to="/login" style={{ color: '#e11d7a', fontWeight: '600' }}>
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}

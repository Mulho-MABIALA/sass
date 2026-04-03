import { useState } from 'react'
import Toggle from '../components/ui/Toggle'
import Modal from '../components/ui/Modal'

const sections = ['Général', 'Apparence', 'Notifications', 'Sécurité', 'Zone de danger']

const colors = [
  { name: 'Violet', value: '#8b3dff' },
  { name: 'Bleu', value: '#3b82f6' },
  { name: 'Émeraude', value: '#10b981' },
  { name: 'Ambre', value: '#f59e0b' },
  { name: 'Rose', value: '#ec4899' },
]

const modes = [
  { id: 'light', label: 'Clair', icon: '☀️' },
  { id: 'dark', label: 'Sombre', icon: '🌙' },
  { id: 'auto', label: 'Auto', icon: '💻' },
]

export default function Parametres() {
  const [active, setActive] = useState('Général')
  const [color, setColor] = useState('#8b3dff')
  const [mode, setMode] = useState('light')
  const [deleteModal, setDeleteModal] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const [toast, setToast] = useState(false)

  const save = () => {
    setToast(true)
    setTimeout(() => setToast(false), 3000)
  }

  return (
    <div className="space-y-5 relative">
      <div>
        <h1 className="text-xl font-extrabold text-gray-900">Paramètres</h1>
        <p className="text-sm text-gray-500">Gérez la configuration de votre espace</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Left nav */}
        <div className="xl:col-span-1">
          <nav className="card p-2 space-y-0.5 xl:sticky xl:top-24">
            {sections.map(s => (
              <button key={s} onClick={() => setActive(s)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition ${active === s ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                {s}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="xl:col-span-3 space-y-5">
          {active === 'Général' && (
            <div className="card space-y-5">
              <h2 className="section-title">Informations générales</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise</label>
                  <input className="input-field text-sm" defaultValue="SaasPanel Corp."/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email de contact</label>
                  <input className="input-field text-sm" defaultValue="admin@saaspanel.io"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input className="input-field text-sm" defaultValue="+33 1 00 00 00 00"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Devise</label>
                  <select className="input-field text-sm">
                    <option>FCFA — XOF</option>
                    <option>USD — $</option>
                    <option>GBP — £</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                  <input className="input-field text-sm" defaultValue="12 rue de la Paix, 75001 Paris"/>
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={save} className="btn-primary text-sm">Enregistrer</button>
              </div>
            </div>
          )}

          {active === 'Apparence' && (
            <div className="space-y-4">
              <div className="card space-y-4">
                <h2 className="section-title">Couleur d'accentuation</h2>
                <div className="flex gap-3 flex-wrap">
                  {colors.map(c => (
                    <button key={c.value} onClick={() => setColor(c.value)}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition ${color === c.value ? 'border-gray-800 scale-105' : 'border-transparent hover:border-gray-300'}`}>
                      <div className="w-8 h-8 rounded-full shadow" style={{ background: c.value }}/>
                      <span className="text-xs text-gray-600">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="card space-y-4">
                <h2 className="section-title">Mode d'affichage</h2>
                <div className="grid grid-cols-3 gap-3">
                  {modes.map(m => (
                    <button key={m.id} onClick={() => setMode(m.id)}
                      className={`py-5 rounded-xl border-2 flex flex-col items-center gap-2 transition ${mode === m.id ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <span className="text-2xl">{m.icon}</span>
                      <span className={`text-sm font-semibold ${mode === m.id ? 'text-brand-700' : 'text-gray-600'}`}>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={save} className="btn-primary text-sm">Appliquer</button>
              </div>
            </div>
          )}

          {active === 'Notifications' && (
            <div className="card space-y-5">
              <h2 className="section-title">Préférences de notifications</h2>
              {[
                { label: 'Nouvelles commandes', desc: 'Recevoir une alerte pour chaque nouvelle commande' },
                { label: 'Stock faible', desc: 'Alerte quand un produit passe sous le seuil critique' },
                { label: 'Nouveaux clients', desc: 'Notification lors d\'une inscription client' },
                { label: 'Résumé hebdomadaire', desc: 'Rapport de performance envoyé chaque lundi' },
              ].map(({ label, desc }) => (
                <div key={label} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{label}</p>
                    <p className="text-xs text-gray-400">{desc}</p>
                  </div>
                  <Toggle defaultChecked={true}/>
                </div>
              ))}
              <div className="flex justify-end">
                <button onClick={save} className="btn-primary text-sm">Enregistrer</button>
              </div>
            </div>
          )}

          {active === 'Sécurité' && (
            <div className="space-y-4">
              <div className="card space-y-4">
                <h2 className="section-title">Changer le mot de passe</h2>
                {['Mot de passe actuel', 'Nouveau mot de passe', 'Confirmer le nouveau'].map(l => (
                  <div key={l}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{l}</label>
                    <input type="password" className="input-field text-sm" placeholder="••••••••"/>
                  </div>
                ))}
                <div className="flex justify-end">
                  <button onClick={save} className="btn-primary text-sm">Mettre à jour</button>
                </div>
              </div>
              <div className="card space-y-4">
                <h2 className="section-title">Double authentification</h2>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Activer la 2FA</p>
                    <p className="text-xs text-gray-400">Sécurisez votre compte avec un code OTP</p>
                  </div>
                  <Toggle defaultChecked={false}/>
                </div>
              </div>
            </div>
          )}

          {active === 'Zone de danger' && (
            <div className="card border-red-200 ring-1 ring-red-100 space-y-4">
              <h2 className="text-base font-bold text-red-600">Zone de danger</h2>
              <p className="text-sm text-gray-600">Les actions ci-dessous sont irréversibles. Soyez prudent.</p>
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Supprimer le compte</p>
                  <p className="text-xs text-gray-400">Toutes vos données seront définitivement supprimées</p>
                </div>
                <button onClick={() => setDeleteModal(true)}
                  className="text-sm font-semibold px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition">
                  Supprimer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete confirm modal */}
      <Modal open={deleteModal} onClose={() => setDeleteModal(false)} title="Supprimer le compte">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Cette action est <strong>irréversible</strong>. Toutes vos données, commandes et clients seront définitivement supprimés.</p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tapez <strong>SUPPRIMER</strong> pour confirmer</label>
            <input className="input-field text-sm" placeholder="SUPPRIMER" value={confirmText} onChange={e => setConfirmText(e.target.value)}/>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setDeleteModal(false)} className="btn-secondary flex-1 text-sm">Annuler</button>
            <button
              disabled={confirmText !== 'SUPPRIMER'}
              className={`flex-1 text-sm font-semibold py-2 px-4 rounded-xl transition ${confirmText === 'SUPPRIMER' ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
              Supprimer définitivement
            </button>
          </div>
        </div>
      </Modal>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[100] bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-slide-up">
          <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
          Paramètres enregistrés avec succès
        </div>
      )}
    </div>
  )
}

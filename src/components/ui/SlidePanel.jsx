export default function SlidePanel({ open, onClose, title, subtitle, children, footer }) {
  return (
    <>
      <div className={`overlay fixed inset-0 bg-black/30 backdrop-blur-sm z-40 ${open ? 'open' : ''}`} onClick={onClose} />
      <div className={`slide-panel fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col ${open ? 'open' : ''}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 transition">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">{footer}</div>}
      </div>
    </>
  )
}

export default function Badge({ children, color = 'gray' }) {
  const colors = {
    green:  'bg-emerald-100 text-emerald-700',
    amber:  'bg-amber-100 text-amber-700',
    blue:   'bg-blue-100 text-blue-700',
    red:    'bg-red-100 text-red-700',
    purple: 'bg-brand-100 text-brand-700',
    gray:   'bg-gray-100 text-gray-600',
    teal:   'bg-teal-100 text-teal-700',
    orange: 'bg-orange-100 text-orange-700',
  }
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${colors[color] || colors.gray}`}>
      {children}
    </span>
  )
}

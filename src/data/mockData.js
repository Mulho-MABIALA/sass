export const products = [
  {
    id: 1, name: 'Casque Audio Pro X200', category: 'Électronique', sku: 'CAP-001',
    price: 45000, promoPrice: null, stock: 12, maxStock: 50,
    status: 'actif', popular: true, recommended: false,
    variants: ['Noir', 'Blanc'], imageUrl: '',
    value: 540000,
  },
  {
    id: 2, name: 'T-Shirt Premium Oversize', category: 'Vêtements', sku: 'TPO-002',
    price: 8500, promoPrice: 12000, stock: 3, maxStock: 100,
    status: 'actif', popular: false, recommended: true,
    variants: ['S', 'M', 'L'], imageUrl: '',
    value: 25500,
  },
  {
    id: 3, name: 'Montre Connectée Sport', category: 'Accessoires', sku: 'MCS-003',
    price: 75000, promoPrice: null, stock: 0, maxStock: 30,
    status: 'inactif', popular: false, recommended: false,
    variants: ['42mm', '46mm'], imageUrl: '',
    value: 0,
  },
]

export const orders = [
  { id: 'CMD-2024-001', client: 'Amadou Diallo', phone: '77 234 56 78', product: 'Casque Audio Pro X200', amount: 45000, date: '03/04/2026', status: 'attente' },
  { id: 'CMD-2024-002', client: 'Fatou Traoré',  phone: '70 987 65 43', product: 'T-Shirt Premium Oversize', amount: 8500,  date: '02/04/2026', status: 'livraison' },
  { id: 'CMD-2024-003', client: 'Moussa Koné',   phone: '66 123 45 67', product: 'Montre Connectée Sport', amount: 75000, date: '01/04/2026', status: 'livree' },
  { id: 'CMD-2024-004', client: 'Ibrahim Sow',   phone: '78 456 78 90', product: 'Casque Audio Pro X200', amount: 45000, date: '01/04/2026', status: 'attente' },
  { id: 'CMD-2024-005', client: 'Aïssatou Ba',   phone: '62 789 01 23', product: 'T-Shirt × 2',           amount: 17000, date: '31/03/2026', status: 'livree' },
  { id: 'CMD-2024-006', client: 'Oumar Diop',    phone: '75 321 09 87', product: 'Montre Connectée Sport', amount: 75000, date: '30/03/2026', status: 'livraison' },
]

export const clients = [
  { id: 1, name: 'Amadou Diallo', phone: '77 234 56 78', email: 'amadou@email.com', address: 'Dakar, Sénégal',  type: 'vip',     orders: 3, total: 120000, panier: 40000, date: '02/04/2026', color: 'brand' },
  { id: 2, name: 'Fatou Traoré',  phone: '70 987 65 43', email: 'fatou@email.com',  address: 'Abidjan, CI',     type: 'fidele',  orders: 2, total: 25500,  panier: 12750, date: '02/04/2026', color: 'pink' },
  { id: 3, name: 'Moussa Koné',   phone: '66 123 45 67', email: 'moussa@email.com', address: 'Bamako, Mali',    type: 'nouveau', orders: 1, total: 75000,  panier: 75000, date: '01/04/2026', color: 'emerald' },
  { id: 4, name: 'Ibrahim Sow',   phone: '78 456 78 90', email: 'ibrahim@email.com',address: 'Dakar, Sénégal',  type: 'nouveau', orders: 1, total: 45000,  panier: 45000, date: '01/04/2026', color: 'orange' },
  { id: 5, name: 'Aïssatou Ba',   phone: '62 789 01 23', email: 'aissatou@email.com',address:'Conakry, Guinée', type: 'fidele',  orders: 2, total: 17000,  panier: 8500,  date: '31/03/2026', color: 'purple' },
  { id: 6, name: 'Oumar Diop',    phone: '75 321 09 87', email: 'oumar@email.com',  address: 'Saint-Louis, SN', type: 'nouveau', orders: 1, total: 75000,  panier: 75000, date: '30/03/2026', color: 'blue' },
]

export const stockMovements = [
  { id: 1, product: 'Casque Audio Pro X200', sku: 'CAP-001', type: 'entree', qty: 20,  supplier: 'TechFournit SA',  date: '02/04/2026' },
  { id: 2, product: 'T-Shirt Premium Oversize', sku: 'TPO-002', type: 'sortie', qty: -5, supplier: '—', date: '01/04/2026' },
  { id: 3, product: 'Casque Audio Pro X200', sku: 'CAP-001', type: 'ajustement', qty: -8, supplier: '—', date: '30/03/2026' },
  { id: 4, product: 'Montre Connectée Sport', sku: 'MCS-003', type: 'entree', qty: 30, supplier: 'Accessoires Pro', date: '28/03/2026' },
]

export const categories = ['Électronique', 'Vêtements', 'Accessoires']

export const suppliers = [
  { id: 1, name: 'TechFournit SA',  phone: '77 123 45 67', email: 'tech@fournit.sn', color: 'brand' },
  { id: 2, name: 'Accessoires Pro', phone: '70 987 65 43', email: 'info@accpro.com',  color: 'emerald' },
]

export const statusConfig = {
  attente:   { label: 'En attente',   bg: 'bg-amber-100',   text: 'text-amber-700',   dot: 'bg-amber-500' },
  livraison: { label: 'En livraison', bg: 'bg-blue-100',    text: 'text-blue-700',    dot: 'bg-blue-500' },
  livree:    { label: 'Livrée',       bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  annulee:   { label: 'Annulée',      bg: 'bg-red-100',     text: 'text-red-700',     dot: 'bg-red-500' },
}

export const clientTypeConfig = {
  vip:     { label: '⭐ VIP',     bg: 'bg-amber-100',  text: 'text-amber-700' },
  fidele:  { label: '♻ Fidèle',  bg: 'bg-teal-100',   text: 'text-teal-700' },
  nouveau: { label: '✦ Nouveau', bg: 'bg-blue-100',   text: 'text-blue-700' },
}

export const avatarColors = {
  brand:   'bg-brand-100 text-brand-600',
  pink:    'bg-pink-100 text-pink-600',
  emerald: 'bg-emerald-100 text-emerald-600',
  orange:  'bg-orange-100 text-orange-600',
  purple:  'bg-purple-100 text-purple-600',
  blue:    'bg-blue-100 text-blue-600',
}

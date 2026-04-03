import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Produits from './pages/Produits'
import Commandes from './pages/Commandes'
import Clients from './pages/Clients'
import Stock from './pages/Stock'
import Analytics from './pages/Analytics'
import Parametres from './pages/Parametres'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/produits" element={<Produits />} />
          <Route path="/commandes" element={<Commandes />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/parametres" element={<Parametres />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Checkout from './pages/Checkout'
import Success from './pages/Success'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import api from './lib/api'

function App() {
  useEffect(() => {
    // Don't count admin pages as visits
    if (window.location.pathname.startsWith('/admin')) return

    // Count once per browser session (refreshes don't add extra counts)
    if (sessionStorage.getItem('visit_counted')) return
    sessionStorage.setItem('visit_counted', '1')

    api.post('/api/visits').catch(() => {})
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/layout/ProtectedRoute'

function App() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<h1 className="text-white p-8">Homepage coming soon</h1>} />
        <Route
  path="/test-protected"
  element={
    <ProtectedRoute>
      <h1 className="text-white p-8">You're logged in — this is protected content.</h1>
    </ProtectedRoute>
  }
/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
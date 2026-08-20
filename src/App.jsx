import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<h1 className="text-white p-8">Homepage coming soon</h1>} />
      </Routes>
    </div>
  )
}

export default App
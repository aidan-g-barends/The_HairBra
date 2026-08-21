import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import Hero from './components/layout/home/Hero'
import About from './components/layout/home/About'
import Services from './components/layout/home/Services'
import Barbers from './components/layout/home/Barbers'

function App() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Services />
              <Barbers />
            </>
          }
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
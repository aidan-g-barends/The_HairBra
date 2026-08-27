import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import Hero from './components/layout/home/Hero'
import AboutSection from './components/layout/home/About'
import Services from './components/layout/home/Services'
import BarbersPreview from './components/layout/home/Barbers'
import Products from './components/layout/home/Products'
import Reviews from './components/layout/home/Reviews'
import About from './pages/About'
import Barbers from './pages/Barbers'
import BarberProfile from './pages/BarberProfile'
import Booking from './pages/Booking'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Dashboard from './pages/Dashboard'

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
              <AboutSection />
              <Services />
              <BarbersPreview />
              <Products />
              <Reviews />
            </>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/barbers" element={<Barbers />} />
        <Route path="/barbers/:id" element={<BarberProfile />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
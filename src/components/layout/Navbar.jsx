import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

function Navbar() {
  const { itemCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-black text-white px-6 py-4 border-b border-surface-bright">
      <div className="flex justify-between items-center">
        <Link to="/" className="font-display text-xl text-primary">The Hairbra</Link>

        <div className="hidden md:flex items-center gap-6 font-body text-sm">
          <Link to="/" className="text-on-surface-variant hover:text-primary transition-colors">Home</Link>
          <Link to="/about" className="text-on-surface-variant hover:text-primary transition-colors">About</Link>
          <Link to="/barbers" className="text-on-surface-variant hover:text-primary transition-colors">Barbers</Link>
          <Link to="/shop" className="text-on-surface-variant hover:text-primary transition-colors">Shop</Link>
          <Link
            to="/booking"
            className="bg-primary text-on-primary uppercase text-xs font-semibold px-4 py-2 rounded-lg"
          >
            Book Appointment
          </Link>
        </div>

        <div className="hidden md:block">
          <Link to="/cart" className="text-on-surface-variant hover:text-primary transition-colors relative">
            Cart
            {itemCount > 0 && (
              <span className="ml-1 bg-primary text-on-primary text-xs px-1.5 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-on-surface text-2xl"
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 pt-6 pb-2 font-body text-sm">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors">Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors">About</Link>
          <Link to="/barbers" onClick={() => setMenuOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors">Barbers</Link>
          <Link to="/shop" onClick={() => setMenuOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors">Shop</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors">
            Cart {itemCount > 0 && `(${itemCount})`}
          </Link>
          <Link
            to="/booking"
            onClick={() => setMenuOpen(false)}
            className="bg-primary text-on-primary uppercase text-xs font-semibold px-4 py-2 rounded-lg text-center"
          >
            Book Appointment
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
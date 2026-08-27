import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { signOut } from '../../services/authService'
import { useCart } from '../../context/CartContext'

function Navbar() {
  const { user } = useAuth()
  const { itemCount } = useCart()

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center border-b border-surface-bright">
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

      <div className="flex items-center gap-4 font-body text-sm">
        <Link to="/cart" className="text-on-surface-variant hover:text-primary transition-colors relative">
          Cart
          {itemCount > 0 && (
            <span className="ml-1 bg-primary text-on-primary text-xs px-1.5 py-0.5 rounded-full">
              {itemCount}
            </span>
          )}
        </Link>

        {user ? (
          <>
            <span className="hidden sm:inline text-on-surface-variant">{user.email}</span>
            <button onClick={signOut} className="text-primary">Log Out</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-on-surface-variant hover:text-primary transition-colors">Login</Link>
            <Link to="/register" className="text-primary">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
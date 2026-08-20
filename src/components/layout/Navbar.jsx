import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { signOut } from '../../services/authService'

function Navbar() {
  const { user } = useAuth()

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold">The Hairbra</Link>
      <div className="space-x-4">
        {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={signOut} className="text-amber-400">Log Out</button>
          </>
        ) : (
          <Link to="/login" className="text-amber-400">Login / Sign Up</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
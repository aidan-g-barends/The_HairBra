import { useAuth } from '../../context/AuthContext'
import { signOut } from '../../services/authService'

function Navbar() {
  const { user } = useAuth()

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <span className="font-bold">The Hairbra</span>
      <div className="space-x-4">
        {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={signOut} className="text-amber-400">Log Out</button>
          </>
        ) : (
          <span className="text-amber-400">Login / Sign Up</span>
        )}
      </div>
    </nav>
  )
}

export default Navbar
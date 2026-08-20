import { useAuth } from '../../context/AuthContext'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <p className="text-white bg-black p-8">Loading...</p>
  if (!user) return <p className="text-white bg-black p-8">Please log in.</p>

  return children
}

export default ProtectedRoute
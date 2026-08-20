import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const { user, loading } = useAuth()

  if (loading) return <p className="text-white bg-black p-8">Checking auth...</p>

  if (user) {
    return (
      <div className="text-white bg-black p-8">
        <p>Logged in as: {user.email}</p>
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen">
      <Login />
      <Register />
    </div>
  )
}

export default App
import { useState } from 'react'
import { signIn } from '../services/authService'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-black text-white p-8 max-w-sm mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Log In</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 bg-white text-black rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 bg-white text-black rounded"
      />

      {error && <p className="text-red-400">{error}</p>}

      <button type="submit" className="bg-amber-400 text-black p-2 w-full">
        Log In
      </button>
    </form>
  )
}

export default Login
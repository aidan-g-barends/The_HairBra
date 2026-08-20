import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signUp } from '../services/authService'

function Register() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const { error } = await signUp(email, password, fullName)

    if (error) {
      setError(error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-black text-white p-8 max-w-sm mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Sign Up</h1>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-2 bg-white text-black rounded"
        />

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
          Create Account
        </button>
      </form>

      <p className="text-white text-center mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-amber-400">Log in</Link>
      </p>
    </>
  )
}

export default Register
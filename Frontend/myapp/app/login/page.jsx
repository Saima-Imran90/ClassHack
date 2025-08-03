'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      const storedUser = JSON.parse(localStorage.getItem('user'))

      if (
        storedUser &&
        storedUser.email === form.email &&
        storedUser.password === form.password
      ) {
        localStorage.setItem('isLoggedIn', 'true')
        router.push('/dashboard')
      } else {
        alert('Invalid credentials')
      }

      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-300 to-blue-900 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="email" type="email" placeholder="Email" required className="w-full border p-2 rounded" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" required className="w-full border p-2 rounded" onChange={handleChange} />
          <button type="submit" disabled={loading} className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700">
            {loading ? 'Please wait...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a></p>
      </div>
    </div>
  )
}

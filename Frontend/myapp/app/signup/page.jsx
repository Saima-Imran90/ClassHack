'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Signup() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(form))
      setLoading(false)
      router.push('/login')
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-300 to-blue-900 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" type="text" placeholder="Name" required className="w-full border p-2 rounded" onChange={handleChange} />
          <input name="email" type="email" placeholder="Email" required className="w-full border p-2 rounded" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" required className="w-full border p-2 rounded" onChange={handleChange} />
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            {loading ? 'Please wait...' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a></p>
      </div>
    </div>
  )
}

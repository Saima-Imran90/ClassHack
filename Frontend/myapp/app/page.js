'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div>
      <main className="text-center mt-20 px-4">
        <h2 className="text-4xl font-bold text-white mb-4">Welcome to A&S app</h2>
        <p className="text-lg text-white">Your simple task manager with authentication</p>
      </main>
    </div>
  )
}

'use client'
import { useState } from 'react'
import Link from 'next/link'
import './globals.css' // make sure Tailwind CSS is imported

export default function RootLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-yellow-100 to-blue-900">
        {/* Navbar */}
        <nav className="bg-gradient-to-br from-yellow-200 to-blue-400 shadow p-4 flex justify-between items-center sticky top-0 z-50">
          <Link href="/" className="text-xl font-bold text-white">
            A&S app
          </Link>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
            

            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow-md w-32 z-10">
                <Link
                  href="/signup"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Page Content */}
        <main>{children}</main>
      </body>
    </html>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { to: '/about', label: 'About' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/contact', label: 'Contact' },
]

export default function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="pt-6">
      <nav className="liquid-glass rounded-xl px-4 py-2">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="font-playfair text-2xl font-semibold tracking-tight text-white hover:text-gray-200 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Water Tanker Hub
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm text-white hover:text-gray-300 transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-white/10 transition-colors"
            aria-expanded={mobileOpen}
            aria-controls="site-nav-mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <ul
            id="site-nav-mobile-menu"
            className="md:hidden mt-3 flex flex-col gap-1 border-t border-white/10 pt-3"
          >
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="block rounded-lg px-2 py-2 text-sm text-white hover:bg-white/10 hover:text-gray-200 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  )
}

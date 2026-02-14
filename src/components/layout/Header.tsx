import { NavLink } from 'react-router-dom'
import { Droplets } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  return (
    <header className="border-b border-primary/20 bg-background">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors"
          >
            <Droplets className="w-8 h-8" aria-hidden />
            <span className="text-xl font-bold">Water Tanker</span>
          </NavLink>
          <ul className="flex flex-wrap gap-6">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-primary'
                        : 'text-primary/70 hover:text-primary'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

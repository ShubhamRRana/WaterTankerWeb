import { Link } from 'react-router-dom'
import { VIDEO_BUTTON_PRIMARY } from '../../lib/videoTheme'

const navLinks = [
  { to: '/about', label: 'About' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/contact', label: 'Contact' },
]

export default function SiteNav() {
  return (
    <header className="pt-6">
      <nav className="liquid-glass flex items-center justify-between rounded-xl px-4 py-2">
        <Link
          to="/"
          className="text-2xl font-semibold tracking-tight text-white hover:text-gray-200 transition-colors"
        >
          Water Tanker
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
        <Link to="/contact" className={VIDEO_BUTTON_PRIMARY}>
          Contact Us
        </Link>
      </nav>
    </header>
  )
}

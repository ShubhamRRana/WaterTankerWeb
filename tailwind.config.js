/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
      colors: {
        primary: "#3e5c76",
        accent: "#fca311",
        background: "#f0ebd8",
      },
      spacing: {
        'page-y': 'clamp(2rem, 5vw, 4rem)',
        'section': 'clamp(1.5rem, 3vw, 2.5rem)',
      },
      fontSize: {
        'fluid-hero': ['clamp(2.25rem, 5vw + 1.5rem, 4.5rem)', { lineHeight: '1.1' }],
        'fluid-lead': ['clamp(1.0625rem, 1.5vw + 0.875rem, 1.25rem)', { lineHeight: '1.6' }],
        'fluid-tagline': ['clamp(1.25rem, 2vw + 0.875rem, 1.5rem)', { lineHeight: '1.35' }],
        'fluid-card-title': ['clamp(1.0625rem, 1.25vw + 0.875rem, 1.125rem)', { lineHeight: '1.3' }],
        'fluid-card-desc': ['clamp(0.875rem, 1vw + 0.75rem, 0.9375rem)', { lineHeight: '1.45' }],
        'fluid-nav-logo': ['clamp(1.375rem, 2.5vw + 0.75rem, 1.5rem)', { lineHeight: '1.2' }],
        'fluid-nav-link': ['clamp(0.9375rem, 1vw + 0.8125rem, 1rem)', { lineHeight: '1.4' }],
      },
    },
  },
  plugins: [],
}

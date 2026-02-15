/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3e5c76",
        accent: "#fca311",
        background: "#f0ebd8",
      },
      spacing: {
        'page-y': 'clamp(2rem, 5vw, 4rem)',
        'section': 'clamp(1.5rem, 3vw, 2.5rem)',
      },
    },
  },
  plugins: [],
}

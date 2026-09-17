/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'heritage-gold': '#F59E0B',
        'heritage-gold-dark': '#D97706',
        'heritage-gold-light': '#FDE68A',
        'heritage-saffron': '#FF6B35',
        'dark-bg': '#0B0F19',
        'dark-surface': '#111827',
        'dark-card': 'rgba(22, 30, 49, 0.75)',
        'dark-card-hover': 'rgba(30, 41, 68, 0.9)',
        'dark-border': 'rgba(255, 255, 255, 0.08)',
        'gold-border': 'rgba(245, 158, 11, 0.35)',
      },
      fontFamily: {
        serif: ['Cinzel', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(245, 158, 11, 0.25)',
        'card-elevated': '0 15px 35px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}

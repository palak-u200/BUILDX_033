/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0b0f19',
        surface: '#111827',
        surfaceLight: '#1f2937',
        primary: '#3b82f6',
        primaryHover: '#2563eb',
        accent: '#06b6d4',
        critical: '#ef4444',
        warning: '#f59e0b',
        safe: '#10b981',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

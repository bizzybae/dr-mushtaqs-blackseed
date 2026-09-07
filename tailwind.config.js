/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#171614',
        cream: '#f4f0e8',
        brass: '#bb8c4b',
        sand: '#e6dfd4',
        clay: '#d9c7a9',
        muted: '#746e63'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace']
      }
    }
  },
  plugins: []
}

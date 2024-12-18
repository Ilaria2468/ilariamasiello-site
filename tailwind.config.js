/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
      },
      colors: {
        'brand': '#ea8f90',
        'brand-light': '#f2a5a6',
        'brand-dark': '#d27778',
        'gold': '#B8860B',
        'gold-light': '#DAA520',
      },
    },
  },
  plugins: [],
};
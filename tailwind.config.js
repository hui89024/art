/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'evasion-black': '#121212',
        'evasion-grey': '#111111',
        'evasion-stone': '#1a1a1a',
        'evasion-sand': '#D2C4A7',
        'evasion-sand-dark': '#B5A68A',
        'accent': '#A3A3A3',
      },
      fontFamily: {
        sans: ['STKaiti', 'KaiTi', 'STXingkai', 'HanziPen SC', 'Ma Shan Zheng', 'FZKai-Z03', 'Songti SC', 'serif'],
        display: ['STXingkai', 'STKaiti', 'KaiTi', 'HanziPen SC', 'serif'],
      },
      spacing: {
        '1440': '1440px',
      }
    }
  },
  plugins: [],
}
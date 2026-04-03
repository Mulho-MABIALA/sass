/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fff0f7',
          100: '#ffd6eb',
          200: '#ffadd8',
          300: '#ff75be',
          400: '#f43da0',
          500: '#e11d7a',
          600: '#c4166a',
          700: '#a01057',
          800: '#830d47',
          900: '#6b0b3a',
        },
        dark: '#1a0012',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'rose': '0 4px 24px rgba(225,29,122,0.15)',
        'rose-lg': '0 8px 40px rgba(225,29,122,0.2)',
      },
    },
  },
  plugins: [],
}

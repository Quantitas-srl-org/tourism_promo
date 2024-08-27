/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '_includes/**/*.html',
    '_layouts/**/*.html',
    '*.markdown'
  ],
  theme: {
    fontFamily: {
      sans: ['Lato', 'Helvetica', 'sans-serif'],
    },
    colors: {
      'black': '#030520',
      'white': '#ffffff',
      'false-white': '#FDFCF6',
      'tan': '#EBE8E3',
      'accent': '#3FFD6A',
      'primary-dark': '#12275C', //'#13285E',
      'primary': '#1157AD',
      'secondary': '#00BD2B',
      'secondary-dark': '#005536',
    },
    extend: {},
  },
  plugins: [],
}


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
      'opacity': 'rgba(253, 252, 246, .7)',
      'transparent': 'rgba(253, 252, 246, 0)',
      'tan': '#EBE8E3',
      'tan-dark': '#B6B6B4',
      'accent': '#3FFD6A',
      'primary-dark': '#13285E',
      'primary': '#1157AD',
      'secondary': '#00BD2B',
      'secondary-dark': '#005536',
      'alert': '#B70101',
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}


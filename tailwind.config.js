module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    textColor: theme => ({
      ...theme('colors'),
      'logo': '#d3b674',
    }),
    backgroundColor: theme => ({  
      ...theme('colors'),
      'main': 'rgba(12, 39, 56)',
      'highlight': '#d3b674',
      'body': '#f5f5f5',
    }),
    borderColor: theme => ({
      ...theme('colors'),
      'highlight': '#d3b674',
      'gray': '#f3f3f3',
    }),
    extends: {
      translate: {
        'nav': '-100% - 4rem',
      },
      inset: {
        '17': '4.2rem'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

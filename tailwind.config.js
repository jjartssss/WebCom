/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        'jt-primary': '#087BB8',
        'jt-primary-bright': '#0093FB',
        'jt-primary-dark': '#0B0C63',
        'jt-primary-light': '#08B6D9',
        'jt-white': '#FBFFF1',
        'jt-dark': '#0A364D',
      }

    },
  },
  plugins: [],
}


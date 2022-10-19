module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ctbaliengreen': '#5EFF9E',
        'ctbgray': '#1A1A1A',
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Dana', 'sans-serif'],
      },
      colors: {
        primary: {
          blue: '#00B6C7',
          turquoise: '#00D4AA',
          orange: '#FF6B35',
        },
      },
    },
  },
  plugins: [],
}

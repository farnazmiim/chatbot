/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IRANSans', 'sans-serif'],
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

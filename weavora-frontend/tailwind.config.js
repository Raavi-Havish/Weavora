/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        weavora: {
          light: '#e0aefa', // Your light purple
          dark: '#5b1e88',  // Your dark purple
        }
      }
    },
  },
  plugins: [],
}
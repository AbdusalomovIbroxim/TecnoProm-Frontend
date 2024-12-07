/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{vue,js,ts,jsx,tsx}", // для всех файлов в папке pages
    "./components/**/*.{vue,js,ts,jsx,tsx}", // для всех файлов в папке components
    // './components/**/*.{vue,js}',
    // './layouts/**/*.vue',
    // './pages/**/*.vue',
    // './plugins/**/*.{js,ts}',
    // './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


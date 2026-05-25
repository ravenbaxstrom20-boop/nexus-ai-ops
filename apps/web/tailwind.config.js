/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          900: '#1e1b4b',
        },
        blue: {
          600: '#2563eb',
        },
        emerald: {
          500: '#10b981',
        },
        slate: {
          50: '#f8fafc',
        },
      },
    },
  },
  plugins: [],
}

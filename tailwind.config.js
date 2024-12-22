/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f49232',
          dark: '#d97b1c',
        }
      },
      borderRadius: {
        'hero': '60px',
      },
      maxWidth: {
        'container': '1200px',
      },
      boxShadow: {
        'form': '0 4px 20px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
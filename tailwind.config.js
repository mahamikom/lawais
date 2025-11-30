/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#1a1a1a',
          card: '#2a2a2a',
          border: '#3a3a3a',
          hover: '#333333',
        },
        light: {
          bg: '#ffffff',
          card: '#f9fafb',
          border: '#e5e7eb',
          hover: '#f3f4f6',
        }
      },
    },
  },
  plugins: [],
}

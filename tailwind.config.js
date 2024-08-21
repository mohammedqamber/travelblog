/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3498db',      // Light Blue
        secondary: '#2ecc71',    // Light Green
        accent: '#e74c3c',       // Coral Red
        background: '#ecf0f1',   // Light Grey
        textPrimary: '#2c3e50',  // Dark Slate Grey
        cardBg: '#ffffff',       // White
        buttonBg: '#2980b9',     // Blue
        navbarBg: '#34495e',     // Dark Blue Grey
        footerBg: '#4b6b82',
      },
    },
  },
  plugins: [],
}
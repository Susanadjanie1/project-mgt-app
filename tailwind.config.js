/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class', // essential for manual toggling
    theme: {
      extend: {
        colors: {
          primary: '#4B0082', // Indigo
          accent: '#FFD700',  // Gold
          lightBg: '#F9FAFB',
          darkBg: '#1F2937',
          lightText: '#1F2937',
          darkText: '#E5E7EB',
        },
      },
    },
    plugins: [],
  };
  
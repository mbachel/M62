/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './app/**/*.{ts,tsx,js,jsx,html}', './public/**/*.html'],
  // Use class strategy so toggling the `dark` class works
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};

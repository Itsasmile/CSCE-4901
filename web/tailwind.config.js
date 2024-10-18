/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This line tells Tailwind to scan all JS, JSX, TS, and TSX files in the src folder
  ],
  theme: {
    extend: {
      // Add your custom theme modifications here
    },
  },
  plugins: [],
};

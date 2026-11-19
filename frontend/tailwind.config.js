/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#effaf6",
          100: "#dff3ea",
          500: "#198f78",
          600: "#137762",
          900: "#234957",
        },
      },
      fontFamily: {
        sans: ["Quicksand", "sans-serif"],
        display: ["Quicksand", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
      },
    },
  },
  plugins: [],
};

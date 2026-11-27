import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pastel: {
          purple: "#524480",
          purpleLight: "#F3EEFA",
          purpleSoft: "#D4BBF2",
          blue: "#3B6998",
          blueLight: "#E8F2FA",
          blueSoft: "#A8C7EC",
          yellow: "#C4931A",
          yellowLight: "#FFF9DE",
          yellowSoft: "#FCE68C",
        },
        brand: {
          50: "#FFF9DE",
          100: "#F3EEFA",
          200: "#E3EFFB",
          500: "#524480",
          600: "#3B6998",
          700: "#3E3263",
          800: "#262040",
          900: "#1A152E",
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        display: ["Poppins", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

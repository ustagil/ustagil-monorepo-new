const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: colors.zinc,
        primary: {
          50: "#fbf1ec",
          100: "#f3d5c5",
          200: "#ecba9e",
          300: "#e49e78",
          400: "#dc8251",
          500: "#d4662b",
          600: "#ae5423",
          700: "#87411b",
          800: "#602f13",
          900: "#3a1c0c",
        },
        secondary: {
          50: "#f0f7f5",
          100: "#d3e6e2",
          200: "#b5d5cf",
          300: "#98c4bc",
          400: "#7ab3a9",
          500: "#5da296",
          600: "#4c857b",
          700: "#3b6760",
          800: "#2a4a44",
          900: "#192c29",
        },
        accent: colors.orange,
        background: colors.black,
      },
    },
  },
  plugins: [],
};

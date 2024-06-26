/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0052CC",
          light: "#2684FF",
          dark: "#003E99",
        },
        secondary: {
          DEFAULT: "#36B37E",
          light: "#79F2C0",
          dark: "#006644",
        },
        neutral: {
          white: "#FFFFFF",
          lightGray: "#F4F5F7",
          mediumGray: "#A0A4A8",
          darkGray: "#42526E",
          black: "#172B4D",
        },
        accent: {
          yellow: "#FFAB00",
          red: "#FF5630",
        },
      },
    },
  },
  plugins: [],
};

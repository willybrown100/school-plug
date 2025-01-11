/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(to bottom, #E6E4FF, #ffffff)",
      },
      colors: {
        secondary400: "#72a0e7",
        secondary500: "#4e88e1",
        secondary600: "#2161c3",
        secondary700: "#2161c3",
      },
      fontFamily: {
        heading: "Inter,sans-serif",
      },
      screens: {
        // Define custom max-width breakpoints
        "max-sm": { max: "766px" }, // Up to 639px
        "max-md": { max: "767px" }, // Up to 767px
        "max-lg": { max: "1023px" }, // Up to 1023px
        "max-xl": { max: "1279px" }, // Up to 1279px
      },
    },
    fontFamily: {
      heading: "Inter,sans-serif",
    },
  },
  plugins: [],
};

// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary500: "#4e88e1",
        secondary600: "#2161c3",
        secondary700: "#2161c3",
      },
      fontFamily: {
        fontHeading: "Inter,sans-serif",
        fontbody: "",
      },
    },
  },
  plugins: [],
};


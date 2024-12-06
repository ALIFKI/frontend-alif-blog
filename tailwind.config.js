/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgDark: "#151418",
        primary: "#242329",
        secondary: "#3171D6",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"], // Set Poppins as the default sans font
        poppins: ["Poppins", "sans-serif"], // Optional: Add a separate class
      },
    },
  },
  plugins: [],
};

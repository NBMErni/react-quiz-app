/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      backgroundImage: {
        "light-mobile": "url('public/images/mobile.svg')",
        "dark-mobile": "url('public/images/mobile-dark.svg')",
      },
    },
  },
  plugins: [],
};

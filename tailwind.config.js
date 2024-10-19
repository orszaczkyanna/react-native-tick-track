// import { Colors } from "./constants/Colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#090521",
          100: "#201E37",
        },
        accent: {
          DEFAULT: "#1B75DE",
          100: "#004699",
        },
        foreground: {
          DEFAULT: "#E8E8E8",
          100: "#E1E1E1",
          200: "#89869F",
        },
      },
      fontFamily: {
        monregular: ["Montserrat-Regular"],
        monmedium: ["Montserrat-Medium"],
        inconsolata: ["Inconsolata-Regular"],
      },
    },
  },
  plugins: [],
};

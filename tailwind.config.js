/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        mobileResaleTheme: {
          primary: '#4a7887',
          secondary: '#19D3AE',
          accent: "#A2A5BE",
          neutral: "#000000",
          'base-100': "#FFFFFF",
        },
      },
      {
        dark: {
          primary: '#4a7887',
          secondary: "#1F2937", //black
          accent: "#1F2937",
          neutral: "#ffffff", //text-white
          "base-100": "#1F2937", //bg-black
          "base-200": "#1F2937", //for btn
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      brand: "#FF499B",
      "brand-disabled": "#FFA4CD",
      "brand-50": "#FFEBF5",
      "brand-100": "#FFD7EB",
      "brand-200": "#FFC2E2",
      "brand-300": "#FFAED8",
      "brand-400": "#FF99CF",
      "brand-500": "#FF85C5",
      "brand-600": "#FF70BC",
      "brand-700": "#FF5CB2",
      "brand-800": "#FF47A9",
      "brand-900": "#FF339F",
      "brand-950": "#FF1E96"
    }
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          primary: "#FF499B"
        },
        night: {
          ...require("daisyui/src/theming/themes")["[data-theme=night]"],
          primary: "#FF499B"
        }
      }
    ]
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")]
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      brand: "#FF499B"
    }
  },
  daisyui: {
    themes: ["light", "night"]
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")]
}

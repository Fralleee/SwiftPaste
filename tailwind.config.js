/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  purge: ["./src/**/*.{js,jsx,ts,tsx}"], // update this line
  daisyui: {
    themes: ["cupcake"]
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")]
}

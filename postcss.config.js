const prefixSelector = require("postcss-prefix-selector")

const rootPrefix = ".swiftPasteRoot"

module.exports = {
  plugins: [
    require("tailwindcss"),
    prefixSelector({
      prefix: rootPrefix,
      transform: function (prefix, selector, prefixedSelector) {
        if (selector === "html" || selector === "body") {
          return `${selector} ${rootPrefix}`
        }
        return `${rootPrefix} ${prefixedSelector}`
      }
    }),
    require("autoprefixer")
  ]
}

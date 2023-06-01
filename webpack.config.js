const path = require("path")
const glob = require("glob")
const CopyWebpackPlugin = require("copy-webpack-plugin")

const fileNames = glob.sync("./src/scripts/**/*.{ts,js}", { nodir: true }).reduce((acc, file) => {
  const fileName = path.basename(file, path.extname(file))
  return { ...acc, [fileName]: `./${file}` }
}, {})

module.exports = {
  entry: fileNames,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "manifest.json", to: "." },
        { from: "src/images/*.png", to: "images/[name][ext]" },
        { from: "src/html/*.html", to: "[name][ext]" },
        { from: "src/styles/*.css", to: "[name][ext]" }
      ]
    })
  ]
}

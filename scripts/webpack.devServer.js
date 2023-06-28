const { merge } = require("webpack-merge")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlPlugin = require("html-webpack-plugin")
const config = require("./webpack.config.js") // Update the import statement
const path = require("path")

module.exports = merge(config, {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: path.resolve("src/sandbox/index.tsx"),
  devServer: {
    static: path.join("src/static"),
    compress: true,
    port: 3000,
    hot: true
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "../dist/sandbox")
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    new HtmlPlugin({
      template: path.resolve("src/template.html"),
      filename: "index.html",
      inject: "body"
    })
  ]
})

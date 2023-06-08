const { merge } = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const common = require("./webpack.config.js")
const path = require("path")

module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: path.resolve(__dirname, "src/sandbox/index.tsx"),
  devServer: {
    static: {
      directory: path.join(__dirname, "src/static")
    },
    compress: true,
    port: 3000,
    hot: true
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist/sandbox")
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/sandbox/index.html"),
      filename: "index.html",
      inject: "body"
    })
  ]
})

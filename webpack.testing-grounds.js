const { merge } = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const common = require("./webpack.config.js")
const path = require("path")

module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: path.resolve(__dirname, "src/testing-grounds/index.tsx"),
  devServer: {
    compress: true,
    port: 9000,
    hot: true
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist/testing-grounds")
  },
  plugins: [
    ...common.plugins,
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/testing-grounds/index.html"),
      filename: "index.html",
      inject: "body"
    })
  ]
})

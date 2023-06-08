const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
const HtmlPlugin = require("html-webpack-plugin")
const tailwindcss = require("tailwindcss")
const autoprefixer = require("autoprefixer")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    serviceWorker: path.resolve("src/service-worker.ts"),
    inject: path.resolve("src/inject/index.ts"),
    popup: path.resolve("src/popup/index.tsx"),
    options: path.resolve("src/options/index.tsx")
  },
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader", // postcss loader needed for tailwindcss
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: [tailwindcss, autoprefixer]
              }
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: ["svg-inline-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("src/static"),
          to: path.resolve("dist/plugin")
        },
        {
          from: path.resolve("src/static"),
          to: path.resolve("dist/testing-grounds")
        }
      ]
    }),
    ...getHtmlPlugins(["popup", "options"])
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist/plugin")
  },
  optimization: {
    splitChunks: {
      chunks(chunk) {
        return chunk.name !== "contentScript"
      }
    }
  }
}

function getHtmlPlugins(chunks) {
  return chunks.map(
    chunk =>
      new HtmlPlugin({
        title: "SwiftPaste",
        filename: `${chunk}.html`,
        chunks: [chunk]
      })
  )
}

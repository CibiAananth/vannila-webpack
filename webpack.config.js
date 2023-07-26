const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlPlugins = require("./scripts/html-plugin");
const entries = require("./scripts/entry-plugin");

console.log(entries);

module.exports = {
  entry: entries,
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: { directory: path.join(__dirname, "dist") },
    compress: true,
    port: 9000,
    client: {
      progress: true,
    },
    webSocketServer: "ws",
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: "/index.html" },
        { from: /^\/about/, to: "/about/index.html" },
        { from: /^\/contact/, to: "/contact/index.html" },
        { from: /./, to: "/404.html" }, // Provide a custom catch-all route
      ],
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [].concat(htmlPlugins),
};

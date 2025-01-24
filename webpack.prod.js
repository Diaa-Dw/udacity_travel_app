const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/client/index.js",
  mode: "development",
  devtool: "source-map",
  output: {
    libraryTarget: "var",
    library: "Client",
    publicPath: "/",
  },
  stats: "verbose",
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"], // Processes HTML files to handle image imports
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource", // Handles image files
        generator: {
          filename: "assets/images/[name][hash][ext][query]", // Customize output directory
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
  ],
  devServer: {
    static: path.resolve("./dist"),
    port: 3000,
    open: false,
    hot: true,
    allowedHosts: "all",
  },
};

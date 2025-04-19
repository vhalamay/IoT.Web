/// <binding />
"use strict";
var path = require("path");
var WebpackNotifierPlugin = require("webpack-notifier");
var BrowserSyncPlugin = require("browser-sync-webpack-plugin");
module.exports = {
  entry: ['babel-polyfill', "./wwwroot/js/react/index.js"],
  output: {
    path: path.resolve(__dirname, "./wwwroot/js"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ]
  },
  devtool: "inline-source-map",
  plugins: [new WebpackNotifierPlugin(), new BrowserSyncPlugin()],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  }
};
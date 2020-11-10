const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development"; //for babel to know

module.exports = {
  mode: "development", //set node_env to development and disable production fetures
  target: "web",
  devtool: "cheap-module-source-map", //we can see original code in browser
  entry: "./src/index",
  //it put our app in memory
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/", //public url of output directory when it reference in browser
    filename: "bundle.js", //it is reference to HTML serves from memory
  },

  //webpack server in development setting
  devServer: {
    stats: "minimal", //status in cmd is minimun short and noiseless
    overlay: true, //overlay any error which occures in browser
    historyApiFallback: true, //all request sent to index.html - handle by react router
    //opem issue in webpack due to lattest version of chrome
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html", //where to look for file
      favicon: "src/favicon.ico",
    }),
  ],
  module: {
    //what files we want to handle
    rules: [
      {
        test: /\.(js|jsx)$/, //find js or jsx file
        exclude: /node_modules/, //ignore it
        use: ["babel-loader", "eslint-loader"],
        //what to do with the file, babel run in all our js, eslint check errors and webpack bundle that for us
        //rules run from bottom-up so eslint execute first than babel
      },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"], //allow us to import css and webpack bundle css into single file
      },
    ],
  },
};

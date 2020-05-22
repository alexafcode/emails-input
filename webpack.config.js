const path = require("path");

module.exports = (env, argv) => ({
  entry: ["./src/index.js"],
  output: {
    filename: "./emails-editor.js",
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    watchContentBase: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
});

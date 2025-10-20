const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");

const USE_ANALYZER = false;
const analyzerPlugin = USE_ANALYZER ? [new BundleAnalyzerPlugin()] : [];

module.exports = {
  entry: "./src/client/index.tsx",
  mode: "development",
  watch: true,
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist/client"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      maxSize: 20000
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/index.html",
      filename: "index.html",
    }),
    ...analyzerPlugin,
  ],
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"],
  },
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, exclude: /node_modules/, loader: "ts-loader" },
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-typescript"]],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        use: ["file-loader"],
      },
    ],
  },
};

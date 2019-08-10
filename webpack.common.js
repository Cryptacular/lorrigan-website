const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const isDev = process.env.NODE_ENV === "development";

module.exports = {
  entry: {
    index: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        include: /node_modules\/inkjs\/dist\/ink-es2015\.js/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /\.css$/,
        use: [
          isDev ? "vue-style-loader" : MiniCSSExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: isDev } }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      automaticNameMaxLength: 30,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [new VueLoaderPlugin()],
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      vue$: isDev ? "vue/dist/vue.js" : "vue/dist/vue.min.js",
      inkjs$: "inkjs/dist/ink.js"
    }
  },
  devtool: "none"
};

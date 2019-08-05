const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "bundle.js"
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.js"
    }
  }
};

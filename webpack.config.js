module.exports = {
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    filename: "index.js"
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader" },
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  }
};

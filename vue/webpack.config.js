const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  output: {
    publicPath: "http://localhost:8082/"
  },

  resolve: {
    extensions: [".tsx", ".ts", ".vue", ".jsx", ".js", ".json"]
  },

  devServer: {
    port: 8082,
    historyApiFallback: true
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.tsx?$/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              appendTsSuffixTo: ["\\.vue$"],
              happyPackMode: true
            }
          }
        ]
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: "vue",
      filename: "remoteEntry.js",
      remotes: {
        host: "host@http://localhost:8080/remoteEntry.js"
      },
      exposes: {
        "./Counter/wrapper": "./src/Counter/wrapper.ts"
      },
      shared: require("./package.json").dependencies
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html"
    })
  ]
};

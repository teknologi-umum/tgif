const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "http://localhost:8081/"
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"]
  },

  devServer: {
    port: 8081,
    historyApiFallback: true
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "solid",
      filename: "remoteEntry.js",
      remotes: {
        host: "host@http://localhost:8080/remoteEntry.js"
      },
      exposes: {
        "./Counter": "./src/Counter/index.tsx",
        "./Counter/wrapper": "./src/Counter/wrapper.ts"
      },
      shared: {
        ...deps,
        "solid-js": {
          singleton: true,
          requiredVersion: deps["solid-js"]
        }
      }
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html"
    })
  ]
};

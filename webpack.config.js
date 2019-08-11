const WebpackDeepScopeAnalysisPlugin = require("webpack-deep-scope-plugin")
  .default;
const PurifyCSSPlugin = require("purifycss-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const glob = require("glob");
const argv = require("yargs-parser")(process.argv.slice(2));
const merge = require("webpack-merge");
const _mode = argv.mode || "development";
const _modeFlag = _mode === "production" ? true : false;
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const webpackConfig = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          //   "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: "../",
              hmr: process.env.NODE_ENV === "development"
            }
          },
          {
            loader: "css-loader"
            // options: {
            //   modules: {
            //     mode: "local",
            //     localIdentName: "[path][name]__[local]--[hash:base64:5]"
            //   }
            // }
          }
        ]
      }
    ]
  },
  devServer: {
    port: 3000,
    hot: true,
    before(app) {
      app.get("/api/test", (req, res) => {
        res.json({
          code: 200,
          message: "kkk"
        });
      });
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: "initial",
          name: "common",
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0
        }
      }
    },
    runtimeChunk: {
      name: "runtime"
    }
  },
  plugins: [
    new WebpackDeepScopeAnalysisPlugin(),
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync(path.join(__dirname, "./dist/*.html"))
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: _modeFlag ? "styles/[name].[hash:5].css" : "styles/[name].css",
      chunkFilename: _modeFlag ? "styles/[id].[hash:5].css" : "styles/[id].css",
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html"
    })
  ]
};

module.exports = merge(_mergeConfig, webpackConfig);

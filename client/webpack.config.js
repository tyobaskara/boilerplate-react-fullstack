const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const devMode = process.env.NODE_ENV !== 'production';

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
    entry: "./src/index.js",
    output: {
      path: path.resolve('dist'),
      filename: 'bundled.js'
    },
    devtool: "source-map",
    devServer: {
      proxy: {
        '/api/*': {
            target: 'http://localhost:5000',
            secure: false
        }
      },
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
          test: /\.(sa|sc|c)ss$/,
          use: [{
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
          }, {
              loader: "css-loader", options: {
                  sourceMap: devMode ? true : false,
                  minimize: devMode ? false : true,
                  outputStyle: devMode ?  'expanded' : 'compressed'
              }
          }, {
              loader: "sass-loader", options: {
                  sourceMap: devMode ? true : false,
                  minimize: devMode ? false : true,
                  outputStyle: devMode ?  'expanded': 'compressed'
              }
          }]
        },
        { 
          test: /\.(eot|ttf|woff|woff2svg|jpe?g|png|gif|ico)$/, 
          use: 'file-loader?name=./static/media/[name].[ext]' 
        }
      ]
    },  
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    plugins: [
      htmlPlugin,
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
      })
    ]
  };
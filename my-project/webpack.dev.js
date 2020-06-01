'use strict';

const path = require('path');
const webpack = require('webpack')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [//链式调用从右到左 先执行css-loader 在执行style-loader
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require("autoprefixer")({
                  browsers: ['last 2 version', '> 1%', 'ios 7']
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024000
            }
          }
        ]
      },
      {
        test: /.(otf|ttf)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
}


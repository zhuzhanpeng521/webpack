'use strict';

const path = require('path');
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const glob = require("glob")


const setMPA = () => {
  const entry = {};
  const HtmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.join(__dirname,'/src/*/index.js'))
// [ 'C:/Users/pactera/Desktop/webpack/my-project/src/index/index.js',
// 'C:/Users/pactera/Desktop/webpack/my-project/src/search/index.js' ]
  //筛选pagename

  entryFiles.map( index => {
    const match = index.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[pageName] = index


    HtmlWebpackPlugins.push(new HtmlWebpackPlugin({
      template: path.join(__dirname, `src/${pageName}/index.html`),
      filename: `${pageName}.html`,
      chunks: [pageName],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }))
    
  })

  return {
    entry,
    HtmlWebpackPlugins
  }
}

const {entry, HtmlWebpackPlugins} = setMPA()
console.log(entry)



module.exports = {
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [//链式调用从右到左 先执行css-loader 在执行style-loader
          MiniCssExtractPlugin.loader,
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
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8

            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name][hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /.(otf|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name][hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new optimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    })
  ].concat(HtmlWebpackPlugins)
}
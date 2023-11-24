const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 相对路径转为绝对路径
const resolvePath = _path => resolve(__dirname, _path)

module.exports = {
  mode: 'development',
  entry: resolvePath('./src/index.js'),
  output: {
    path: resolvePath('./dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  module: {
    rules: [
      // banner
      // {
      //   test: /\.js$/,
      //   loader: 'banner-loader',
      //   options: {
      //     author: 'Guangxin',
      //     date: '2023-11-24',
      //   },
      // },
      // babel
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   options: {
      //     presets: ['@babel/preset-env'],
      //   },
      // },
      // clean-log
      // {
      //   test: /\.js$/,
      //   loader: 'clean-log-loader',
      // },
      // style
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'],
      // },
    ],
  },
  resolveLoader: {
    modules: [
      // 默认在 node_modules 与 src/loaders 目录下寻找 loader
      'node_modules',
      resolvePath('./src/loaders'),
    ],
  },
}

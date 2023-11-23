const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'Loader',
    }),
  ],
  module: {
    rules: [
      // prefix comment
      {
        test: /\.js$/i,
        loader: './src/loaders/banner-loader',
        exclude: /node_modules/,
        options: {
          author: 'Guangxin',
          date: '2023-11-23',
        },
      },
      // clean-log
      {
        test: /\.js$/i,
        loader: './src/loaders/clean-log-loader',
        exclude: /node_modules/,
      },
      // images
      // {
      //   test: /\.(png|jpe?g|gif|svg)$/i,
      //   loader: './src/loaders/file-loader',
      //   // 让 webpack 把这些资源当成 js 处理
      //   // 不要使用内部的资源处理程序去处理
      //   type: 'javascript/auto',
      // },
      // {
      //   test: /\.(png|jpe?g|gif|svg)$/i,
      //   loader: './src/loaders/url-loader',
      //   type: 'javascript/auto',
      //   options: {
      //     limit: 1024 * 500,
      //   },
      // },
      // {
      //   test: /\.(png|jpe?g|gif|svg)$/i,
      //   loader: './src/loaders/file-loader',
      //   type: 'javascript/auto',
      //   options: {
      //     quality: 50,
      //   },
      // },
      // css
      {
        test: /\.css$/i,
        use: ['./src/loaders/style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
      // uglify-loader
      // {
      //   test: /\.js$/i,
      //   loader: './src/loaders/uglify-loader',
      //   exclude: /node_modules/,
      // },
      // babel-loader
      // {
      //   test: /\.js$/i,
      //   loader: './src/loaders/babel-loader',
      //   exclude: /node_modules/,
      //   options: {
      //     presets: ['@babel/preset-env'],
      //   },
      // },
    ],
  },
}

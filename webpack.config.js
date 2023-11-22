const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPlugin = require('./src/plugins/html-webpack-plugin.js')
const BannerWebpackPlugin = require('./src/plugins/banner-webpack-plugin.js')
const AnalyzeWebpackPlugin = require('./src/plugins/analyze-webpack-plugin.js')
const CleanWebpackPlugin = require('./src/plugins/clean-webpack-plugin.js')
const CopyWebpackPlugin = require('./src/plugins/copy-webpack-plugin.js')
const DefineWebpackPlugin = require('./src/plugins/define-webpack-plugin.js')
const Md2HtmlWebpackPlugin = require('./src/plugins/md2html-webpack-plugin.js')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    // clean: true,
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: './public/index.html',
    //   title: 'Plugin',
    // }),
    new BannerWebpackPlugin({
      name: 'Guangxin'
    }),
    new AnalyzeWebpackPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      from: path.resolve(__dirname, './public/static'),
      to: path.resolve(__dirname, './dist/static'),
    }),
    // new DefineWebpackPlugin({
    //   BASE_URL: 'http://api/dev.com',
    //   ENV: 'development',
    // }),
    new Md2HtmlWebpackPlugin({
      from: path.resolve(__dirname, './src/docs'),
      to: path.resolve(__dirname, './dist/docs'),
    }),
  ],
}

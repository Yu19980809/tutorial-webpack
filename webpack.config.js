const path = require('path')
const HtmlWebpckPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpckPlugin({ title: 'PWA' }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  // devServer: {
  //   devMiddleware: {
  //     index: true,
  //     writeToDisk: true,
  //   },
  // },
}

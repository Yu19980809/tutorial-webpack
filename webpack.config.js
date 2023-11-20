const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    polyfills: './src/polyfill.js',
    index: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      // 将 this 的指向修改为 window 对象
      {
        test: require.resolve('./src/index.js'),
        use: 'imports-loader?wrapper=window',
      },
      // 全局导出，之后就可以使用 const { file } = require('./globl.js')
      {
        test: require.resolve('./src/global.js'),
        use: 'exports-loader?type=commonjs&exports=file,multiple|helpers.parse|parse'
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      // _: 'lodash',
      join: ['lodash', 'join'],
    }),
  ],
}

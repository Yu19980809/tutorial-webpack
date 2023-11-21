const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // 开启 css 模块，避免多人协作开发时的样式命名冲突
              modules: true,
            },
          },
          'postcss-loader'
        ],
      },
    ],
  },
}

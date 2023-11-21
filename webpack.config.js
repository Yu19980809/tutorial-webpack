const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // 模块路径解析
  resolve: {
    // 设置文件路径别名
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils/')
    },
    // 默认配置的优先级，安装数组中的顺序去解析文件
    extensions: ['.js', '.json', '.txt'],
  },
  // 外部扩展
  externals: {
    l: 'lodash',  // 在逻辑文件中就可以使用 import _ from l 来引入 lodash 中的内容
  },
}

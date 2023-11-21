const path = require('path')
const HtmlWebpckPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpckPlugin({ title: 'Federation' }),
    new ModuleFederationPlugin({
      name: 'nav',  // 模块联邦名称
      filename: 'remoteEntry.js', // 外部访问的资源名字
      remotes: {},  // 引用的外部资源列表
      exposes: {  // 暴露给外部的资源列表
        './Header': './src/Header.js'
      },
      shared: {}, // 共享模块，如 ladash
    }),
  ],
}

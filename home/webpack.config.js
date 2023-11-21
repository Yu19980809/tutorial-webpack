const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({ title: 'Federation' }),
    new ModuleFederationPlugin({
      name: 'home',
      filename: 'remoteEntry.js',
      remotes: {
        // 引用暴露出来的 nav 资源
        nav: 'nav@http://localhost:3000/remoteEntry.js'
      },
      exposes: {},
      shared: {},
    }),
  ],
}

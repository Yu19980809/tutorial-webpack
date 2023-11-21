const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    print: './src/print.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    port: 3000,
    // 添加响应头信息
    // headers: {
    //   'test': 'This is a testing message'
    // },

    // 开启代理
    // proxy: {
    //   // '/api', 'http://localhost: 4000',
    //   '/api': {
    //     target: 'http://localhost: 4000',
    //     pathRewrite: { '^/api', '' },
    //   }
    // },

    // 控制访问路由的响应页面
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /^\/$/, to: '/views/landing.html' },
    //     { from: /./, to: '/views/404.html' },
    //   ],
    // },
    
    // 开发服务器主机
    // 在同一局域网下的其他设备可以通过 ip 来访问当前服务
    // host: '0.0.0.0',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development'
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    runtimeChunk: 'single',
  },
}

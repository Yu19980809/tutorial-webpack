const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const toml = require('toml')
const yaml = require('yamljs')
const json5 = require('json5')

/**
 * 资源模块类型（asset module type）
 * 
 *  + asset/resource  => 发送一个单独的文件并导出 URL
 *  + asset/inline    => 导出一个资源的 data URI
 *  + asset/source    => 导出资源的源代码
 *  + asset           => 在 resource 和 inline 中自动选择：
 *                        小于 8kb 的文件会自动选择 inline，否则会选择 resource
 */

/**
 * 处理 CSS
 *  +++ 单独打包
 *  + 使用 MiniCssExtractPlugin.loader 代替 style-loader，会将 css 单独打包成一个文件，而不是嵌入 html 中
 *  + 注意：需要在 plugins 中使用 MiniCssExtractPlugin 设置打包后的文件路径
 * 
 *  +++ 压缩
 *  + optimization 中设置 minimizer
 */

/**
 * 处理 JS
 * 
 *  + babel-loader      => 解析 ES6 的桥梁
 *  + @babel/core       => babel 核心模块
 *  + @babel/preset-env => babel 预设，一组 babel 插件的集合
 */

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // 设置打包的静态资源的路径，以下写法会放入 /dist/assets 目录下
    // assetModuleFilename: 'assets/[contenthash][ext][query]'
  },
  module: {
    rules: [
      // css
      {
        test: /\.css$/i,
        // 将 css 嵌入 html 中
        // use: ['style-loader', 'css-loader'],
        // 将 css 单独打包，搭配 plugins 使用
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      // image
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        // 设置静态资源打包后的路径，优先级高于 assetModuleFilename
        // 以下示例，打包后会放入 /dist/images 目录下
        generator: {
          filename: 'images/[contenthash][ext][query]'
        },
      },
      // font
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      // csv
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      // xml
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
      // json parser
      {
        test: /\.toml$/i,
        type: 'json',
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
      },
      // js
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
  plugins: [
    // 设置打包后的 css 文件路径
    new MiniCssExtractPlugin({
      filename: 'styles/[contenthash].css'
    })
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ],
  },
}

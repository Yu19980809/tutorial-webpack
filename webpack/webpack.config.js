const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

// 获取 cross-env 环境变量
const isEnvProduction = process.env.NODE_ENV === 'production'

// 相对路径转绝对路径
const resolvePath = _path => resolve(__dirname, _path)

const getStyleLoaders = prevLoader => {
  return [
    // 生产环境将 css 打包成单独的文件，开发环境则将其嵌入 html 中
    isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',
    // 开发环境缓存 css 文件
    !isEnvProduction && 'cache-loader',
    'css-loader',
    {
      // 处理 css 兼容问题
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['postcss-preset-env']
        }
      }
    },
    prevLoader
  ].filter(Boolean)
}

module.exports = {
  mode: isEnvProduction ? 'production' : 'development',
  entry: resolvePath('../src/index.js'),
  output: {
    path: isEnvProduction ? resolvePath('../dist') : undefined,
    filename: isEnvProduction ? 'scripts/[name].[contenthash:10].js' : 'scripts/[name].js',
    chunkFilename: isEnvProduction ? 'scripts/[name].[contenthash:10].chunk.js' : 'scripts/[name].chunk.js',
    assetModuleFilename: 'assets/img/[hash:10][ext][query]',
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          // css
          {
            test: /\.css$/i,
            use: getStyleLoaders()
          },
          // less
          {
            test: /\.less$/i,
            use: getStyleLoaders('less-loader')
          },
          // sass | scss
          {
            test: /\.s[ac]ss$/i,
            use: getStyleLoaders('sass-loader')
          },
          // images
          {
            test: /\.(jpe?g|png|gif|svg|webp)$/i,
            type: 'asset',
            generator: {
              filename: 'assets/img/[hash:10][ext]',
            },
            parser: {
              dataUrlCondition: {
                // 小于 60kb 的图片会被转化为 base64
                maxSize: 60 * 1024,
              },
            },
          },
          // fonts
          {
            test: /\.(woff2?|ttf|eot|otf)$/i,
            type: 'asset/resource',
          },
          // jsx
          {
            test: /\.(jsx?|tsx?)$/i,
            use: ['thread-loader', 'babel-loader'],
            include: resolvePath('../src'),
            options: {
              cacheDirectory: true, // 开启 babel 缓存
              cacheCompression: false,  // 关闭缓存压缩
              plugins: [
                !isEnvProduction && 'react-refresh/babel' // 开发环境激活 HMR
              ].filter(Boolean),
            },
          },
        ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolvePath('../public/index.html')
    }),
    isEnvProduction && new MiniCssExtractPlugin({
      filename: isEnvProduction ? 'style/[name].[contenthash:10].css' : 'style/[name].css',
      chunkFilename: isEnvProduction ? 'style/[name].[contenthash:10].chunk.css' : 'style/[name].chunk.css',
    }),
    new EslintWebpackPlugin({
      context: resolvePath('../src'),
      exclude: 'node_modules',
      cache: true,
      cacheLocation: resolvePath('../node_modules/.cache/.eslintCache')
    }),
    !isEnvProduction && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': resolvePath('../src'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  },
  devtool: isEnvProduction ? false : 'cheap-module-source-map',
  devServer: {
    host: 'localhost',
    port: 8080,
    open: true,
    hot: true,
    // 使用 index.html 代替所有 404 页面
    historyApiFallback: true,
  },
  optimization: {
    // 代码分离
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // 将 react react-dom react-router-dom 一起打包
        react: {
          test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
          name: 'chunk-react',
          // 优先级，打包 react 相关依赖时，不会被打入 node_modules 中的 chunk
          priority: 10
        },
        // node_modules 单独打包
        lib: {
          test: /[\\/]node_modules[\\/]/,
          name: 'chunk-libs',
          priority: 1
        },
      },
    },
    // 运行时的 chunk 文件
    // 作用是将包含 chunk 映射关系的列表从 main.js 中抽离出来
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}.js`
    },
    // 是否需要开启压缩
    minimize: isEnvProduction,
    // 压缩 css
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ],
  },
  performance: false, // 关闭性能分析，提升打包速度
}

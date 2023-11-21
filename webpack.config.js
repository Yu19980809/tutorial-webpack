const path = require('path')

/**
 * 代码分离的三种方式
 * 
 *  + 入口起点  => 使用 entry 配置手动分离代码
 *  + 防止重复  => 使用 Entry dependencies 或 SplitChunksPlugin 去重和分离 chunk
 *  + 动态导入  => 通过模块的内联函数(如 import)调用来分离代码
 */

// 1、入口起点，指定多个
// module.exports = {
//   mode: 'development',
//   entry: {
//     index: './src/index.js',
//     another: './src/another-module.js',
//   },
//   output: {
//     filename: '[name].bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//     clean: true,
//   },
// }

// 2.1、入口依赖（如两个文件都引入了 lodash）
// module.exports = {
//   mode: 'development',
//   entry: {
//     index: {
//       import: './src/index.js',
//       dependOn: shared,
//     },
//     another: {
//       import: './src/another-module.js',
//       dependOn: shared
//     },
//     shared: 'lodash'
//   },
//   output: {
//     filename: '[name].bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//     clean: true,
//   },
//   optimization: {
//     runtimeChunk: 'single',
//   },
// }

// 2.2、SplitChunksPlugin
// module.exports = {
//   mode: 'development',
//   entry: {
//     index: './src/index.js',
//     another: './src/another-module.js',
//   },
//   output: {
//     filename: '[name].bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//     clean: true,
//   },
//   optimization: {
//     splitChunks: {
//       chunks: 'all',
//     },
//   },
// }

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
}

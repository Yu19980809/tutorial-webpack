/**
 * 功能
 *  + 将图片输出到打包结果中
 *  + 将打包结果的图片路径替换代码的路径
 * 
 * 说明
 *  + file-loader 是一个 raw loader
 *  + 它接受的内容是二进制的图片数据
 */

const loaderUtils = require('loader-utils')

module.exports = function (content, map = null, meta = {}) {
  // 是否被 url-loadr 处理过，处理或的话返回 base64
  const {url, base64} = meta
  if (url) return `module.exports = "${base64}"`
  // 根据当前的上下文，生成一个文件路径
  const interpolateName = loaderUtils.interpolateName(
    this,
    'assets/[name].[contenthash].[ext][query]',
    {content}
  )

  // webpack 特有方法，生成一个文件
  this.emitFile(interpolateName, content)
  return `module.exports = "${interpolateName}"`
}

// 添加标记，表示这是一个 raw loader
module.exports.raw = true

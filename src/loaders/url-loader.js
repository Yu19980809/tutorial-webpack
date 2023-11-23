/**
 * 功能
 *  + 将一些小图片转成 base64 嵌入代码中
 *  + 从而省去一些网络请求的时间
 */

const {getExtByPath} = require('../utils')

const schema = {
  type: 'object',
  properties: {
    limit: {
      type: 'number'
    }
  }
}

module.exports = function (content) {
  // 默认值 500k
  const options = this.getOptions(schema) || {limit: 1024 * 500}
  const {limit} = options
  // 超过阈值，则返回原内容
  const size = Buffer.byteLength(content)
  if (size > limit) return content
  // 读取 buffer
  const buffer = Buffer.from(content)
  const ext = getExtByPath(this)
  // 将 buffer 转为 base64 字符串
  const nase64 = 'data: image/' + ext + ';base64,' + buffer.toString('base64')
  // 返回信息
  this.callback(null, content, null, {url: true, base64})
}

module.exports.raw = true

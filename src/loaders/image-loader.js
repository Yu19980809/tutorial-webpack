/**
 * 功能
 *  + 压缩图片
 */

const fs = require('fs')
const images = require('images')
const { getExtByPath } = require('../utils')

const schema = {
  type: 'object',
  properties: {
    quality: {
      type: 'number'
    }
  }
}

module.exports = function (content) {
  const options = this.getOptions(schema) || {quality: 50}
  const {quality} = options
  const ext = getExtByPath(this)
  const tempName = `./temp.${ext}`
  // 根据传入的压缩程度，生成一张新图片
  images(content).save(tempName, {quality})
  // 读取新图片的内容
  const newContent = fs.readFileSync(tempName)
  fs.unlinkSync(tempName)
  // 返回新图片的内容
  return newContent
}

module.exports.raw = true

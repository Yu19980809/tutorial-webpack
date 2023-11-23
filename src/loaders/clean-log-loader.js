/**
 * 功能
 *  + 清除检测到的所有 console.log 语句
 */

module.exports = function (content) {
  return content.replace(/console\.log\(.*\);?/g, '')
}

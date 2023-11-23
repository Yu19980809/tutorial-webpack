const fs = require('fs')
const path = require('path')

module.exports = async function (content) {
  const callback = this.async()
  let newContent = content
  try {
    newContent = await getImport(this, this.resourcePath, content)
    callback(null, `module.exports = ${JSON.stringify(newContent)}`)
  } catch (error) {
    callback(error, '')
  }
}

// 匹配图片
const urlReg = /url\(['|"](.*)['|"]\)/g

// 匹配 @import 关键字
const importReg = /(@import ['"](.*)['"];?)/

async function getImport(context, originPath, content) {
  let newContent = content
  let regRes, imgRes
  // 获取当前处理文件的父目录
  let absolutePath = originPath.slice(0, originPath.lastIndexOf('/'))
  // 如果当前文件中存在 @import 关键字，不断匹配处理
  while (regRes = importReg.exec(newContent)) {
    const importExp = regRes[1]
    const url = regRes[2]
    // 获取 @import 导入的 css 文件的绝对路径
    const fileAbsoluteUrl = url.startsWith('.') ? path.resolve(absolutePath, url) : url
    // 读取目录文件的内容
    const transformResult = fs.readFileSync(fileAbsoluteUrl, {encoding: 'utf8'})
    // 将 @import 关键字替换成读取的文件内容
    newContent = newContent.replaceAll(importExp, transformResult)
    // 继续递归处理
    newContent = await getImport(context, fileAbsoluteUrl, newContent)

    // 处理图片
    while (imgRes = urlReg.exec(newContent)) {
      const url = imgRes[1]
      // 获取 url 方式引入图片的父目录
      let absolutePath = fileAbsoluteUrl.slice(0, fileAbsoluteUrl.lastIndexOf('/'))
      // 获取引入图片的绝对路径
      const imgAbsoluteUrl = url.startsWith('.') ? path.resolve(absolutePath, url) : url
      if (fs.existsSync(imgAbsoluteUrl)) {
        // 调用图片相关 loader 处理
        const transformResult = await context.importModule(imgAbsoluteUrl, {})
        // 将图片 loader 处理完成的内容替换 url
        newContent = newContent.replaceAll(url, transformResult)
      }
    }
  }
}

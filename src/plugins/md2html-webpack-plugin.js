/**
 * 功能
 *  + 将 markdown 文件转换为 html 文件
 * 
 * 实现思路
 *  + 从配置中拿到需要转换的 markdowm 文档
 *  + 调用 marked 转换成 html 字符串
 *  + 将 html 字符串配合一些样式文件输出到 html 文件中
 *  + 输出文件到 dist 目录
 */

const fs = require('fs')
const { marked } = require('marked')
const { resolve } = require('path')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

class Md2HtmlWebpackPlugin {
  constructor(options = {}) {
    const {from, to} = options
    this.from = from
    this.to = to
  }

  apply(compiler) {
    compiler.hooks.emit.tap('Md2HtmlWebpackPlugin', compilation => {
      const {from, to} = this
      if (!fs.existsSync(from)) {
        throw new Error(`${from} is not fount`)
      }
      const files = fs.readdirSync(from)
      files.forEach(file => {
        const path = `${from}/${file}`
        // 调用 marked 进行转换
        const html = marked(fs.readFileSync(path, {encoding: 'utf8'}))
        let template = fs.readFileSync(
          resolve(__dirname, '../../public/template.html'),
          {encoding: 'utf8'}
        )

        // 替换模板文件的内容
        template= template.replace('#title#', file).replace('#content#', html)
        const theme = fs.readFileSync(resolve(__dirname, '../../public/theme.css'), {encoding: 'utf8'})
        const dom = new JSDOM(template)
        const document = dom.window.document
        const style = document.createElement('style')

        // 以内联的方式插入样式
        style.innerHTML = `${theme}`
        document.querySelector('head').appendChild(style)
        template = `<!DOCTYPE html>${document.querySelector('html').outerHTML}`
        const arr = to.split('/')
        const toName = arr[arr.length - 1]

        // 输出资源
        compilation.assets[`${toName}/${file.replace('.md', '.html')}`] = {
          source() {
            return template
          },
          size() {
            return template.length
          }
        }
      })
    })
  }
}

module.exports = Md2HtmlWebpackPlugin

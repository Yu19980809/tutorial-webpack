/**
 * 功能
 *  + 生成一个模板 html 文件
 *  + 并且把入口的文件导入到这个 html 文件中
 * 
 * 实现思路
 *  + 生成一个 html 文件
 *  + 注册 emit 钩子，找到入口文件，把入口文件通过标签的方式插入到 html 中
 *  + 将这个 html 文件输出到资源目录
 */

const { resolve } = require('path')
const fs = require('fs')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

class HtmlWebpackPlugin {
  constructor(options = {}) {
    // 获取模板文件和标题
    this.template = options.template || resolve(__dirname, './tenplate.html')
    this.title = options.title || 'Document'
  }

  apply(compiler) {
    compiler.hooks.emit.tap('HtmlWebpackPlugin', compilation => {
      // 找到入口文件
      this.entryFiles = this.getEntryFiles(compilation)
      // 给资源输出目录增加一个文件
      compilation.assets['index.html'] = this.genTemplate()
    })
  }

  // 获取所有入口文件
  getEntryFiles(compilation) {
    const entrypoints = compilation.entrypoints
    let entryFiles = []
    for (let entrypoint of entrypoints) {
      const chunks = entrypoint[1].chunks
      chunks.forEach(chunk => {
        const {files} = chunk
        files.forEach(file => {
          entryFiles.push(file)
        })
      })
    }
    return entryFiles
  }

  genTemplate() {
    const {template, title, entryFiles} = this
    // 读取模板文件
    let content = fs.readFileSync(template, {encoding: 'utf8'})
    // 生成类 dom 对象
    const dom = new JSDOM(content)
    // 获取文档标题
    const document = dom.window.document
    console.log(document)
    // 设置文档标题
    document.title = title
    // 创建标签并插入
    entryFiles.forEach(file => {
      const script = document.createElement('script')
      script.src = file
      script.setAttribute('defer', true)
      document.querySelector('head').appendChild(script)
    })
    // 生成新的内容字符串
    content = `<!DOCTYPE html>\n` + document.querySelector('html').outerHTML
    return {
      source() {
        return content
      },
      size() {
        return content.length
      }
    }
  }
}

module.exports = HtmlWebpackPlugin

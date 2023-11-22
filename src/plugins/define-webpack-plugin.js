/**
 * 功能
 *  + 根据环境的不同，给代码注入不同的变量值
 *  + 例如：测试环境和开发环境的接口地址
 * 
 * 实现思路
 *  + 注册 emit 钩子，找到所有的入口 js 文件
 *  + 在入口 js 文件中注入配置中填写的变量
 *  + 输出文件
 */

class DefineWebpackPlugin {
  constructor(options = {}) {
    this.options = options
  }

  // 注入变量
  genDefine() {
    const {options} = this
    let str = ''
    Object.keys(options).forEach(key => {
      const value = options[key]
      str += `window.${key} = ${JSON.stringify(value)}\n`
    })
    return str
  }

  apply(compiler) {
    compiler.hooks.emit.tap('DefineWebpackPlugin', compilation => {
      // 找到所有入口
      const entrypoints = compilation.entrypoints
      for (let entrypoint of entrypoints) {
        // 找到相关的 chunk
        const chunks = entrypoint[1].chunks
        chunks.forEach(chunk => {
          // 找到相关文件
          const files = chunk.files
          files.forEach(file => {
            const assets = compilation.assets
            // 获取文件的内容
            const content = assets[file].source()
            const define = this.genDefine()

            // 用新内容进行替换
            const newContent = `${define}${content}`
            assets[file] = {
              source() {
                return newContent
              },
              size() {
                return newContent.length
              }
            }
          })
        })
      }
    })
  }
}

module.exports = DefineWebpackPlugin

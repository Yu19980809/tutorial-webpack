/**
 * 功能：
 *  + 把某个文件或者文件夹拷贝到打包后的目录里
 *  + 例如：index.html 中的 icon 图标
 */

const fs = require('fs')
const childProcess = require('child_process')
const { ModuleFilenameHelpers } = require('webpack')

class CopyWebpackPlugin {
  constructor(options = {}) {
    const {from, to} = options
    this.from = from
    this.to = to
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap('CopyWebpackPlugin', compilation => {
      const {from, to} = this
      if (!fs.existsSync(from)) {
        throw new Error(`${from} is not found`)
      }
      childProcess.execSync(`cp -r ${from} ${to}`)
    })
  }
}

module.exports = CopyWebpackPlugin

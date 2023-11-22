/**
 * 功能：
 *  + 每次打包之后，将上一次打包的结果删除
 * 
 * 实现思路：
 *  + 注册 emit 钩子
 *  + 删除上次打包的文件，如果是文件夹则递归删除
 */

class CleanWebpackPlugin {
  apply(compiler) {
    // 获取输出路径
    const outputPath = compiler.options.output.path
    // webpack 提供的文件操作
    const fs = compiler.outputFileSystem
    compiler.hooks.emit.tap('emit', compilation => {
      this.removeFiles(fs, outputPath)
    })
  }

  removeFiles(fs, filePath) {
    // 读取目录下的文件，包括文件和文件夹
    const files = fs.readdirSync(filePath)
    files.forEach(file => {
      const path = `${filePath}/${file}`
      const fileStat = fs.statSync(path)
      // 判断是否为文件夹，如果是，则递归，是文件，则直接删除
      if (fileStat.isDirectory()) {
        this.removeFiles(fs, path)
      } else {
        fs.unlinkSync(path)
      }
    })
  }
}

module.exports = CleanWebpackPlugin

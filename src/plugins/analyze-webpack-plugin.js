/**
 * 功能
 *  + 分析打包输出后的资源大小
 *  + 并将结果输出到一个 markdown 文件中
 * 
 * 实现思路
 *  + 注册 emit 钩子，获取所有即将输出的资源文件
 *  + 计算每个文件的大小
 *  + 输出一个 markdown 文件
 */

class AnalyzeWebpackPlugin {
  apply(compiler) {
    // markdown 表格的头部
    let content = `| filename | size | --- | --- |`

    // 注册 emit 钩子
    compiler.hooks.emit.tap('AnalyzeWebpackPlugin', compilation => {
      const arr = []
      // 获取所有即将输出的资源
      Object.keys(compilation.assets).forEach(filename => {
        const file = compilation.assets[filename]
        // 资源大小转换为 kb
        const obj = {filename, size: Math.ceil(file.size() / 1024)}
        arr.push(obj)
      })

      // 降序排序
      arr.sort((a, b) => b.size - a.size)
      arr.forEach(item => {
        const {filename, size} = item
        const str = `| ${filename} | ${size}kb |`
        content += str + '\n'
      })

      // 输出 markdown 文件
      compilation.assets['analyze.md'] = {
        source() {
          return content
        },
        size() {
          return content.length
        }
      }
    })
  }
}

module.exports = AnalyzeWebpackPlugin

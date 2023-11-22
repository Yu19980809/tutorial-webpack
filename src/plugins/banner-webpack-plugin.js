class BannerWebpackPlugin {
  // 获取参数
  constructor(options = {}) {
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.emit.tap('BannerWebpackPlugin', compilation => {
      // 获取即将输出的资源
      const {assets} = compilation
      // 过滤文件，只处理 css、js 文件
      const files = Object.keys(assets).filter(filename => {
        const exts = ['js', 'css']
        const arr = filename.split('.')
        const fileExt = arr[arr.length - 1]
        return exts.includes(fileExt)
      })
      // 生成注释
      const prefix = `/*
      * Author: ${this.options.name}
      */`

      files.forEach(file => {
        // 获取资源内容
        const source = assets[file].source()
        const newContent = prefix + source
        // 重写资源对象的 source 和 size 方法
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
}

module.exports = BannerWebpackPlugin

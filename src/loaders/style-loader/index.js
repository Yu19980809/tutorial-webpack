// const fs = require('fs')
// const { resolve } = require('path')

// let id = 0
// module.exports = function (content) {
//   const temp = resolve(__dirname, `./${id++}.js`)
//   // 将 css-loader 生成的字符串写入文件
//   fs.writeFileSync(temp, content)
//   // 读出 module.exports
//   const res = require(temp)
//   fs.unlinkSync(temp)
//   // 插入样式
//   const insertStyle = `
//     const style = document.createElement('style);
//     style.innerHTML = ${JSON.stringify(res)};
//     document.head.appendChild(style);
//   `

//   return insertStyle
// }

module.exports = function (content) {}

module.exports.pitch = function (remainingRequest) {
  // 将绝对路径转为相对路径
  const resolvePath = remainingRequest.split('!')

  const script = `
    const style = document.createElement('style)
    style.innerHTML = ${JSON.stringify(content)}
    document.head.appendChild(style)
  `

  return script
}

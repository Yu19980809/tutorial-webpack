const childProcess = require('child_process')
const fs = require('fs')
const path = require('path')

const exec = (command, cb) => {
  childProcess.exec(command, (error, stdout) => {
    cb && cb(error, stdout)
  })
}

let id = 0
const schema = {
  type: 'object',
  properties: {
    fix: 'boolean'
  }
}

module.exports = function (content) {
  const resourcePath = this.resourcePath
  const callback = this.async()
  const {fix} = this.getOptions(schema) || {fix: false}
  if (fix) {
    const tempName = `./${id++}.js`
    const fullPath = path.resolve(__dirname, tempName)
    // 写入新文件
    fs.writeFileSync(fullPath, content, {encoding: 'utf8'})
    // 带 fix 检测新文件
    const command = `mpx eslint ${fullpath} --fix`
    exec(command, (error, stdout) => {
      if (error) console.log(stdout)
      // 读取新文件
      const newContent = fs.readFileSync(fullPath, {encoding: 'utf8'})
      fs.unlinkSync(fullPath)
      callback(null, newContent)
    })
  } else {
    const command = `npx eslint ${resourcePath}`
    exec(command, (error, stdout) => {
      if (error) console.log(stdout)
      callback(null, content)
    })
  }
}

const asyncLoader = function (content, map, meta) {
  console.log('asyncLoader')
  const callback = this.async()
  setTimeout(() => {
    console.log('asyncLoader again')
    // 调用 callback 后，才会执行下一个 loader
    callback(null, content, map, meta)
  }, 1000)
}

module.exports = asyncLoader

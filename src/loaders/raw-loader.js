const rawLoader = function (content) {
  console.log('rawLoader', content)
  return content
}

rawLoader.raw = true
module.exports = rawLoader

const syncLoader = function (content, map, meta) {
  console.log('syncLoader')
  this.callback(null, content, map, meta)
}

module.exports = syncLoader

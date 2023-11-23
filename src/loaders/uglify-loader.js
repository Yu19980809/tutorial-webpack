const uglifyJS = require('uglify-js')

module.exports = function (content) {
  const result = uglifyJS.minify(content)
  const {error, code} = result
  error
  ? this.callback(error)
  : this.callback(null, code)
}

const babel = require('@babel/core')
const schema = require('./schema.json')

module.exports = function (content) {
  const options = this.getOptions(schema)
  const callback = this.async()
  
  babel.transform(content, options, (err, res) => {
    err
    ? callback(err)
    : callback(null, res.code)
  })
}

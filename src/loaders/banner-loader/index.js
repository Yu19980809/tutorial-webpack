const schema = require('./schema.json')

module.exports = function (content) {
  const options = this.getOptions(schema)
  const prefix = `
    /*
    * Author: ${options.author}
    * Date: ${options.date}
    */
  `

  return prefix + content
}

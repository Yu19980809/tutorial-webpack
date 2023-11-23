const schema = {
  type: 'object',
  properties: {
    author: {
      type: 'string'
    },
    date: {
      type: 'string'
    }
  }
}

module.exports = function (content) {
  const options = this.getOptions(schema) || {}
  const {author = null, date = null} = options
  const newContent = `
    /**
     * @Author: "${author}"
     * @Date: "${date}"
     * */
  
    ${content}
  `
  return newContent
}

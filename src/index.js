function component() {
  const element = document.createElement('div')

  element.innerHTML = join(['Hello', 'webpack'], ' ')

  this.alert('Hmm, this probably isn\'t a gret idea...')

  return element
}

document.body.appendChild(component())

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(json => {
    console.log('We retrieved some data!', json)
  })
  .catch(error => {
    console.error('Something went wrong', error)
  })

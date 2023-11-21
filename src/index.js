import add from '@utils/add'

function component() {
  const element = document.createElement('div')
  element.innerHTML = 'Hello'

  console.log(add(1, 3))

  return element
}

document.body.appendChild(component())

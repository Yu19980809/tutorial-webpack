import HomeList from './HomeList'

import('nav/Header')
  .then(Header => {
    const element = document.createElement('div')
    element.appendChild(Header.default())
    element.innerHTML += HomeList(5)
    document.body.appendChild(element)
  })


// 在 webpack.config.js 中开启模块后，可以导入模块
import style from './style.css'

function component() {
  const element = document.createElement('div')
  element.innerHTML = 'Hello'
  element.classList.add(style.box)

  return element
}

document.body.appendChild(component())

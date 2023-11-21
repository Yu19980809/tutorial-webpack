// async function getComponent() {
//   const element = document.createElement('div')
//   const { default: _ } = await import('lodash') // 动态导入

//   element.innerHTML = _.join(['Hello', 'webpack'], '')

//   return element
// }

// getComponent().then((component) => {
//   document.body.appendChild(component)
// })

// prefetch/preload
function component() {
  const element = document.createElement('div')
  const btn1 = document.createElement('button')
  const btn2 = document.createElement('button')

  btn1.innerHTML = 'prefetch'
  btn1.addEventListener('click', () => {
    // prefetch 会在浏览器闲置事件获取文件
    // 所以这里的文件会在按钮点击之前就被加载
    import(/* webpackChunkName: 'math', webpackPrefetch: true */'./math.js')
      .then(({ add }) => console.log(add(4, 5)))
  })

  btn2.innerHTML = 'preload'
  btn2.addEventListener('click', () => {
    // preload 会在父 chunk 加载时，以并行方式进行加载
    import(/* webpackChunkName: 'print', webpackPreload: true */'./print.js')
      .then(({ print }) => print())
  })

  element.appendChild(btn1)
  element.appendChild(btn2)

  return element
}

document.body.appendChild(component())

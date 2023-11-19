import _ from 'lodash'
import './style.css'
import Icon from './webpack.jpeg'
// import xml from './data.xml'
// import csv from './data.csv'
// import toml from './data.toml'
// import yaml from './data.yaml'
// import json from './data.json5'

// console.log(toml.title)
// console.log(toml.owner.name)

// console.log(yaml.title)
// console.log(yaml.owner.name)

// console.log(json.title)
// console.log(json.owner.name)

function component() {
  const element = document.createElement('div')

  element.innerHTML = _.join(['Hello', 'webpack'], '')
  element.classList.add('hello')

  const myIcon = new Image()
  myIcon.src = Icon
  element.appendChild(myIcon)

  // console.log('XML', xml)
  // console.log('CSV', csv)

  return element
}

document.body.appendChild(component())

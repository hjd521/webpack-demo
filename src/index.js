import './index.css'
// import {join} from 'lodash'
// import react from 'react'
import test from './img/test.png'
import {say} from './js/feature.js'
import aa from './js/test.js'
import print from './js/print.js'
// import $ from 'jquery'
say()
print('666ttttt')
document.querySelector('#app').innerHTML = '222'
aa()
console.log(react)
// console.log($('#app').text())
var img = new Image()
img.src = test
document.body.appendChild(img)
function getReact() {
  return import('react').then(() => {
    console.log('sync react')
  })
}
getReact()


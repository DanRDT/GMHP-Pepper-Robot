import { menuItems } from './javascript/data.js'
// import { QiSessionConnection } from './javascript/qiClass.js'
import { QiSessionConnection } from './javascript/qiClassTesting.js'

// modify the DOM (Website)
$(document).ready(function () {
  // connect to robot
  const session = new QiSessionConnection()

  // alert(JSON.stringify(menuItems))

  $('#submitBtn').click(function () {
    console.log('clicked')
  })
})

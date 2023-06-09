import { menuItems } from './javascript/data.js'
// import { QiSessionConnection } from './javascript/qiClass.js'
import { QiSessionConnection } from './javascript/qiClassTesting.js'

// modify the DOM (Website)
$(document).ready(function () {
  // connect to robot
  const session = new QiSessionConnection()

  // alert(JSON.stringify(menuItems))

  $('#start-order-btn').click(function () {
    alert('starting order')
    $('#start-page').hide()
  })
})

import { menuItems } from './javascript/data.js'
// import { QiSessionConnection } from './javascript/qiClass.js'
import { QiSessionConnection } from './javascript/qiClassTesting.js'

// modify the DOM (Website)
$(document).ready(function () {
  // connect to robot
  const session = new QiSessionConnection()

  // alert(JSON.stringify(menuItems))

  // open main menu page
  $('#start-order-btn').click(function () {
    // alert('starting order')
    $('#start-page').hide()
    $('#main-menu-page').css('display', 'flex')
  })

  // return to start page
  $('#main-menu-page .cancel-btn').click(function () {
    $('#start-page').css('display', 'flex')
    $('#main-menu-page').hide()
  })
})

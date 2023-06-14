// @ts-check
import { menuItems, dailySpecials, foodCategories } from './data/menu.js'
import { itemCard, categoryCard } from './jquery-components/main-menu-page.js'
// import { QiSessionConnection } from './qiClass.js'
import { secs } from './utils/global.js'
import { QiSessionConnection } from './qiClassTesting.js'
import { navigateToPage } from './utils/pages.js'

alert('Javascript Running')

// modify the DOM (Website)
// Shorthand for
// $(document).ready(function () {
$(function () {
  // connect to robot
  const session = new QiSessionConnection()
  // alert('hey')
  session.performSpeech('hello')

  // pages setup
  dailySpecials.map(item => {
    $('#food-items-container').append(itemCard(item.name, item.price, item.calories, item.image))
  })
  foodCategories.map(category => {
    $('#food-categories-container').append(categoryCard(category.name, category.image))
  })

  // class A {
  //   string = 'hey'
  //   constructor() {}
  //   getString() {
  //     return this.string
  //   }
  // }
  // const a = new A()
  // alert(a.getString())
  // alert('4')

  // open main menu page
  $('#start-order-btn').click(function () {
    // alert('main-menu-page')

    navigateToPage('main-menu-page')
  })

  // // return to start page
  $('#main-menu-page .cancel-btn').click(function () {
    // alert('start-page')
    navigateToPage('start-page')
  })
  $('#main-menu-page .view-cart-btn').click(function () {
    // alert('cart-page')
    navigateToPage('cart-page')
  })
  // alert('5')
})

// session.stopListening()
// session.speechRecognition(['Yes', 'Hello', 'How are you doing?', 'Hi'], false)

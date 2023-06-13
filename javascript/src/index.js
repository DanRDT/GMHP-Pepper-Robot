// @ts-check
import { menuItems, dailySpecials, foodCategories } from './data/menu.js'
import { itemCard, categoryCard } from './jquery-components/main-menu-page.js'
// import { QiSessionConnection } from './qiClass.js'
import { QiSessionConnection } from './qiClassTesting.js'
import { navigateToPage } from './utils/pages.js'

// modify the DOM (Website)
// Shorthand for
// $(document).ready(function () {
$(function () {
  // connect to robot
  const session = new QiSessionConnection()

  // pages setup
  dailySpecials.map(item => {
    $('#food-items-container').append(itemCard(item.name, item.price, item.calories, item.image))
  })
  foodCategories.map(category => {
    $('#food-categories-container').append(categoryCard(category.name, category.image))
  })

  // open main menu page
  $('#start-order-btn').click(function () {
    navigateToPage('main-menu-page')
  })

  // return to start page
  $('#main-menu-page .cancel-btn').click(function () {
    navigateToPage('start-page')
  })
  $('#main-menu-page .view-cart-btn').click(function () {
    navigateToPage('cart-page')
  })
})

// session.stopListening()
// session.speechRecognition(['Yes', 'Hello', 'How are you doing?', 'Hi'], false)

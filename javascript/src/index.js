// @ts-check
import { menuItems, dailySpecials, foodCategories } from './data/menu.js'
import { itemCard, categoryCard } from './jquery-components/main-menu-page.js'
// import { QiSessionConnection } from './qiClass.js'
import { secs } from './utils/global.js'
import { QiSessionConnection } from './qiClassTesting.js'
import { navigateToPage } from './utils/pages.js'
import { cartItem } from './jquery-components/cart-page.js'

// alert('App Running')

// modify the DOM (Website)
// Shorthand for
// $(document).ready(function () {
$(function () {
  // connect to robot
  const session = new QiSessionConnection()

  // session.performSpeech('Hello, I am Pepper.')

  // pages setup
  dailySpecials.map(item => {
    $('#food-items-container').append(itemCard(item.name, item.price, item.calories, item.image))
  })
  foodCategories.map(category => {
    $('#food-categories-container').append(categoryCard(category.name, category.image))
  })

  // setup navigation buttons
  $('#start-order-btn').click(function () {
    navigateToPage('main-menu-page')
  })
  $('#main-menu-page .cancel-btn').click(function () {
    navigateToPage('start-page')
  })
  $('#main-menu-page .view-cart-btn').click(function () {
    navigateToPage('cart-page')
    $('#cart-items-container').append(cartItem('Pizza', 7, 1, 'menu/Pizza.jpg'))
  })
  $('#cart-page .return-btn').click(function () {
    navigateToPage('main-menu-page')
  })
})

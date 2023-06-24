// @ts-check
import {
  menuItems,
  dailySpecials,
  foodCategories,
  sides,
  desserts,
  beverages,
  coffeeItems,
  healthyOptions,
} from './data/menu.js'
import { itemCard, categoryCard } from './jquery-components/main-menu-page.js'
// import { QiSessionConnection } from './qiClass.js'
import { QiSessionConnection } from './qiClassTesting.js'
import { navigateToPage } from './utils/pages.js'
import { cartItem } from './jquery-components/cart-page.js'
import { twoDecimalPlaces } from './utils/global.js'
import { goToItemPage } from './pages/item-page.js'

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
    $('.food-card').on('click', function () {
      goToItemPage($(this))
    })
  })
  foodCategories.map(category => {
    $('#food-categories-container').append(categoryCard(category.name, category.image))
  })
  $('#food-categories-container').children('.food-categories-card').first().attr('data-active', 'true')

  // Define object to story category information
  const categoryInfo = {
    'Daily Specials': dailySpecials,
    Sides: sides,
    Desserts: desserts,
    Beverages: beverages,
    Coffee: coffeeItems,
    'Healthy Options': healthyOptions,
  }

  // Show food items when category is clicked
  $('#food-categories-container').on('click', '.food-categories-card', function () {
    // Access the clicked image using $(this)
    const clickedCard = $(this)
    const divId = clickedCard.attr('id')

    // Show it as active
    $('.food-categories-card').attr('data-active', 'false')
    clickedCard.attr('data-active', 'true')

    // Clear the #food-items-container before appending item cards from new category
    $('#food-items-container').empty()

    // Append item cards for the specified category
    categoryInfo[divId].forEach(item => {
      $('#food-items-container').append(itemCard(item.name, item.price, item.calories, item.image))
    })
    $('.food-card').on('click', function () {
      goToItemPage($(this))
    })
  })

  $('#start-order-btn').click(function () {
    navigateToPage('main-menu-page')
  })
  $('#new-order-btn').click(function () {
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
  $('#food-item-page .return-btn').click(function () {
    navigateToPage('main-menu-page')
  })
  $('#food-item-page .view-cart-btn').click(function () {
    navigateToPage('cart-page')
    $('#cart-items-container').append(cartItem('Pizza', 7, 1, 'menu/Pizza.jpg'))
  })

  $('#food-item-page .minus').click(function () {
    const prevCount = Number($('#food-item-page').attr('data-quantity'))
    let newCount = prevCount - 1
    if (newCount < 1) newCount = 1
    $('#food-item-page .count').text(newCount)
    $('#food-item-page').attr('data-quantity', newCount)
  })
  $('#food-item-page .plus').click(function () {
    const prevCount = Number($('#food-item-page').attr('data-quantity'))
    let newCount = prevCount + 1
    $('#food-item-page .count').text(newCount)
    $('#food-item-page').attr('data-quantity', newCount)
  })
})

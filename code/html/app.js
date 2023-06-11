// @ts-check
import { menuItems, dailySpecials, foodCategories } from './javascript/data/menu.js'
import { itemCard, categoryCard } from './javascript/jquery-components/main-menu-page.js'
// import { QiSessionConnection } from './javascript/qiClass.js'
import { QiSessionConnection } from './javascript/qiClassTesting.js'
import { navigateToPage } from './javascript/utils/pages.js'

// modify the DOM (Website)
// Shorthand for $(document).ready()
$(function () {
  // connect to robot
  const session = new QiSessionConnection()

  // alert(JSON.stringify(menuItems))

  // pages setup
  dailySpecials.map(item => {
    $('#food-items-container').append(itemCard(item.name, item.price, item.calories, item.image))
  })
  foodCategories.map(category => {
    $('#food-categories-container').append(categoryCard(category.name, category.image))
  })

  // open main menu page
  $('#start-order-btn').on('click', function () {
    // alert('starting order')
    navigateToPage('main-menu-page')
  })

  // return to start page
  $('#main-menu-page .cancel-btn').on('click', function () {
    navigateToPage('start-page')
  })
})

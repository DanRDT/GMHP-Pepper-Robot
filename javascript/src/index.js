// @ts-check
// import { QiSessionConnection } from './qiClass.js'
import { QiSessionConnection } from './qiClassTesting.js'
import { navigateToPage } from './utils/pages.js'
import { addToCart, updateCartTotals } from './pages/cart-page.js'
import { setupOrderCompletePage, setupStartPage } from './pages/setup/other-setup.js'
import { setupMenuPage } from './pages/setup/menu-setup.js'
import { setupCartPage } from './pages/setup/cart-setup.js'
import { setupFoodItemPage } from './pages/setup/item-setup.js'
import { Cart } from './cart.js'

// alert('App Running')

// modify the DOM (Website)
// Shorthand for
// $(document).ready(function () {
$(function () {
  // connect to robot
  const session = new QiSessionConnection()

  const cart = new Cart()

  // Setup Pages
  setupStartPage()
  setupMenuPage()
  setupCartPage()
  setupFoodItemPage()
  setupOrderCompletePage()
})

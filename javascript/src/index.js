// @ts-check
import { QiSessionConnection } from './qiClass.js'
import { QiSessionConnectionFake } from './qiClassFake.js'
import { setupOrderCompletePage, setupStartPage } from './pages/setup/other-setup.js'
import { setupMenuPage } from './pages/setup/menu-setup.js'
import { setupCartPage } from './pages/setup/cart-setup.js'
import { setupFoodItemPage } from './pages/setup/item-setup.js'
import { Cart } from './cart.js'
import { newPopup, secs } from './utils/global.js'
import { menuItems, sides } from './data/menu.js'

// newPopup('App Running')

// modify the DOM (Website)
// Shorthand for
// $(document).ready(function () {
$(function () {
  // connect to robot
  let session
  try {
    session = new QiSessionConnection()
  } catch (error) {
    newPopup(`Can't connect to robot. Using fake connection instead.`, 5)
    session = new QiSessionConnectionFake()
  }

  const cart = new Cart()

  // Setup Pages
  setupStartPage()
  setupMenuPage(cart)
  setupCartPage(cart)
  setupFoodItemPage(cart)
  setupOrderCompletePage(cart)
})

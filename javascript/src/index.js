// @ts-check
import { QiSessionConnection } from './qiClass.js'
import { QiSessionConnectionFake } from './qiClassFake.js'
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
  let session
  try {
    session = new QiSessionConnection()
  } catch (error) {
    alert(`Can't connect to robot. \nUsing fake connection instead.`)
    session = new QiSessionConnectionFake()
  }

  const cart = new Cart()

  // Setup Pages
  setupStartPage()
  setupMenuPage()
  setupCartPage()
  setupFoodItemPage()
  setupOrderCompletePage()
})

// @ts-check
import { QiSessionConnection } from './qiClass.js'
import { setupOrderCompletePage, setupStartPage } from './pages/setup/other-setup.js'
import { setupMenuPage } from './pages/setup/menu-setup.js'
import { setupCartPage } from './pages/setup/cart-setup.js'
import { setupFoodItemPage } from './pages/setup/item-setup.js'
import { Cart } from './cart.js'
import { newPopup, secs } from './utils/global.js'
import { menuItems } from './data/menu.js'
import { goToCartPage } from './pages/cart-page.js'
import { navigateToPage } from './utils/pages.js'
import { setupVoiceAssistant } from './pages/voiceAssistant.js'

// newPopup('App Running')

// modify the DOM (Website)
// Shorthand for
// $(document).ready(function () {
$(function () {
  // connect to robot
  const session = new QiSessionConnection()

  const cart = new Cart()

  // Setup Pages
  setupStartPage()
  setupMenuPage(cart)
  setupCartPage(cart)
  setupFoodItemPage(cart)
  setupOrderCompletePage(cart)
  setupVoiceAssistant(cart, session)
})

// @ts-check
// All javascript code starts here
import 'jspolyfill-array.prototype.findIndex'
import 'jspolyfill-array.prototype.find'
import 'polyfill-array-includes'
import 'ie-string-startswith-polyfill'
import 'array-from-polyfill'
import { QiSessionConnection } from './qiClass.js'
import { setupOrderCompletePage, setupStartPage } from './pages/setup/other-setup.js'
import { setupMenuPage } from './pages/setup/menu-setup.js'
import { setupCartPage } from './pages/setup/cart-setup.js'
import { setupFoodItemPage } from './pages/setup/item-setup.js'
import { Cart } from './cart.js'
import { setupVoiceAssistant } from './voiceAssistant/setup.js'
import { newPopup, secs } from './utils/global.js'
import { verifyMenuItems } from './pages/setup/verify-data.js'
import { menuItems } from './data/menu.js'

newPopup('App Running')

// Code that is run when the website has been loaded
$(function () {
  // connect to robot
  const session = new QiSessionConnection()

  // create cart object that is used throughout the project
  const cart = new Cart()

  // verify menuItems are in correct format
  verifyMenuItems(menuItems)

  // Setup Pages and setup their button event listeners
  setupStartPage(cart)
  setupMenuPage(cart)
  setupCartPage(cart)
  setupFoodItemPage(cart)
  setupOrderCompletePage(cart)

  // Setup Voice Assistant Code
  setupVoiceAssistant(cart, session)

  newPopup('Setup complete without errors')
})

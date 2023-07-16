//@ts-check

import { twoDecimalPlaces } from '../utils/global'
import { navigateToPage } from '../utils/pages'
import { cartItemComponent } from '../jquery-components/cart-page'
import { Cart } from '../cart.js'
import { updateOrderNumber } from './order-complete-page'

/**
 * @param {Cart} cart
 */
export function goToCartPage(cart) {
  navigateToPage('cart-page')
  cart.updateCartUI()
}

/** @param {Cart} cart */
export function placeOrder(cart) {
  const items = cart.getCart()

  const orderID = updateOrderNumber()

  // Place order code goes here
}

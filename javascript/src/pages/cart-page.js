//@ts-check

import { navigateToPage } from '../utils/pages'
import { Cart } from '../cart.js'
import { updateOrderNumber } from './order-complete-page'
import { printTicket } from '../services/printTicket'

/**
 * @param {Cart} cart
 */
export function goToCartPage(cart) {
  navigateToPage('cart-page')
  cart.updateCartUI()
}

/** @param {Cart} cart */
export function placeOrder(cart) {
  const cartItems = cart.getCart()
  updateOrderNumber()

  // prints ticket for cooks
  // printTicket(cart)

  // Place order code goes here
}

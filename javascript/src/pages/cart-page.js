//@ts-check

import { twoDecimalPlaces } from '../utils/global'
import { navigateToPage } from '../utils/pages'
import { cartItemComponent } from '../jquery-components/cart-page'
import { Cart } from '../cart.js'

/**
 * @param {Cart} cart
 */
export function goToCartPage(cart) {
  navigateToPage('cart-page')
  cart.updateCartUI()
}

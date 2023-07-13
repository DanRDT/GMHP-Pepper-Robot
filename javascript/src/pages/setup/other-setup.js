// @ts-check
import { Cart } from '../../cart'
import { navigateToPage } from '../../utils/pages'

export function setupStartPage() {
  // Start order btn
  $('#start-order-btn').on('click', function () {
    navigateToPage('main-menu-page')
  })
}

/**
 * @param {Cart} cart
 */
export function setupOrderCompletePage(cart) {
  // New Order btn
  $('#new-order-btn').on('click', function () {
    navigateToPage('start-page')

    cart.clearCart()
  })
}

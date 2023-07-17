// @ts-check
import { Cart } from '../../cart'
import { navigateToPage } from '../../utils/pages'
import { printReceipt } from '../../services/printReceipt'
import { newPopup } from '../../utils/global'

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

  // Email Receipt btn
  $('#email-receipt-btn').on('click', function () {
    const email = prompt('Please enter your email address:')
    //emailReceipt(email,cart)
    if (email !== null && email != '') {
    newPopup('Receipt has been sent to '+email+'. Thank you!')
}})

  // Print Receipt btn
  $('#print-receipt-btn').on('click', function () {
    printReceipt(cart)
    newPopup('Receipt has been printed. Thank you!')
  })
}

// @ts-check
import { navigateToPage } from '../../utils/pages'
import { updateCartTotals } from '../cart-page'

export function setupStartPage() {
  $('#start-order-btn').on('click', function () {
    navigateToPage('main-menu-page')
  })
}
export function setupOrderCompletePage() {
  $('#new-order-btn').on('click', function () {
    navigateToPage('main-menu-page')
    $('#cart-items-container').empty()
    updateCartTotals()
  })
}

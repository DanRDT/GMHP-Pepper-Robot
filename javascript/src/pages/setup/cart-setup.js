// @ts-check

import { navigateToPage } from '../../utils/pages'
import { updateCartTotals } from '../cart-page'

export function setupCartPage() {
  // Return button
  $('#cart-page .return-btn').on('click', function () {
    navigateToPage('main-menu-page')
  })

  // Clear cart btn
  $('#cart-page .clear-cart-btn').on('click', function () {
    $('#cart-items-container').empty()
    updateCartTotals()
  })

  // Remove item btn
  $('#cart-page').on('click', '.delete-cart-item-btn', function () {
    const itemContainer = $(this).closest('.cart-item')
    itemContainer.remove()
    updateCartTotals()
  })

  // Plus btn
  $('#cart-page').on('click', '.plus', function () {
    const itemContainer = $(this).closest('.cart-item')
    const countElement = itemContainer.find('.count')
    const prevCount = Number(itemContainer.attr('data-quantity'))
    let newCount = prevCount + 1
    countElement.text(newCount)
    itemContainer.attr('data-quantity', newCount)
    updateCartTotals()
  })
  // Minus
  $('#cart-page').on('click', '.minus', function () {
    const itemContainer = $(this).closest('.cart-item')
    const countElement = itemContainer.find('.count')
    const prevCount = Number(itemContainer.attr('data-quantity'))
    let newCount = prevCount - 1
    if (newCount < 1) newCount = 1
    countElement.text(newCount)
    itemContainer.attr('data-quantity', newCount)
    updateCartTotals()
  })

  //Place order btn
  $('#cart-confirm-order').on('click', function () {
    navigateToPage('order-complete-page')
  })
}

// @ts-check
import { navigateToPage } from '../../utils/pages'
import { addToCart, updateCartTotals } from '../cart-page'

export function setupFoodItemPage() {
  // View cart btn
  $('#food-item-page .view-cart-btn').on('click', function () {
    navigateToPage('cart-page')
  })
  // Return btn
  $('#food-item-page .return-btn').on('click', function () {
    navigateToPage('main-menu-page')
  })
  //Add item to cart
  $('#food-item-page .add-to-cart').on('click', function () {
    addToCart($('#food-item-page'))
    updateCartTotals()
  })

  // Minus btn
  $('#food-item-page .minus').on('click', function () {
    const prevCount = Number($('#food-item-page').attr('data-quantity'))
    let newCount = prevCount - 1
    if (newCount < 1) newCount = 1
    $('#food-item-page .count').text(newCount)
    $('#food-item-page').attr('data-quantity', newCount)
  })
  // Plus btn
  $('#food-item-page .plus').on('click', function () {
    const prevCount = Number($('#food-item-page').attr('data-quantity'))
    let newCount = prevCount + 1
    $('#food-item-page .count').text(newCount)
    $('#food-item-page').attr('data-quantity', newCount)
  })
}

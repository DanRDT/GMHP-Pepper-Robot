// @ts-check
import { getItemAsObject, newPopup } from '../../utils/global'
import { navigateToPage } from '../../utils/pages'
import { Cart } from '../../cart.js'
import { goToCartPage } from '../cart-page'

/** @param {Cart} cart */
export function setupFoodItemPage(cart) {
  // View cart btn
  $('#food-item-page .view-cart-btn').on('click', function () {
    goToCartPage(cart)
  })
  // Return btn
  $('#food-item-page .return-btn').on('click', function () {
    navigateToPage('main-menu-page')
  })

  //Add item to cart btn
  $('#food-item-page .add-to-cart').on('click', function () {
    const page = $('#food-item-page')
    const item = getItemAsObject(page)
    cart.addToCart(item)
    newPopup('Added to cart')
    goToCartPage(cart)
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

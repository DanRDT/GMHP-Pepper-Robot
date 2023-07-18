// @ts-check
import { navigateToPage } from '../../utils/pages'
import { Cart } from '../../cart.js'
import { getItemAsObject } from '../../utils/global'
import { placeOrder } from '../cart-page'
import { newPopup } from '../../utils/global'
import { goToItemPage } from '../item-page'

/**
 * @param {Cart} cart
 */
export function setupCartPage(cart) {
  // Return button
  $('#cart-page .return-btn').on('click', function () {
    navigateToPage('main-menu-page')
  })

  // Clear cart btn
  $('#cart-page .clear-cart-btn').on('click', function () {
    cart.clearCart()
    cart.updateCartUI()
  })

  // Remove item btn
  $('#cart-page').on('click', '.delete-cart-item-btn', function () {
    const itemName = $(this).parents('.cart-item').attr('data-name')
    const itemVariant = $(this).parents('.cart-item').attr('data-variant')
    cart.removeFromCart({ name: itemName, variant: itemVariant })
    cart.updateCartUI()
  })

  // Plus btn
  $('#cart-page').on('click', '.plus', function () {
    const item = getItemAsObject($(this).parents('.cart-item'))

    cart.increaseQuantity(1, item)
    cart.updateCartUI()
  })

  // Minus btn
  $('#cart-page').on('click', '.minus', function () {
    const item = getItemAsObject($(this).parents('.cart-item'))

    cart.decreaseQuantity(1, item)
    cart.updateCartUI()
  })

  // Place order btn
  $('#place-order-btn').on('click', function () {
    if (cart.getCart().length > 0) {
      navigateToPage('order-complete-page')
      placeOrder(cart)
    } else {
      newPopup('Cart is empty')
    }
  })

  // navigate to item page on card click
  $('#cart-page').on('click', '.cart-item-image', function () {
    goToItemPage($(this).parents('.cart-item'))
  })
  $('#cart-page').on('click', '.cart-item-name-container', function () {
    goToItemPage($(this).parents('.cart-item'))
  })
  $('#cart-page').on('click', '.cart-item-price', function () {
    goToItemPage($(this).parents('.cart-item'))
  })
}

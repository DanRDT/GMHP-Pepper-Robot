// @ts-check

import { navigateToPage } from '../../utils/pages'
import { Cart } from '../../cart.js' // Make sure this path is correct

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
    cart.removeFromCart({name: itemName, variant: itemVariant})
    cart.updateCartUI()
  })

  // Plus btn
  $('#cart-page').on('click', '.plus', function () {
    const itemName = $(this).parents('.cart-item').attr('data-name')
    const itemVariant = $(this).parents('.cart-item').attr('data-variant')
    const itemInCart = cart.getCart().find(item => item.name === itemName && item.variant === itemVariant)
    
    if (itemInCart) {
      itemInCart.quantity += 1
    }
    cart.updateTotals()
    cart.updateCartUI()
  })
  
  // Minus btn
  $('#cart-page').on('click', '.minus', function () {
    const itemName = $(this).parents('.cart-item').attr('data-name')
    const itemVariant = $(this).parents('.cart-item').attr('data-variant')
    const itemInCart = cart.getCart().find(item => item.name === itemName && item.variant === itemVariant)
    
    if (itemInCart && itemInCart.quantity > 1) {
      itemInCart.quantity -= 1
    }
    cart.updateTotals()
    cart.updateCartUI()
  })

  // Place order btn
  $('#cart-confirm-order').on('click', function () {
    navigateToPage('order-complete-page')
    cart.clearCart()
  })
}

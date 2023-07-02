//@ts-check

import { twoDecimalPlaces } from '../utils/global'
import { navigateToPage } from '../utils/pages'
import { cartItemComponent } from '../jquery-components/cart-page'

/**
 * @param {JQuery<any>} itemPage
 *
 */
export function addToCart(itemPage) {
  const cartItemsContainer = $('#cart-items-container')
  const itemName = itemPage.attr('data-name')
  const itemPrice = Number(itemPage.attr('data-price'))
  const itemQuantity = Number(itemPage.attr('data-quantity'))
  const itemImage = itemPage.attr('data-image')

  // Check if an item with the same name already exists in the cart
  const existingItem = cartItemsContainer.find(`[data-name="${itemName}"]`)

  if (existingItem.length > 0) {
    // If the item already exists, update its quantity
    const existingQuantity = Number(existingItem.attr('data-quantity'))
    const newQuantity = existingQuantity + itemQuantity
    existingItem.attr('data-quantity', newQuantity)
    existingItem.find('.count').text(newQuantity)
  } else {
    // If the item does not exist, add a new container
    cartItemsContainer.append(cartItemComponent(itemName, itemPrice, itemQuantity, itemImage))
  }

  navigateToPage('cart-page')
}

//Calculate Cart totals
export function calcSubTotal() {
  let subTotal = 0
  //for each item in cart, calculate cost and accumulate subtotal
  $('.cart-item').each(function () {
    const price = Number($(this).attr('data-price'))
    const quantity = Number($(this).attr('data-quantity'))
    const itemCost = price * quantity
    subTotal += itemCost
  })

  return subTotal
}

export function updateCartTotals() {
  const subtotal = calcSubTotal()
  const taxRate = 0.06 // 6% tax in SC
  const tax = subtotal * taxRate
  const total = subtotal + tax

  $('#subtotal').text('$' + twoDecimalPlaces(subtotal))
  $('#tax').text('$' + twoDecimalPlaces(tax))
  $('#total').text('$' + twoDecimalPlaces(total))
}

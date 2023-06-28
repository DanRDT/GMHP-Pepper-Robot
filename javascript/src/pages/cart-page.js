//@ts-check


import { twoDecimalPlaces } from '../utils/global'
import { navigateToPage } from '../utils/pages'
import { cartItem } from '../jquery-components/cart-page'

/**
 * @param {JQuery<any>} itemPage
 * 
 */
export function addToCart(itemPage) {
  var cartItemsContainer = $('#cart-items-container')
  var itemName = itemPage.attr('data-name')
  var itemPrice = Number(itemPage.attr('data-price'))
  var itemQuantity = Number(itemPage.attr('data-quantity'))
  var itemImage = itemPage.attr('data-image')


  // Check if an item with the same name already exists in the cart
  var existingItem = cartItemsContainer.find("[data-name='" + itemName + "']")

  if (existingItem.length > 0) {
    // If the item already exists, update its quantity
    var existingQuantity = Number(existingItem.attr('data-quantity'))
    var newQuantity = existingQuantity + itemQuantity
    existingItem.attr('data-quantity', newQuantity)
    existingItem.find('.count').text(newQuantity)
  } else {
    // If the item does not exist, add a new container
    cartItemsContainer.append(cartItem(itemName, itemPrice, itemQuantity, itemImage))
  }

  navigateToPage('cart-page')
}


 



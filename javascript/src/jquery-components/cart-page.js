// @ts-check

import { twoDecimalPlaces } from '../utils/global'

/**
 *
 * @param {string} itemName
 * @param {number} price
 * @param {number} count
 * @param {string} image
 */
export function cartItem(itemName, price, count, image) {
  return `
  <div class="cart-item">
    <img src="./resources/images/${image}" alt="" />
    <div class="details">
      <h4 class="cart-item-name">${itemName}</h4>
      <div class="delete-cart-item-btn">
        <img src="./resources/images/other/x-shape.svg" alt="" />
      </div>
      <div class="quantity">
        <div class="minus"><img src="./resources/images/other/minus.svg" alt="" /></div>
        <h4 class="count">${count}</h4>
        <div class="plus"><img src="./resources/images/other/plus.svg" alt="" /></div>
      </div>
      <h4 class="cart-item-price">${twoDecimalPlaces(price)}</h4>
    </div>
  </div>
  `
}

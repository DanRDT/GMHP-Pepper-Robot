// @ts-check

import { twoDecimalPlaces } from '../utils/global'

/**
 * @param {object} item
 * @param {string} item.name
 * @param {number} item.price
 * @param {number} item.quantity
 * @param {string} item.image
 * @param {string} item.variant
 */
export function cartItemComponent(item) {
  const { name, price, quantity, image, variant } = item
  return `
  <div class="cart-item" data-name="${name}" data-variant="${variant}" data-price="${price}" data-image="${image}" data-quantity="${quantity}">
    <div class="cart-item-image">
      <img src="./resources/images/${image}" alt="" />
    </div>  
    <div class="details">
      <div class="cart-item-name-container">
        <h4 class="text-nowrap">${name}</h4>
        <h5 class="cart-item-variant">${variant}</h5>
      </div>
      <div class="delete-cart-item-btn">
        <img src="./resources/images/other/x-shape.svg" alt="" />
      </div>
      <div class="quantity">
        <div class="minus"><img src="./resources/images/other/minus.svg" alt="" /></div>
        <h4 class="count">${quantity}</h4>
        <div class="plus"><img src="./resources/images/other/plus.svg" alt="" /></div>
      </div>
      <h4 class="cart-item-price">$${twoDecimalPlaces(price)}</h4>
    </div>
  </div>
  `
}

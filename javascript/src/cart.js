//@ts-check

import { cartItemComponent } from './jquery-components/cart-page'
import { twoDecimalPlaces } from './utils/global'

/**
 * @typedef {{
 *  name: string;
 *  price: number;
 *  quantity: number;
 *  image: string;
 *  variant: string;
 *  }} CartItem
 */

export class Cart {
  /** @type {Array<CartItem>} */
  cart = []
  totals = {
    subtotal: 0,
    tax: 0,
    total: 0,
  }
  constructor() {}
  getCart() {
    return this.cart
  }

  /** @param {CartItem} param */
  addToCart({ name, price, quantity, image, variant }) {
    /** @param {CartItem} cartItem */
    function whereNameAndVariantIsSame(cartItem) {
      if (cartItem.name === name && cartItem.variant === variant) return true
      else return false
    }
    // check if item exists in cart
    const existingIndex = this.cart.findIndex(whereNameAndVariantIsSame)

    if (existingIndex === -1) this.cart.push({ name, price, quantity, image, variant })
    else this.cart[existingIndex].quantity += quantity

    this.updateTotals()
  }

  /** @param {CartItem} param */
  removeFromCart({ name, variant }) {}

  updateTotals() {
    let subtotal = 0
    //for each item in cart, calculate cost and accumulate subtotal
    this.cart.forEach(cartItem => {
      const itemCost = cartItem.price * cartItem.quantity
      subtotal += itemCost
    })
    const TAX_RATE = 0.06 // 6% tax in SC
    const tax = subtotal * TAX_RATE
    const total = subtotal + tax

    this.totals.subtotal = subtotal
    this.totals.tax = tax
    this.totals.total = total
  }

  updateCartUI() {
    // update cart cards
    const cartItemsContainer = $('#cart-items-container')
    cartItemsContainer.empty()
    this.cart.forEach(({ name, price, quantity, image, variant }) => {
      cartItemsContainer.append(cartItemComponent(name, price, quantity, image))
    })

    // update totals
    $('#subtotal').text('$' + twoDecimalPlaces(this.totals.subtotal))
    $('#tax').text('$' + twoDecimalPlaces(this.totals.tax))
    $('#total').text('$' + twoDecimalPlaces(this.totals.total))
  }

  clearCart() {
    this.cart = []
    this.totals = {
      subtotal: 0,
      tax: 0,
      total: 0,
    }
  }
}

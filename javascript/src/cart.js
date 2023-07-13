//@ts-check
// This file contains all the logic to do with manipulating the cart
import { cartItemComponent } from './jquery-components/cart-page'
import { newPopup, twoDecimalPlaces } from './utils/global'

/**
 * @typedef {{
 *  name: string;
 *  variant: string;
 *  price: number;
 *  quantity: number;
 *  image: string;
 *  calories: number;
 *  }} CartItem
 */
/**
 * @typedef {object} CartItem_Only_Name_Variant
 * @property {CartItem['name']} name
 * @property {CartItem['variant']} variant
 * @property {CartItem['price']} [price] optional
 * @property {CartItem['quantity']} [quantity] optional
 * @property {CartItem['image']} [image] optional
 * @property {CartItem['calories']} [calories] optional
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
  addToCart({ name, variant, price, quantity, image, calories }) {
    /** @param {CartItem} cartItem */
    function whereNameAndVariantIsSame(cartItem) {
      if (cartItem.name === name && cartItem.variant === variant) return true
      else return false
    }
    // check if item exists in cart
    const existingIndex = this.cart.findIndex(whereNameAndVariantIsSame)

    if (existingIndex === -1) this.cart.push({ name, variant, price, quantity, image, calories })
    else this.cart[existingIndex].quantity += quantity

    this.updateTotals()
  }

  /** @param {CartItem_Only_Name_Variant} param */
  removeFromCart({ name, variant }) {
    // find index of the item to be removed
    const index = this.cart.findIndex(item => item.name === name && item.variant === variant)

    // if the item is found, remove it from the cart
    if (index !== -1) {
      this.cart.splice(index, 1)
    }

    // update the totals
    this.updateTotals()
  }

  /**
   * @param {number} amountToAdd
   * @param {CartItem_Only_Name_Variant} param */
  increaseQuantity(amountToAdd, { name, variant }) {
    const item = this.cart.find(item => item.name === name && item.variant === variant)

    if (item) {
      item.quantity += amountToAdd
      this.updateTotals()
    } else {
      newPopup('Error: No such item found in cart.')
    }
  }

  /**
   * @param {number} amountToRemove
   * @param {CartItem_Only_Name_Variant} param */
  decreaseQuantity(amountToRemove, { name, variant }) {
    const item = this.cart.find(item => item.name === name && item.variant === variant)

    if (item) {
      let newQuantity = item.quantity - amountToRemove
      if (newQuantity < 1) newQuantity = 1
      item.quantity = newQuantity
      this.updateTotals()
    } else {
      newPopup('Error: No such item found in cart.')
    }
  }

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
    this.cart.forEach(cartItem => {
      cartItemsContainer.append(cartItemComponent(cartItem))
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

// @ts-check

import { popupComponent } from '../jquery-components/popup-component'

/**
 * Returns seconds as milliseconds
 * @param {number} seconds */
export function secs(seconds) {
  const milliseconds = seconds * 1000
  return milliseconds
}

/** @param {number} num */
export function twoDecimalPlaces(num) {
  return Number(num).toFixed(2)
}

/** @param {number} length  */
export function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }

  return result
}

/**
 * @typedef {{
 *  id: string;
 *  text: string;
 *  color: string;
 *  image: string;
 *  }} Popup
 */

/**
 *
 * @param {string | number | boolean} text Text to display in popup
 * @param {number} length Time to wait before deleting popup - Default: 3 */
export function newPopup(text, length = 3) {
  const id = generateRandomString(10)

  $('#popup-container').append(popupComponent(id, text))

  setTimeout(() => {
    $('#popup-container').children(`[data-id="${id}"]`).remove()
  }, secs(length))
}

/** @param {JQuery<any>} htmlElement */
export function getItemAsObject(htmlElement) {
  const name = htmlElement.attr('data-name')
  const price = Number(htmlElement.attr('data-price'))
  const variant = htmlElement.attr('data-variant')
  const quantity = Number(htmlElement.attr('data-quantity'))
  const image = htmlElement.attr('data-image')

  return { name, variant, price, quantity, image }
}

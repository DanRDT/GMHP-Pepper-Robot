// @ts-check
// this file contains reusable functions that can be used throughout the code

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
 * Shows new popup
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
  const variant = htmlElement.attr('data-variant')
  const price = Number(htmlElement.attr('data-price'))
  const quantity = Number(htmlElement.attr('data-quantity'))
  const image = htmlElement.attr('data-image')
  const calories = Number(htmlElement.attr('data-calories'))

  return { name, variant, price, quantity, image, calories }
}

/**
 * Capitalize first letter
 * @param {string} string
 */
export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

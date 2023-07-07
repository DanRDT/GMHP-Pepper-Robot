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
 *
 * @param {string} text Text to display in popup
 * @param {number} length Time to wait before deleting popup - Default: 3 */
export function newPopup(text, length = 3) {
  const id = generateRandomString(10)

  $('#popup-container').append(popupComponent(id, text))

  setTimeout(() => {
    $('#popup-container').children(`[data-id="${id}"]`).remove()
  }, secs(length))
}

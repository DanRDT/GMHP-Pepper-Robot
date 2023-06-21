// @ts-check
/**
 * Returns seconds as milliseconds
 * @param {number} seconds
 * @returns {number}
 */
export function secs(seconds) {
  const milliseconds = seconds * 1000
  return milliseconds
}

/**
 *
 * @param {number} num
 */
export function twoDecimalPlaces(num) {
  return Number(num).toFixed(2)
}

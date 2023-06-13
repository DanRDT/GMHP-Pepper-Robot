// @ts-check
import { listOfRandomPepperDialogs } from '../data/pepper.js'

/**
 * @returns {string}
 */
export function getRandomPepperDialog() {
  const randomIndex = Math.floor(Math.random() * listOfRandomPepperDialogs.length)
  return listOfRandomPepperDialogs[randomIndex]
}

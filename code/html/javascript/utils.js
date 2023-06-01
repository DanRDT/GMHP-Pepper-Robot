import { listOfRandomPepperDialogs } from './data.js'

export function getRandomPepperDialog() {
  const randomIndex = Math.floor(Math.random() * listOfRandomPepperDialogs.length)
  return listOfRandomPepperDialogs[randomIndex]
}

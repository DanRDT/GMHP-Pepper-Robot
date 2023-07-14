// @ts-check
import { listOfRandomPepperDialogs, listOfRandomPepperHowCanIHelpDialogs } from '../data/pepper.js'

export function getRandomPepperDialog() {
  const randomIndex = Math.floor(Math.random() * listOfRandomPepperDialogs.length)
  return listOfRandomPepperDialogs[randomIndex]
}

export function getRandomPepperHowCanIHelp() {
  const randomIndex = Math.floor(Math.random() * listOfRandomPepperHowCanIHelpDialogs.length)
  return listOfRandomPepperHowCanIHelpDialogs[randomIndex]
}

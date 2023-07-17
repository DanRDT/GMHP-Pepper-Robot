// @ts-check
import { Cart } from '../cart'
import { menuItems } from '../data/menu'
import { QiSessionConnection } from '../qiClass'
import { capitalize } from '../utils/global'
import { cancelVoiceAssistant } from './setup'
import { clearUserOptions, newRobotChat, newUserChat, newUserOptions } from './textPopups'

/**
 * @param {Cart} cart
 * @param {QiSessionConnection} session */
export function removeItemFromCart(cart, session) {
  // Prompt the user to specify the item to remove
  session.performSpeech('Which item would you like to remove?')
  clearUserOptions()
  newRobotChat('Which item would you like to remove?')

  // Set the speech recognition function to handle the user's response
  session.setSpeechRecognitionFunc(
    /** @param {[string, number]} data */
    ([response, confidence]) => {
      if (confidence < 0.45) return

      newUserChat(capitalize(response))

      const itemToRemove = response.toLowerCase()
      // Pull current cart
      const myCart = cart.getCart()
        
      // Filter cart items that match the specified name
      const matchingItems = myCart.filter(item => item.name.toLowerCase() === itemToRemove)

      if (matchingItems.length === 0) {
        // Item not found in the cart
        session.performSpeech(`Sorry, ${itemToRemove} not found in your cart.`)
        newRobotChat(`Sorry, ${itemToRemove} not found in your cart.`)
        cancelVoiceAssistant()
        return
      }

      if (matchingItems.length === 1) {
        // Single variant item found in the cart, remove it
        const [removedItem] = myCart.splice(myCart.indexOf(matchingItems[0]), 1)
        session.performSpeech(`The ${removedItem.name} has been removed from your cart.`)
        newRobotChat(`The ${removedItem.name} has been removed from your cart.`)
        return
      }

      // Multiple variant items found in the cart, prompt for the variant
      const variants = matchingItems.map(item => item.variant.toLowerCase())
      session.performSpeech(`Which option of ${itemToRemove} would you like to remove?`)
      clearUserOptions()
      newRobotChat(`Which variant of ${itemToRemove} would you like to remove?`)
        session.setSpeechRecognitionFunc(
          /** @param {[string, number]} data */
          ([variantResponse, variantConfidence]) => {
            if (variantConfidence < 0.45) return

          const variantToRemove = variantResponse.toLowerCase()
          const itemIndex = myCart.findIndex(item => item.name.toLowerCase() === itemToRemove && item.variant.toLowerCase() === variantToRemove)

          if (itemIndex !== -1) {
            // Item found in the cart, remove it
            const [removedItem] = myCart.splice(itemIndex, 1);
            session.performSpeech(`The ${removedItem.name} (${removedItem.variant}) has been removed from your cart.`)
            newRobotChat(`The ${removedItem.name} (${removedItem.variant}) has been removed from your cart.`)
          } else {
            // Item not found in the cart
            session.performSpeech(`Sorry, ${itemToRemove} (${variantToRemove}) not found in your cart.`)
            newRobotChat(`Sorry, ${itemToRemove} (${variantToRemove}) not found in your cart.`)
          }})
        })

  // Phrases to listen for
  const menuItemsArray = menuItems.map(item => item.name.toLowerCase())
  const variantArray = menuItems.map(variants => variants.name.toLowerCase())
  const phrases = ['nevermind', 'cancel', ...menuItemsArray, ...variantArray]
  session.listenForPhrases(phrases, false, 25)
  newUserOptions(phrases)
}




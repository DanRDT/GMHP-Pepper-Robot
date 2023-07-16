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
      // Compare the response to menu item names
      const menuItem = menuItems.find(item => item.name.toLowerCase() === itemToRemove)
      // Item found in the menu items array

      if (menuItem) {
        // Check if the item exists in the cart
        const cartItems = cart.getCart()
        const itemIndex = cartItems.findIndex(item => item.name.toLowerCase() === itemToRemove)

        if (itemIndex !== -1) {
          // Item found in the cart, remove it
          const [removedItem] = cartItems.splice(itemIndex, 1)
          session.performSpeech(`The ${removedItem.name} has been removed from your cart.`)
          newRobotChat(`The ${removedItem.name} has been removed from your cart.`)
        } else {
          // Item not found in the cart
          session.performSpeech(`Sorry, ${itemToRemove} not found in your cart.`)
          newRobotChat(`Sorry, ${itemToRemove} not found in your cart.`)
        }
      } else {
        // No match found in the menu items array
        session.performSpeech(`Sorry, I don't recognize that item.`)
        newRobotChat(`Sorry, I don't recognize that item.`)
        cancelVoiceAssistant()
      }
    }
  )

  // Phrases to listen for
  const menuItemsArray = menuItems.map(item => item.name.toLowerCase())
  const phrases = ['nevermind', 'cancel', ...menuItemsArray]
  session.listenForPhrases(phrases, false, 25)
  newUserOptions(phrases)
}

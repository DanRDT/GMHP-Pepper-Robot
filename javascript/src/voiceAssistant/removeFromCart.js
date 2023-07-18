// @ts-check
import { Cart } from '../cart'
import { menuItems } from '../data/menu'
import { QiSessionConnection } from '../qiClass'
import { capitalize } from '../utils/global'
import { cancelVoiceAssistant, robotTalk } from './setup'
import { clearUserOptions, newRobotChat, newUserChat, newUserOptions } from './textPopups'

/**
 * @param {Cart} cart
 * @param {QiSessionConnection} session */
export function removeItemFromCart(cart, session) {
  // Prompt the user to specify the item to remove
  robotTalk(session, 'Which item would you like to remove?')

  // Set the speech recognition function to handle the user's response
  session.setSpeechRecognitionFunc(
    /** @param {[string, number]} data */
    ([response, confidence]) => {
      if (confidence < 0.45) return

      newUserChat(capitalize(response))
      clearUserOptions()

      if (response === 'cancel') {
        session.performSpeech('Okay')
        newRobotChat('Okay')
        cancelVoiceAssistant()
        return
      }

      const itemToRemove = response.toLowerCase()
      // Pull current cart
      const myCart = cart.getCart()

      // Filter cart items that match the specified name
      const matchingItems = myCart.filter(item => item.name.toLowerCase() === itemToRemove)

      if (matchingItems.length === 0) {
        // Item not found in the cart
        robotTalk(session, `Sorry, ${itemToRemove} not found in your cart.`)
        cancelVoiceAssistant()
        return
      }

      if (matchingItems.length === 1) {
        // Single variant item found in the cart, remove it
        const removeIndex = myCart.findIndex(
          item =>
            item.name.toLowerCase() === matchingItems[0].name.toLowerCase() &&
            item.variant.toLowerCase() === matchingItems[0].variant.toLowerCase()
        )
        const [removedItem] = myCart.splice(removeIndex, 1)
        cart.updateCartUI()
        robotTalk(session, `The ${removedItem.name} has been removed from your cart.`)
        cancelVoiceAssistant()
        return
      }

      // Multiple variant items found in the cart, prompt for the variant
      const variants = matchingItems.map(item => item.variant.toLowerCase())
      robotTalk(session, `Which variant of ${itemToRemove} would you like to remove?`)
      session.setSpeechRecognitionFunc(
        /** @param {[string, number]} data */
        ([variantResponse, variantConfidence]) => {
          if (variantConfidence < 0.5) return
          newUserChat(capitalize(variantResponse))

          if (response === 'cancel') {
            robotTalk(session, 'Okay')
            cancelVoiceAssistant()
            return
          }

          const variantToRemove = variantResponse.toLowerCase()
          const itemIndex = myCart.findIndex(
            item => item.name.toLowerCase() === itemToRemove && item.variant.toLowerCase() === variantToRemove
          )

          if (itemIndex !== -1) {
            // Item found in the cart, remove it
            const [removedItem] = myCart.splice(itemIndex, 1)
            cart.updateCartUI()
            robotTalk(session, `The ${removedItem.name} (${removedItem.variant}) has been removed from your cart.`)
            cancelVoiceAssistant()
          } else {
            // Item not found in the cart
            robotTalk(session, `Sorry, ${itemToRemove} (${variantToRemove}) not found in your cart.`)
          }
        }
      )
      const variantPhrases = ['cancel', ...variants]
      session.listenForPhrases(variantPhrases, false)
      newUserOptions(variantPhrases)
    }
  )

  // Phrases to listen for
  const cartItemsArray = cart.getCart().map(item => item.name.toLowerCase())
  const phrases = ['cancel', ...cartItemsArray]
  session.listenForPhrases(phrases, false)
  newUserOptions(phrases)
}

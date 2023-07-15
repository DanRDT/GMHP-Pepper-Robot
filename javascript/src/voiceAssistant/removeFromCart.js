import { menuItems } from "../data/menu";

/**
 * @param {Cart} cart
 * @param {QiSessionConnection} session
 */
export function removeItemFromCart(cart, session) {
  // Prompt the user to specify the item to remove
  session.performSpeech("Which item would you like to remove?")

  // Set the speech recognition function to handle the user's response
  session.setSpeechRecognitionFunc(([response]) => {
    const itemToRemove = response.toLowerCase()

    // Compare the response to menu item names
    const menuItem = menuItems.find(
      (item) => item.name.toLowerCase() === itemToRemove
    )

    if (menuItem) {
      // Item found in the menu items array

      // Check if the item exists in the cart
      const cartItems = cart.getCart()
      const itemIndex = cartItems.findIndex(
        (item) => item.name.toLowerCase() === itemToRemove
      )

      if (itemIndex !== -1) {
        // Item found in the cart, remove it
        const removedItem = cartItems.splice(itemIndex, 1)[0];
        session.performSpeech(`The ${removedItem.name} has been removed from your cart.`)
      } else {
        // Item not found in the cart
        session.performSpeech(`Sorry, ${itemToRemove} not found in your cart.`)
      }
    } else {
      // No match found in the menu items array
      session.performSpeech(`Sorry, I don't recognize that item.`)
    }

    // Reset the speech recognition function to the main voice assistant handler
    session.setSpeechRecognitionFunc(voiceAssistant)
  })

// set function to be run when phrase heard
session.setSpeechRecognitionFunc(handlePhraseHeard)
// Phrases to listen for
const menuItemsArray = menuItems.map((item) => item.name.toLowerCase())
session.listenForPhrases(menuItemsArray, false, 25)

}

 
 
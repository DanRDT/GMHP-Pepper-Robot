// @ts-check
import { Cart } from '../cart'
import { menuItems } from '../data/menu'
import { goToCartPage } from '../pages/cart-page'
import { goToItemPage } from '../pages/item-page'
import { QiSessionConnection } from '../qiClass'
import { capitalize } from '../utils/global'
import { cancelVoiceAssistant } from './setup'
import { clearUserOptions, newRobotChat, newUserChat, newUserOptions } from './textPopups'

/**
 * @param {Cart} cart
 * @param {QiSessionConnection} session */
export function addItemToOrderVoiceAssistant(cart, session) {
  // Prompt the user to specify the item to add
  session.performSpeech('Which item would you like to add?')
  clearUserOptions()
  newRobotChat('Which item would you like to add?')

  // loops thru menu items and creates new array of just the item names
  const itemNames = menuItems.map(item => item.name.toLowerCase())
  const itemPhrases = itemNames.map(item => 'i want to order a ' + item.toLowerCase())

  // Main function starts here. It accepts cart and session as parameters
  session.setSpeechRecognitionFunc(
    /** @param {[string, number]} data */
    ([value, confidence]) => {
      // Listener for the event when a phrase is heard by the Pepper bot

      if (confidence < 0.45) return // If the confidence score is too low (less than 0.45), it returns and exits the function

      newUserChat(capitalize(value))
      let caseStatus = value.toLowerCase() // Convert the heard phrase to lowercase to make it easier for comparison

      switch (
        true // A switch-case is used to check the phrase against certain conditions
      ) {
        case caseStatus.startsWith('i want to order a ') || itemNames.includes(value): // If the user wants to order a specific item, this case runs
          const itemName = caseStatus.startsWith('i want to order a ') ? caseStatus.slice(18) : caseStatus // Extract the item name from the phrase if its a phrase else just use the name
          const menuItem = menuItems.find(item => item.name.toLowerCase() === itemName) // Find the item in the menu
          if (!menuItem) {
            // If the item is not found, Pepper bot will apologize and the function will return
            session.performSpeech('Sorry, I could not find the item ' + itemName)
            newRobotChat('Sorry, I could not find the item ' + capitalize(itemName))
          } else {
            const itemCard = $(`.food-card[data-name="${menuItem.name}"]`) // If the item is found, save it to the itemCard variable
            goToItemPage(itemCard) // Navigate to the item's page
            session.performSpeech('You have selected ' + itemName) // Pepper bot confirms the selection
            itemVariantSelection(cart, session, menuItem) // Call a function to handle item variant selection
          }
          break

        case caseStatus === 'what would you recommend': // If the user asks for a recommendation, this case runs
          clearUserOptions()
          let recommendedName = recommendRandomItem() // Call a function to get a random special
          let recommendedItem = menuItems.find(item => item.name === recommendedName) // Find the special in the daily specials
          const itemCard = $(`.food-card[data-name="${recommendedItem.name}"]`) // If the special is found, save it to the itemCard variable
          goToItemPage(itemCard) // Navigate to the special's page
          WouldYouLikeToAddToCart(cart, session, recommendedItem)
          break

        case caseStatus === 'nevermind' || caseStatus === 'cancel': // If the user wants to cancel
          session.performSpeech('Okay')
          newRobotChat('Okay')
          cancelVoiceAssistant()
          break

        default: // If the heard phrase doesn't match any of the above cases, then something went wrong and it cancels
          session.performSpeech("Sorry, I didn't understand that.")
          newRobotChat("Sorry, I didn't understand that.")
          cancelVoiceAssistant()
          break
      }
    }
  )

  const phrases = ['what would you recommend', 'nevermind', 'cancel', ...itemNames, ...itemPhrases]

  // start listening for phrases
  session.listenForPhrases(phrases, false)
  newUserOptions(phrases)
}

function recommendRandomItem() {
  // This function gets a random special from the menu
  const menuItemsArray = menuItems.map(item => item.name)
  const randomIndex = Math.floor(Math.random() * menuItemsArray.length)
  const randomSpecial = menuItemsArray[randomIndex]
  return randomSpecial
}

/**
 * @param {Cart} cart
 * @param {QiSessionConnection} session
 * @param {import('../data/menu').MenuItem} menuItem */
function itemVariantSelection(cart, session, menuItem) {
  // Function to handle the selection of an item variant
  let variants = menuItem.variants

  if (variants.length === 1) {
    // If the item has only one variant, it gets selected automatically
    const selectedVariant = variants[0]
    addQuantity(cart, session, menuItem.name, selectedVariant)
  } else {
    // If the item has multiple variants, Pepper will list them and then listen for the user's choice
    const variantsList = variants.map(variant => variant.name).join(', ')
    session.performSpeech(`Which variant would you like? We have: ${variantsList}`)

    const variantsArray = menuItem.variants.map(variant => variant.name)

    session.setSpeechRecognitionFunc(
      /** @param {[string, number]} data */
      ([response, confidence]) => {
        if (confidence < 0.45) return
        newUserChat(capitalize(response))

        if (response === 'cancel') {
          session.performSpeech('Okay')
          newRobotChat('Okay')
          cancelVoiceAssistant()
        } else if (variantsArray.includes(response)) {
          const selectedVariant = variants.find(variant => variant.name === response)
          addQuantity(cart, session, menuItem.name, selectedVariant)
        } else {
          session.performSpeech(`Something went wrong. I didn't understand what you said.`)
          newRobotChat(`Something went wrong. I didn't understand what you said.`)
          cancelVoiceAssistant()
        }
      }
    )

    const phrases = ['cancel', ...variantsArray]
    session.listenForPhrases(phrases, false)
    newUserOptions(phrases)
  }
}

/**
 * @param {Cart} cart
 * @param {QiSessionConnection} session
 * @param {string} name
 * @param {import('../data/menu').Variant} variant */
function addQuantity(cart, session, name, variant) {
  session.performSpeech(`How many would you like to add to cart?`)
  newRobotChat(`How many would you like to add to cart?`)

  const numbersArray = Array.from({ length: 20 }, (_, i) => (i + 1).toString())

  session.setSpeechRecognitionFunc(
    /** @param {[string, number]} data */
    ([response, confidence]) => {
      if (confidence < 0.45) return
      newUserChat(capitalize(response))

      if (response === 'cancel') {
        session.performSpeech('Okay')
        newRobotChat('Okay')
        cancelVoiceAssistant()
      } else if (numbersArray.includes(response)) {
        session.performSpeech(`Added ${name} to your cart`)
        newRobotChat(`Added ${name} to your cart`)

        const quantity = Number(response)
        cart.addToCart({
          name: name,
          variant: variant.name,
          price: variant.price,
          quantity: quantity,
          image: variant.image,
          calories: variant.calories,
        })

        goToCartPage(cart)

        cancelVoiceAssistant()
      } else {
        session.performSpeech(`Something went wrong. I didn't understand what you said.`)
        newRobotChat(`Something went wrong. I didn't understand what you said.`)
        cancelVoiceAssistant()
      }
    }
  )

  const phrases = ['cancel', ...numbersArray]
  session.listenForPhrases(phrases, false)
  newUserOptions(phrases)
}

/**
 * @param {Cart} cart
 * @param {QiSessionConnection} session
 * @param {import('../data/menu').MenuItem} menuItem */
function WouldYouLikeToAddToCart(cart, session, menuItem) {
  session.performSpeech('Did you want to order ' + menuItem.name + '?') // Pepper bot suggests the special
  newRobotChat('Did you want to order ' + menuItem.name + '?')

  session.setSpeechRecognitionFunc(
    /** @param {[string, number]} data */
    ([response, confidence]) => {
      if (confidence < 0.45) return
      newUserChat(capitalize(response))

      if (response === 'yes' || response === 'yeah' || response === 'yup') {
        itemVariantSelection(cart, session, menuItem) // Call a function to handle item variant selection
      } else if (response === 'no' || response === 'nope' || response === 'nah') {
        session.performSpeech('Okay')
        newRobotChat('Okay')
        cancelVoiceAssistant()
      } else {
        session.performSpeech(`Something went wrong. I didn't understand what you said.`)
        newRobotChat(`Something went wrong. I didn't understand what you said.`)
        cancelVoiceAssistant()
      }
    }
  )

  const phrases = ['yes', 'no', 'yeah', 'nope', 'yup', 'nah']
  session.listenForPhrases(phrases, false)
  newUserOptions(phrases)
}

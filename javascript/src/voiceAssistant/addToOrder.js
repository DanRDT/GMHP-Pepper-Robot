// @ts-check
import { Cart } from '../cart'
import { menuItems } from '../data/menu'
import { goToCartPage } from '../pages/cart-page'
import { goToItemPageWithObject } from '../pages/item-page'
import { QiSessionConnection } from '../qiClass'
import { capitalize } from '../utils/global'
import { cancelVoiceAssistant, robotTalk } from './setup'
import { clearUserOptions, newRobotChat, newUserChat, newUserOptions } from './textPopups'

/**
 * @param {Cart} cart
 * @param {QiSessionConnection} session */
export function addItemToOrderVoiceAssistant(cart, session) {
  // Prompt the user to specify the item to add
  clearUserOptions()
  robotTalk(session, 'Which item would you like to add?')

  // loops thru menu items and creates new array of just the item names
  const itemNames = menuItems.map(item => item.name.toLowerCase())

  session.setSpeechRecognitionFunc(
    /** @param {[string, number]} data */
    ([value, confidence]) => {
      if (confidence < 0.5) return

      newUserChat(capitalize(value))
      let caseStatus = value.toLowerCase()

      switch (true) {
        case itemNames.includes(caseStatus):
          const itemName = caseStatus // Extract the item name from the phrase if its a phrase else just use the name
          const menuItem = menuItems.find(item => item.name.toLowerCase() === itemName) // Find the item in the menu
          if (!menuItem) {
            // If the item is not found, Pepper bot will apologize and the function will return
            robotTalk(session, 'Sorry, I could not find the item ' + capitalize(itemName))
          } else {
            goToItemPageWithObject(menuItem) // Navigate to the item's page
            robotTalk(session, 'You have selected ' + itemName)
            itemVariantSelection(cart, session, menuItem) // Call a function to handle item variant selection
          }
          break

        case caseStatus === 'what would you recommend': // If the user asks for a recommendation, this case runs
          clearUserOptions()
          // Call a function to get a random special
          let recommendedItem = recommendRandomItem()
          goToItemPageWithObject(recommendedItem)
          // if (recommendedItem.variants.length > 1) {
          // itemVariantSelection(cart, session, recommendedItem)
          // } else {
          robotTalk(session, `My recommendation is the ${recommendedItem.name}`)
          WouldYouLikeToAddToCart(cart, session, recommendedItem)
          // }
          break

        case caseStatus === 'cancel': // If the user wants to cancel
          robotTalk(session, 'Okay')
          cancelVoiceAssistant()
          break

        default: // If the heard phrase doesn't match any of the above cases, then something went wrong and it cancels
          robotTalk(session, "Sorry, I didn't understand that.")
          cancelVoiceAssistant()
          break
      }
    }
  )

  const phrases = ['what would you recommend', 'cancel', ...itemNames]

  // start listening for phrases
  session.listenForPhrases(phrases, true)
  newUserOptions(phrases)
}

function recommendRandomItem() {
  // This function gets a random item from the menu
  const randomIndex = Math.floor(Math.random() * menuItems.length)
  return menuItems[randomIndex]
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
    robotTalk(session, `Which variant would you like? We have: ${variantsList}`)

    const variantsArray = menuItem.variants.map(variant => variant.name)

    session.setSpeechRecognitionFunc(
      /** @param {[string, number]} data */
      ([response, confidence]) => {
        if (confidence < 0.45) return
        newUserChat(capitalize(response))

        if (response === 'cancel') {
          robotTalk(session, 'Okay')
          cancelVoiceAssistant()
        } else if (variantsArray.includes(response)) {
          const selectedVariant = variants.find(variant => variant.name === response)
          addQuantity(cart, session, menuItem.name, selectedVariant)
        } else {
          robotTalk(session, `Something went wrong. I didn't understand what you said.`)
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
  robotTalk(session, `How many would you like to add to cart?`)

  const numbersArray = Array.from({ length: 20 }, (_, i) => (i + 1).toString())

  session.setSpeechRecognitionFunc(
    /** @param {[string, number]} data */
    ([response, confidence]) => {
      if (confidence < 0.45) return
      newUserChat(capitalize(response))

      if (response === 'cancel') {
        robotTalk(session, 'Okay')
        cancelVoiceAssistant()
      } else if (numbersArray.includes(response)) {
        robotTalk(session, `Added ${name} to your cart`)

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
        robotTalk(session, `Something went wrong. I didn't understand what you said.`)
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
  robotTalk(session, 'Should I add ' + menuItem.name + ' to cart?')

  session.setSpeechRecognitionFunc(
    /** @param {[string, number]} data */
    ([response, confidence]) => {
      if (confidence < 0.45) return
      newUserChat(capitalize(response))

      if (response === 'yes' || response === 'yeah' || response === 'yup') {
        itemVariantSelection(cart, session, menuItem) // Call a function to handle item variant selection
      } else if (response === 'no' || response === 'nope' || response === 'nah') {
        robotTalk(session, 'Okay')
        cancelVoiceAssistant()
      } else {
        robotTalk(session, `Something went wrong. I didn't understand what you said.`)
        cancelVoiceAssistant()
      }
    }
  )

  const phrases = ['yes', 'no', 'yeah', 'nope', 'yup', 'nah']
  session.listenForPhrases(phrases, false)
  newUserOptions(phrases)
}

// /**
//  * @param {Cart} cart
//  * @param {QiSessionConnection} session
//  * @param {import('../data/menu').MenuItem} menuItem */
// function whichVariant(cart, session, menuItem) {
//   robotTalk(session, 'Which variant would you like to add?')

//   const variants = menuItem.variants.map(variant => variant.name)

//   session.setSpeechRecognitionFunc(
//     /** @param {[string, number]} data */
//     ([response, confidence]) => {
//       if (confidence < 0.45) return
//       newUserChat(capitalize(response))

//       if (response === 'cancel') {
//         session.performSpeech('Okay')
//         newRobotChat('Okay')
//         cancelVoiceAssistant()
//       } else if (variants.includes(response)) {
//         WouldYouLikeToAddToCart(cart, session, menuItem)
//       } else {
//         session.performSpeech(`Something went wrong. I didn't understand what you said.`)
//         newRobotChat(`Something went wrong. I didn't understand what you said.`)
//         cancelVoiceAssistant()
//       }
//     }
//   )

//   const phrases = ['cancel', ...variants]
//   session.listenForPhrases(phrases, false)
//   newUserOptions(phrases)
// }
// //

//@ts-check
// this file contains the setup code for the voice assistant
import { Cart } from '../cart'
import { menuItems } from '../data/menu'
import { goToCartPage } from '../pages/cart-page'
import { QiSessionConnection } from '../qiClass'
import { newPopup, secs } from '../utils/global'
import { navigateToPage } from '../utils/pages'
import { getRandomPepperHowCanIHelp } from '../utils/pepper'
import { addItemToOrderVoiceAssistant } from './addToOrder'
import { removeItemFromCart } from './removeFromCart'
import { clearUserOptions, newRobotChat, newUserChat, newUserOptions } from './textPopups'

/**
 * @param {Cart} cart
 * @param {QiSessionConnection} session */
export function setupVoiceAssistant(cart, session) {
  /** @param {[string, number]} data */
  function voiceAssistant(data) {
    // destructure index 0 and 1 from data as separate variables
    const [value, confidence] = data
    // if confidence is bellow 0.45 return from the function early
    if (confidence < 0.45) return
    newUserChat(value)
    clearUserOptions()

    // Check for value in code and run relevant code
    switch (value) {
      case 'view cart':
        goToCartPage(cart)
        break
      case 'start my order':
        navigateToPage('main-menu-page')
        newRobotChat('What can I help you with?')
        break
      case 'cancel my order':
        const confirmationPopupText3 = 'Are you sure you want to cancel your order?'
        newRobotChat(confirmationPopupText3)
        session.performSpeech(confirmationPopupText3, true)
        session.listenForPhrases(['yes', 'no', 'yeah', 'nope', 'yup', 'nah'], false)
        newUserOptions(['yes', 'no', 'yeah', 'nope', 'yup', 'nah'])
        session.setSpeechRecognitionFunc(([response, confidence]) => {
          if (confidence < 0.55) return
          newUserChat(response)
          if (response === 'yes' || response === 'yeah' || response === 'yup') {
            $('#main-menu-page .cancel-btn').trigger('click')
          } else if (response === 'no' || response === 'nope' || response === 'nah') {
            newRobotChat(confirmationPopupText3)
            session.performSpeech('Okay, your order will not be canceled.')
          }
          cancelVoiceAssistant()
        })
        break
      case 'clear cart':
        goToCartPage(cart)
        const confirmationPopupText2 = 'Are you sure you want to clear your cart?'
        newRobotChat(confirmationPopupText2)
        session.performSpeech(confirmationPopupText2, true)
        session.listenForPhrases(['yes', 'no', 'yeah', 'nope', 'yup', 'nah'], false)
        newUserOptions(['yes', 'no', 'yeah', 'nope', 'yup', 'nah'])
        session.setSpeechRecognitionFunc(([response, confidence]) => {
          if (confidence < 0.55) return
          newUserChat(response)
          if (response === 'yes' || response === 'yeah' || response === 'yup') {
            $('#cart-page .clear-cart-btn').trigger('click')
            session.performSpeech('Okay, cart cleared.')
            newRobotChat('Okay, cart cleared.')
          } else if (response === 'no' || response === 'nope' || response === 'nah') {
            session.performSpeech('Okay, your cart will not be cleared.')
            newRobotChat('Okay, your cart will not be cleared.')
          }
          cancelVoiceAssistant()
        })
        break
      case 'place order':
        goToCartPage(cart)
        const confirmationPopupText = 'Does your order look right?'
        newRobotChat(confirmationPopupText)
        session.performSpeech(confirmationPopupText, true)
        session.listenForPhrases(['yes', 'no', 'yeah', 'nope', 'yup', 'nah'], false)
        newUserOptions(['yes', 'no', 'yeah', 'nope', 'yup', 'nah'])
        session.setSpeechRecognitionFunc(([response, confidence]) => {
          if (confidence > 0.55) return
          newUserChat(response)
          if (response === 'yes' || response === 'yeah' || response === 'yup') {
            $('#cart-page .place-order-btn').trigger('click')
            session.performSpeech('Okay')
            newRobotChat('Okay')
          } else if (response === 'no' || response === 'nope' || response === 'nah') {
            session.performSpeech('Okay')
            newRobotChat('Okay')
          }
          cancelVoiceAssistant()
        })
        break
      case 'remove item from cart':
        removeItemFromCart(cart, session)
        break
      case 'add item to order':
        addItemToOrderVoiceAssistant(cart, session)
        break
      case 'update quantity':
        // TODO
        break
      case 'show me a category':
        // TODO
        break
      case 'how many calories are in ':
        const speechText = 'What item would you like to know the calorie count for?'
        newRobotChat(speechText)
        session.performSpeech(speechText, true)

        const menuItemsList = menuItems.map(item => item.name.toLowerCase())
        session.setSpeechRecognitionFunc(([itemToCheck, confidence]) => {
          if (confidence > 0.55) return

          if (itemToCheck === 'cancel') {
            session.performSpeech('Okay')
            newRobotChat('Okay')
            cancelVoiceAssistant()
            return
          }

          const menuItem = menuItems.find(item => item.name.toLowerCase() === itemToCheck.toLowerCase())
          if (menuItem) {
            if (menuItem.variants.length <= 1) {
              const { name } = menuItem
              const { calories } = menuItem.variants[0]
              session.performSpeech(`There are ${calories} calories in ${name}.`)
              newRobotChat(`There are ${calories} calories in ${name}.`)
            } else {
              const { name } = menuItem
              let totalCalories = 0
              const variantCalories = menuItem.variants.map(variant => {
                totalCalories += variant.calories
                return { name: variant.name, calories: variant.calories }
              })
              const avgCalories = totalCalories / menuItem.variants.length
              let calorieVariantText = ''

              variantCalories.forEach(variantCalorie => {
                calorieVariantText += `${variantCalorie.name} has ${variantCalorie.calories} calories. \n`
              })

              const calorieText = `${name} has multiple options with an average calorie count of ${avgCalories}.
                ${calorieVariantText}`
              session.performSpeech(calorieText)
              newRobotChat(calorieText)
            }
          } else {
            session.performSpeech(`I'm sorry, I don't have the calorie information for ${itemToCheck}.`)
            newRobotChat(`I'm sorry, I don't have the calorie information for ${itemToCheck}.`)
          }

          cancelVoiceAssistant()
        })
        const caloriePhrases = ['cancel', ...menuItemsList]
        session.listenForPhrases(caloriePhrases, false)
        newUserOptions(caloriePhrases)
        break

      default:
        session.performSpeech(`Something went wrong. I didn't understand that.`)
        cancelVoiceAssistant()
        break
    }
  }

  // Voice assistant btn
  $('#voice-assistant-btn').on('click', function () {
    resetVoiceAssistantTextBubbles()
    // set function that will run when phrase is heard
    session.setSpeechRecognitionFunc(voiceAssistant)

    const howCanIHelp = getRandomPepperHowCanIHelp()
    session.performSpeech(howCanIHelp, true)
    newRobotChat(howCanIHelp)
    // phrases to listen for
    const voiceAssistantValues = [
      'add item to order',
      'view cart',
      'start my order',
      'remove item from cart',
      'show me a category',
      'clear cart',
      'cancel my order',
      'update quantity',
      'place order',
      'how many calories are in ',
    ]
    // set phrases to listen for and the length of time in seconds to listen for
    session.listenForPhrases(voiceAssistantValues, false)
    newUserOptions(voiceAssistantValues)
    $(this).attr('data-active', 'true') // set btn active
  })

  // Voice assistant btn after it was set to active
  $('#voice-assistant-cancel-btn').on('click', function () {
    session.stopListening() // Stop listening early
    resetVoiceAssistantTextBubbles()
    $(this).attr('data-active', 'false') // set btn inactive
  })
}

/**
 * @param {'delayed'|'instant'} when default delayed
 * @param {number} secondsWait default 1 second delay */
export function cancelVoiceAssistant(when = 'delayed', secondsWait = 1) {
  if (when === 'delayed') {
    setTimeout(() => {
      $('#voice-assistant-cancel-btn').trigger('click')
    }, secs(secondsWait))
  } else {
    $('#voice-assistant-cancel-btn').trigger('click')
  }
}

export function resetVoiceAssistantTextBubbles() {
  $('#voice-assistant-text-bubbles').empty()
  $('#user-options-container').empty()
}

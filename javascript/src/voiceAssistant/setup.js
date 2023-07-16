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
        cancelVoiceAssistant()
        break
      case 'start my order':
        navigateToPage('main-menu-page')
        cancelVoiceAssistant()
        break
      case 'cancel my order':
        const confirmationPopupText3 = 'Are you sure you want to cancel your order?'
        newRobotChat(confirmationPopupText3)
        session.performSpeech(confirmationPopupText3, true)
        session.listenForPhrases(['yes', 'no', 'yeah', 'nope', 'yup', 'nah'], false, 10)
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
        // TODO
        // Ask them if they are sure and then run code below
        const confirmationPopupText2 = 'Are you sure you want to clear your cart?'
        newRobotChat(confirmationPopupText2)
        session.performSpeech('Are you sure you want to clear your cart?', true)
        session.listenForPhrases(['yes', 'no', 'yeah', 'nope', 'yup', 'nah'], false, 10)
        session.setSpeechRecognitionFunc(([response, confidence]) => {
          if (confidence < 0.55) return
          if (response === 'yes' || response === 'yeah' || response === 'yup') {
            $('#cart-page .clear-cart-btn').trigger('click')
          } else if (response === 'no' || response === 'nope' || response === 'nah') {
            session.performSpeech('Okay, your cart will not be cleared.')
          }
          cancelVoiceAssistant()
        })
        break
      case 'place order':
        goToCartPage(cart)
        // TODO
        // Ask them if the order looks right and then run code below
        const confirmationPopupText = 'Does your order look right?'
        newRobotChat(confirmationPopupText)
        session.performSpeech('Does your order look right?', true)
        session.listenForPhrases(['yes', 'no', 'yeah', 'nope', 'yup', 'nah'], false, 10)
        session.setSpeechRecognitionFunc(([response, confidence]) => {
          if (confidence > 0.55) return
          if (response === 'yes' || response === 'yeah' || response === 'yup') {
            $('#cart-page .place-order-btn').trigger('click')
          } else if (response === 'no' || response === 'nope' || response === 'nah') {
            session.performSpeech('Okay nevermind')
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

      case 'How many calories are in ':
        const speechText = 'Please provide the name of the item from the menu for which you want to know the calories.'
        newPopup(speechText)
        session.performSpeech(speechText, true)

        const menuItemsList = menuItems.map(item => item.name.toLowerCase())
        session.listenForPhrases(menuItemsList, false, 10)
        session.setSpeechRecognitionFunc(([itemToCheck, confidence]) => {
          if (confidence > 0.55) return
          const menuItem = menuItems.find(item => item.name.toLowerCase() === itemToCheck.toLowerCase())
          if (menuItem && 'calories' in menuItem.variants[0]) {
            const { name, calories } = menuItem.variants[0]
            session.performSpeech(`There are ${calories} calories in ${name}.`)
          } else {
            session.performSpeech(`I'm sorry, I don't have the calorie information for ${itemToCheck}.`)
          }

          cancelVoiceAssistant()
        })
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
    ]
    // set phrases to listen for and the length of time in seconds to listen for
    session.listenForPhrases(voiceAssistantValues, false, 25)
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

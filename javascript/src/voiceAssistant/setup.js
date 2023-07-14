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
import { newRobotChat, newUserOptions } from './textPopups'

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

    // Check for value in code and run relevant code
    switch (value) {
      case 'view cart':
        cancelVoiceAssistant()
        goToCartPage(cart)
        break
      case 'start my order':
        cancelVoiceAssistant()
        navigateToPage('main-menu-page')
        break
      case 'cancel my order':
        // TODO
        break
      case 'clear cart':
        goToCartPage(cart)
        // TODO
        // Ask them if they are sure and then run code below
        // $('#cart-page .clear-cart-btn').trigger('click')
        break
      case 'place order':
        goToCartPage(cart)
        // TODO
        // Ask them if the order looks right and then run code below
        // $('#cart-page .place-order-btn').trigger('click')
        break
      case 'remove item from cart':
        // TODO
        break
      case 'add item to order':
        addItemToOrderVoiceAssistant(cart, session)
      case 'update quantity':
        // TODO
        break
      case 'show me a category':
        // TODO
        break
      default:
        session.performSpeech(`Something went wrong. I didn't understand that.`)
        cancelVoiceAssistant()
        break
    }
  }

  // Voice assistant btn
  $('.voice-assistant-activate-btn').on('click', function () {
    resetVoiceAssistantTextBubbles()
    // set function that will run when phrase is heard
    session.setSpeechRecognitionFunc(voiceAssistant)
    // phrases to listen for
    const voiceAssistantValues = [
      'view cart',
      'start my order',
      'cancel my order',
      'clear cart',
      'place order',
      'remove item from cart',
      'add item to order',
      'update quantity',
      'show me a category',
    ]
    // set phrases to listen for and the length of time in seconds to listen for
    session.listenForPhrases(voiceAssistantValues, false, 25)
    const howCanIHelp = getRandomPepperHowCanIHelp()
    session.performSpeech(howCanIHelp, true)
    console.log('yes')
    newRobotChat(howCanIHelp)
    newUserOptions(voiceAssistantValues)
    $('#voice-assistant-container').attr('data-active', 'true') // set inactive
  })

  // Voice assistant cancel btn
  $('.voice-assistant-cancel-btn').on('click', function () {
    session.stopListening() // Stop listening early
    $('#voice-assistant-container').attr('data-active', 'false') // set inactive
    resetVoiceAssistantTextBubbles()
  })
}

export function cancelVoiceAssistant() {
  $('.voice-assistant-cancel-btn.x-button').trigger('click')
}

export function resetVoiceAssistantTextBubbles() {
  $('#voice-assistant-text-bubbles').empty()
  $('#user-options-container').empty()
}

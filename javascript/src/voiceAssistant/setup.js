//@ts-check
// this file contains the setup code for the voice assistant
import { Cart } from '../cart'
import { menuItems } from '../data/menu'
import { goToCartPage } from '../pages/cart-page'
import { QiSessionConnection } from '../qiClass'
import { newPopup, secs } from '../utils/global'
import { navigateToPage } from '../utils/pages'
import { addItemToOrderVoiceAssistant } from './addToOrder'

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
        const confirmationPopupText3 = 'Are you sure you want to cancel your order?'
        newPopup(confirmationPopupText3)
        session.performSpeech('Are you sure you want to cancel your order?', true)
        session.listenForPhrases(['yes', 'no', 'yeah', 'nope', 'yup', 'nah'], false, 10)
        session.setSpeechRecognitionFunc(([response, confidence]) => {
          if (confidence < 0.55) return
          if (response === 'yes' || response === 'yeah' || response === 'yup') {
          $('#main-menu-page .cancel-btn').trigger('click')
            cancelVoiceAssistant()
          } else if (response === 'no' || response === 'nope' || response === 'nah') {
            session.performSpeech('Okay, your order will not be canceled.')
            cancelVoiceAssistant()
          }
        })
        break
      case 'clear cart':
        goToCartPage(cart)
        // TODO
        // Ask them if they are sure and then run code below
        const confirmationPopupText2 = 'Are you sure you want to clear your cart?'
        newPopup(confirmationPopupText2)
        session.performSpeech('Are you sure you want to clear your cart?', true)
        session.listenForPhrases(['yes', 'no', 'yeah', 'nope', 'yup', 'nah'], false, 10)
        session.setSpeechRecognitionFunc(([response, confidence]) => {
          if (confidence < 0.55) return
          if (response === 'yes' || response === 'yeah' || response === 'yup') {
            $('#cart-page .clear-cart-btn').trigger('click')
            cancelVoiceAssistant()
          } else if (response === 'no' || response === 'nope' || response === 'nah') {
            session.performSpeech('Okay, your cart will not be cleared.')
            cancelVoiceAssistant()
          }
        })
        break
      case 'place order':
        goToCartPage(cart)
        // TODO
        // Ask them if the order looks right and then run code below
        const confirmationPopupText = 'Does your order look right?'
        newPopup(confirmationPopupText)
        session.performSpeech("Does your order look right?", true )
        session.listenForPhrases(['yes', 'no', 'yeah', 'nope', 'yup', 'nah'], false, 10)
        session.setSpeechRecognitionFunc(([response, confidence]) => {
          if (confidence > .55) return
          if (response === 'yes' || response === 'yeah' || response === 'yup') {
            $('#cart-page .place-order-btn').trigger('click')
            cancelVoiceAssistant()
          }
          else if (response === "no" || response === "nope" || response === 'nah') {
            session.performSpeech("Okay nevermind")
            cancelVoiceAssistant()
          }
        })
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
      
        case 'How many calories are in ':
          const speechText = 'Please provide the name of the item from the menu for which you want to know the calories.';
          newPopup(speechText);
          session.performSpeech(speechText, true);

          const menuItemsList = menuItems.map(item => item.name.toLowerCase());
          session.listenForPhrases(menuItemsList, false, 10);
          session.setSpeechRecognitionFunc(([itemToCheck, confidence]) => {
            if (confidence > .55) return
              const menuItem = menuItems.find(item => item.name.toLowerCase() === itemToCheck.toLowerCase());
              if (menuItem && 'calories' in menuItem.variants[0]) {
                const { name, calories } = menuItem.variants[0];
                session.performSpeech(`There are ${calories} calories in ${name}.`);
              } else {
                session.performSpeech(`I'm sorry, I don't have the calorie information for ${itemToCheck}.`);
              }
            
            cancelVoiceAssistant();
          });
          break;

        
        
 
      default:
        session.performSpeech(`Something went wrong. I didn't understand that.`)
        cancelVoiceAssistant()
        break
    }
  }

  // Voice assistant btn
  $('#voice-assistant-btn').on('click', function () {
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
    $(this).attr('data-active', 'true') // set btn active
  })

  // Voice assistant btn after it was set to active
  $('#voice-assistant-cancel-btn').on('click', function () {
    session.stopListening() // Stop listening early
    $(this).attr('data-active', 'false') // set btn inactive
  })
}

export function cancelVoiceAssistant() {
  $('#voice-assistant-cancel-btn').trigger('click')
}

//@ts-check
// this file contains the setup code for the voice assistant
import { Cart } from '../cart'
import { foodCategories, menuItems } from '../data/menu'
import { yesNoPhrases } from '../data/pepper'
import { goToCartPage } from '../pages/cart-page'
import { QiSessionConnection } from '../qiClass'
import { capitalize, newPopup, secs } from '../utils/global'
import { navigateToPage } from '../utils/pages'
import { getRandomPepperHowCanIHelp } from '../utils/pepper'
import { addItemToOrderVoiceAssistant } from './addToOrder'
import { removeItemFromCart } from './removeFromCart'
import { clearChats, clearUserOptions, newRobotChat, newUserChat, newUserOptions } from './textPopups'

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
    newUserChat(capitalize(value))

    // Check for value in code and run relevant code
    switch (value) {
      case 'view cart':
        goToCartPage(cart)
        setTimeout(() => {
          clearChats()
          whatCanIHelpYouWith(session)
        }, secs(1))
        break
      case 'start my order':
        navigateToPage('main-menu-page')
        setTimeout(() => {
          clearChats()
          whatCanIHelpYouWith(session)
        }, secs(1))
        break
      case 'cancel my order':
        robotTalk(session, 'Are you sure you want to cancel your order?')
        session.listenForPhrases(yesNoPhrases, false)
        newUserOptions(yesNoPhrases)
        session.setSpeechRecognitionFunc(([response, confidence]) => {
          if (confidence < 0.55) return
          newUserChat(capitalize(response))
          if (response === 'yes' || response === 'yeah' || response === 'yup') {
            $('#main-menu-page .cancel-btn').trigger('click')
            robotTalk(session, 'Okay, your order has been canceled.')
          } else if (response === 'no' || response === 'nope' || response === 'nah') {
            robotTalk(session, 'Okay, your order will not be canceled.')
          }
          cancelVoiceAssistant()
        })
        break
      case 'clear cart':
        goToCartPage(cart)
        robotTalk(session, 'Are you sure you want to clear your cart?')
        session.setSpeechRecognitionFunc(
          /** @param {[string, number]} data */
          ([response, confidence]) => {
            if (confidence < 0.5) return
            newUserChat(capitalize(response))
            if (response === 'yes' || response === 'yeah' || response === 'yup') {
              $('#cart-page .clear-cart-btn').trigger('click')
              robotTalk(session, 'Okay, cart cleared.')
            } else if (response === 'no' || response === 'nope' || response === 'nah') {
              robotTalk(session, 'Okay, your cart will not be cleared.')
            }
            cancelVoiceAssistant()
          }
        )
        session.listenForPhrases(yesNoPhrases, false)
        newUserOptions(yesNoPhrases)
        break
      case 'place order':
        goToCartPage(cart)
        robotTalk(session, 'Does your order look right?')
        session.listenForPhrases(yesNoPhrases, false)
        newUserOptions(yesNoPhrases)
        session.setSpeechRecognitionFunc(
          /** @param {[string, number]} data */
          ([response, confidence]) => {
            if (confidence < 0.5) return
            newUserChat(capitalize(response))
            if (response === 'yes' || response === 'yeah' || response === 'yup') {
              if (cart.getCart().length < 1) {
                robotTalk(session, 'Sorry, you only have one item in your cart.')
              } else {
                $('#cart-page #place-order-btn').trigger('click')
                robotTalk(session, 'Okay')
              }
            } else if (response === 'no' || response === 'nope' || response === 'nah') {
              robotTalk(session, 'Okay')
            }
            cancelVoiceAssistant()
          }
        )
        break
      case 'remove item from cart':
        removeItemFromCart(cart, session)
        break
      case 'add item to order':
        addItemToOrderVoiceAssistant(cart, session)
        break
      case 'how many calories are in ':
        robotTalk(session, 'What item would you like to know the calorie count for?')

        const menuItemsList = menuItems.map(item => item.name.toLowerCase())
        session.setSpeechRecognitionFunc(
          /** @param {[string, number]} data */
          ([itemToCheck, confidence]) => {
            if (confidence < 0.45) return
            newUserChat(capitalize(itemToCheck))

            if (itemToCheck === 'cancel') {
              robotTalk(session, 'Okay')
              cancelVoiceAssistant()
              return
            }

            const menuItem = menuItems.find(item => item.name.toLowerCase() === itemToCheck.toLowerCase())
            if (menuItem) {
              if (menuItem.variants.length <= 1) {
                const { name } = menuItem
                const { calories } = menuItem.variants[0]
                robotTalk(session, `There are ${calories} calories in ${name}.`)
                cancelVoiceAssistant()
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
                robotTalk(session, calorieText)
                cancelVoiceAssistant('delayed', calorieText.length * 0.07)
              }
            } else {
              robotTalk(session, `I'm sorry, I don't have the calorie information for ${itemToCheck}.`)
              cancelVoiceAssistant()
            }
          }
        )
        const caloriePhrases = ['cancel', ...menuItemsList]
        session.listenForPhrases(caloriePhrases, false)
        newUserOptions(caloriePhrases)
        break
      case 'show me a category':
        robotTalk(session, 'Which category would yo like to see?')
        const categories = foodCategories.map(category => category.name)
        const phrases = ['cancel', ...categories]
        session.listenForPhrases(phrases, false)
        newUserOptions(phrases)
        session.setSpeechRecognitionFunc(([response, confidence]) => {
          if (confidence < 0.55) return
          newUserChat(capitalize(response))
          if (categories.includes(response)) {
            navigateToPage('main-menu-page')
            $(`.food-categories-card[data-category="${response}"]`).trigger('click')
            robotTalk(session, 'Okay')
          } else if (response === 'cancel') {
            robotTalk(session, 'Okay')
          } else {
            robotTalk(session, 'Something when wrong')
          }
          cancelVoiceAssistant()
        })
        break
      case 'cancel':
        robotTalk(session, 'Okay')
        cancelVoiceAssistant()
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
    whatCanIHelpYouWith(session)
    // phrases to listen for
    const voiceAssistantValues = [
      'add item to order',
      'view cart',
      'start my order',
      'remove item from cart',
      'show me a category',
      'clear cart',
      'cancel my order',
      'how many calories are in ',
      'place order',
      'cancel',
    ]
    // set phrases to listen for and the length of time in seconds to listen for
    session.listenForPhrases(voiceAssistantValues, false)
    newUserOptions(voiceAssistantValues)
    $('#voice-assistant-container').attr('data-active', 'true') // set btn active
  })

  // Voice assistant btn after it was set to active
  $('.voice-assistant-cancel-btn').on('click', function () {
    session.stopListening() // Stop listening early
    resetVoiceAssistantTextBubbles()
    $('#voice-assistant-container').attr('data-active', 'false') // set btn inactive
  })
}

/**
 * @param {'delayed'|'instant'} when default delayed
 * @param {number} secondsWait default 1 second delay */
export function cancelVoiceAssistant(when = 'delayed', secondsWait = 3) {
  $('#user-options-container').empty()
  if (when === 'delayed') {
    setTimeout(() => {
      $('.voice-assistant-cancel-btn.x-button').trigger('click')
    }, secs(secondsWait))
  } else {
    $('.voice-assistant-cancel-btn.x-button').trigger('click')
  }
}

export function resetVoiceAssistantTextBubbles() {
  $('#voice-assistant-text-bubbles').empty()
  $('#user-options-container').empty()
}

/** @param {QiSessionConnection} session */
export function whatCanIHelpYouWith(session) {
  const howCanIHelp = getRandomPepperHowCanIHelp()
  robotTalk(session, howCanIHelp)
}

/**
 * @param {QiSessionConnection} session
 * @param {string} speech  */
export function robotTalk(session, speech) {
  newRobotChat(speech)
  session.performSpeech(speech, true)
}

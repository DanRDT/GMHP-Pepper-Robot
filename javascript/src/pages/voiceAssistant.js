import { Cart } from '../cart'
import { QiSessionConnection } from '../qiClass'

/**
 *
 * @param {Cart} cart
 * @param {QiSessionConnection} session
 */
export function setupVoiceAssistant(cart, session) {
  function voiceAssistant(data) {
    let [value, confidence] = data
    if (confidence < 0.45) return
    value = value.toLowerCase()
    switch (value) {
      case 'view cart':
        goToCartPage(cart)
        break
      case 'start my order':
        navigateToPage('main-menu-page')
        break
      case 'cancel my order':
        // TODO
        break
      case 'clear cart':
        goToCartPage(cart)
        $('#cart-page .clear-cart-btn').trigger('click')
        break
      case 'place order':
        goToCartPage(cart)
        setTimeout(() => $('#cart-page .clear-cart-btn').trigger('click'), secs(0.5))
        break
      case 'remove item from cart':
        // TODO
        break
      case 'add item to order':
        // TODO
        break
      case 'update quantity':
        // TODO
        break
      case 'show me a category':
        // TODO
        break
    }
  }
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

  $('#voice-assistant-btn[data-active="false"]').on('click', function () {
    session.setSpeechRecognitionFunc(voiceAssistant)
    session.listenForPhrases(voiceAssistantValues, false, 25)
  })
  $('#voice-assistant-btn[data-active="true"]').on('click', function () {
    session.stopListening()
  })
}

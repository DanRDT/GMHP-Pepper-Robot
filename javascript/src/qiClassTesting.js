import { secs } from './utils/global.js'
import { getRandomPepperDialog } from './utils/pepper.js'

export class QiSessionConnection {
  // variables
  // `#` means private
  #session
  #connected = false

  // initialize class
  constructor() {
    $('#connection-status').text('Connecting...')
    setTimeout(() => {
      $('#connection-status').text('Connected')
      this.#connected = true
    }, secs(2))
  }

  // methods
  performSpeech(speech) {
    alert(speech)
  }

  randomEyes(duration) {
    alert(`Change eyes ~ ${duration} seconds`)
  }

  saySomethingRandom() {
    const dialog = getRandomPepperDialog()

    // show on screen
    $('#pepper-dialog-box').text(dialog)

    alert(dialog)
  }

  resetConnection() {
    this.#connected = false
    $('#connection-status').text('Connecting...')
    setTimeout(() => {
      $('#connection-status').text('Connected')
      this.#connected = true
    }, secs(2))
  }
}

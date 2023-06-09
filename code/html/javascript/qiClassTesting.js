import { listOfRandomPepperDialogs } from './data.js'

export class QiSessionConnection {
  // variables
  // `#` means private
  #session

  // initialize class
  constructor() {
    $('#connection-status').text('Connecting...')
    setTimeout(() => {
      $('#connection-status').text('Connected')
    }, 2000)
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
    $('#connection-status').text('Connecting...')
    setTimeout(() => {
      $('#connection-status').text('Connected')
    }, 2000)
  }
}

function getRandomPepperDialog() {
  const randomIndex = Math.floor(Math.random() * listOfRandomPepperDialogs.length)
  return listOfRandomPepperDialogs[randomIndex]
}
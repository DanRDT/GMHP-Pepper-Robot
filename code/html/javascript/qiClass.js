export class QiSessionConnection {
  // variables
  // `#` means private
  #session

  // initialize class
  constructor() {
    this.#session = new QiSession(
      function (session) {
        $('#connection').text('Connected')
      },
      function () {
        $('#connection').text(`Couldn't connect to the robot`)
      }
    )
  }

  // methods
  performSpeech(speech) {
    this.#session.service('ALAnimatedSpeech').then(function (tts) {
      // tts is the ALTextToSpeech service
      tts.say(speech)
    })
  }

  randomEyes(duration) {
    this.#session.service('ALLeds').then(function (leds) {
      // leds is the ALLeds service
      leds.rasta(duration)
    })
  }

  saySomethingRandom() {
    const dialog = getRandomPepperDialog()

    // show on screen
    $('#pepper-dialog-box').text(dialog)

    //talk
    this.performSpeech(dialog)
  }

  resetConnection() {
    this.#session = new QiSession(
      function (session) {
        $('#connection').text('Connected')
      },
      function () {
        $('#connection').text(`Couldn't connect to the robot`)
      }
    )
  }
}

function getRandomPepperDialog() {
  const randomIndex = Math.floor(Math.random() * listOfRandomPepperDialogs.length)
  return listOfRandomPepperDialogs[randomIndex]
}

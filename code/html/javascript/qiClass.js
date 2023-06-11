import { getRandomPepperDialog } from './utils/pepper.js'

export class QiSessionConnection {
  // variables
  // `#` means private
  #session
  #connected = false
  #speechListener

  // initialize class
  constructor() {
    this.#session = new QiSession(
      function (session) {
        this.#connected = true
        $('#connection').text('Connected')
      },
      function () {
        this.#connected = false
        $('#connection').text(`Couldn't connect to the robot`)
      }
    )
  }

  // core methods
  resetConnection() {
    this.#connected = false
    this.#session = new QiSession(
      function (session) {
        this.#connected = true
        $('#connection').text('Connected')
      },
      function () {
        this.#connected = false
        $('#connection').text(`Couldn't connect to the robot`)
      }
    )
  }

  /**
   * @param {string} speech
   */
  performSpeech(speech) {
    // this.#session.service('ALAnimatedSpeech').then(function (tts) {
    this.#session.service('ALTextToSpeech').then(function (tts) {
      // tts is the ALTextToSpeech service
      tts.say(speech)
    })
  }

  /**
   * @param {Array<string>} phrases
   * @param {boolean} wordSpotting
   */
  speechRecognition(phrases, wordSpotting) {
    this.#session.service('ALSpeechRecognition').then(function (asr) {
      this.#speechListener = asr
      this.#speechListener.setVocabulary(phrases, wordSpotting)
    })
  }

  /**
   * @param {number} duration
   */
  randomEyes(duration) {
    this.#session.service('ALLeds').then(function (leds) {
      // leds is the ALLeds service
      leds.rasta(duration)
    })
  }

  // other methods
  saySomethingRandom() {
    const dialog = getRandomPepperDialog()
    this.performSpeech(dialog)
  }
}

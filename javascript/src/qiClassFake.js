// @ts-check
import { secs } from './utils/global.js'
import { getRandomPepperDialog } from './utils/pepper.js'

export class QiSessionConnectionFake {
  /** Initializes class and connects to robot */
  constructor() {
    setTimeout(() => {
      $('#connection-status').text('Connected (Fake)')
    }, secs(2))
  }
  /** Resets connection with robot */
  resetConnection() {
    $('#connection-status').text(`Trying to Connect...`)
    setTimeout(() => {
      $('#connection-status').text('Connected (Fake)')
    }, secs(2))
  }

  /**
   * @param {string} speech - What it will say
   * @param {boolean} animated - if true it will use `ALAnimatedSpeech` instead of `ALTextToSpeech` - Default: false */
  performSpeech(speech, animated = false) {
    alert(speech)
  }

  /** @param {number} duration - Duration of random eyes */
  randomEyes(duration) {}

  /** Says something random from list of dialogs */
  saySomethingRandom() {
    const dialog = getRandomPepperDialog()
    this.performSpeech(dialog)
  }

  /**
   * Function to run went speech recognized.
   * @callback SpeechRecFunction
   * @param {[string, number]} value Index 0 is the string heard. Index 1 is the confidence level.
   */
  /**
   * Sets the function that will be run when speech is recognized
   *  @param {SpeechRecFunction} speechRecFunction */
  setSpeechRecognitionFunc(speechRecFunction = defaultSpeechRecFunction) {
    const boundSpeechRecFunction = speechRecFunction.bind(this)
    setTimeout(() => {
      boundSpeechRecFunction(['You are using the fake robot connection.', 1])
    }, secs(3))
  }

  /**
   * Run this after running `setSpeechRecognitionFunc()`
   * @param {Array<string>} phrases - An array of phrases or words to listen for
   * @param {boolean} wordSpotting - If word spotting is disabled (default), the engine expects to hear one of the specified words, nothing more, nothing less. If enabled, the specified words can be pronounced in the middle of a whole speech stream, the engine will try to spot them. */
  listenForPhrases(phrases, wordSpotting) {}
  /** Unsubscribes from listener */
  stopListening() {}
  /**
   * Stops and restarts the speech recognition engine according to the input parameter.
   * @param {boolean} isPaused True (stops ASR) or False (restarts ASR) */
  restartSpeechListener(isPaused) {}
}

/** @param {[string, number]} value */
function defaultSpeechRecFunction(value) {
  alert(`String heard: ${value[0]}, Confidence: ${value[1]}`)
}

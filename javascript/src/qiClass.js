import { getRandomPepperDialog } from './utils/pepper.js'

export class QiSessionConnection {
  // variables
  // `#` means private
  #session
  #connected = false
  #speechListener
  #wordRecognizedSubscriber
  #wordRecognizedSubscriberSignalLink

  /** Initializes class and connects to robot */
  constructor() {
    function connectionSuccessful(session) {
      // alert('connect success')
      this.#connected = true
      $('#connection-status').text('Connected')
    }
    function connectionFailed() {
      // alert('Disconnected')
      this.#connected = false
      $('#connection-status').text(`Disconnected`)
    }
    this.#session = new QiSession(connectionSuccessful.bind(this), connectionFailed.bind(this))
  }

  /** Resets connection with robot */
  resetConnection() {
    this.#connected = false
    function connectionSuccessful(session) {
      // alert('connect success')
      this.#connected = true
      $('#connection-status').text('Connected')
    }
    function connectionFailed() {
      // alert('Disconnected')
      this.#connected = false
      $('#connection-status').text(`Disconnected`)
    }
    this.#session = new QiSession(connectionSuccessful.bind(this), connectionFailed.bind(this))
  }

  /** @param {string} speech - What it will say */
  performSpeech(speech) {
    this.#session.service('ALAnimatedSpeech').then(function (tts) {
      // this.#session.service('ALTextToSpeech').then(function (tts) {
      // tts is the ALTextToSpeech service
      tts.say(speech)
    })
  }

  /** @param {number} duration - Duration of random eyes */
  randomEyes(duration) {
    this.#session.service('ALLeds').then(function (leds) {
      // leds is the ALLeds service
      leds.rasta(duration)
    })
  }

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
   *  @param {SpeechRecFunction} SpeechRecFunction */
  setSpeechRecognitionFunc(SpeechRecFunction = defaultSpeechRecFunction) {
    // more specific?
    if (this.#wordRecognizedSubscriberSignalLink && this.#wordRecognizedSubscriber)
      this.#wordRecognizedSubscriber.signal.disconnect(this.#wordRecognizedSubscriberSignalLink)

    const boundSpeechRecFunction = SpeechRecFunction.bind(this)

    function setSignalLink(link) {
      this.#wordRecognizedSubscriberSignalLink = link
      alert(link)
    }
    const boundSetSignalLink = setSignalLink.bind(this)

    function subscriberFunc(subscriber) {
      this.#wordRecognizedSubscriber = subscriber
      // connect to subscriber
      this.#wordRecognizedSubscriber.signal.connect(boundSpeechRecFunction).then(boundSetSignalLink, function (error) {
        alert('An error occurred: ' + error)
      })
    }
    const boundSubscriberFunc = subscriberFunc.bind(this)

    // connect to ALMemory
    this.#session.service('ALMemory').then(function (ALMemory) {
      // subscribe to event listener
      ALMemory.subscriber('WordRecognized').then(boundSubscriberFunc)
    })
  }

  /**
   * Run this after running `setSpeechRecognitionFunc()`
   * @param {Array<string>} phrases - An array of phrases or words to listen for
   * @param {boolean} wordSpotting - If word spotting is disabled (default), the engine expects to hear one of the specified words, nothing more, nothing less. If enabled, the specified words can be pronounced in the middle of a whole speech stream, the engine will try to spot them. */
  listenForPhrases(phrases, wordSpotting) {
    // more specific?
    if (this.#speechListener) this.stopListening
    // this.restartSpeechListener()

    function subscribeToSpeech(asr) {
      this.#speechListener = asr
      this.#speechListener.setVocabulary(phrases, wordSpotting)
      // start listening
      this.#speechListener.subscribe('ListenerID')
      // this.restartSpeechListener()
    }
    const subscribeToSpeechBound = subscribeToSpeech.bind(this)

    this.#session.service('ALSpeechRecognition').then(subscribeToSpeechBound)
  }
  /** Unsubscribes from listener */
  stopListening() {
    this.#speechListener.unsubscribe('ListenerID')
  }
  /**
   * Stops and restarts the speech recognition engine according to the input parameter.
   * @param {boolean} isPaused True (stops ASR) or False (restarts ASR) */
  restartSpeechListener(isPaused) {
    this.#speechListener.pause(isPaused)
  }
}

/** @param {[string, number]} value */
function defaultSpeechRecFunction(value) {
  alert(`String heard: ${value[0]}, Confidence: ${value[1]}`)
}

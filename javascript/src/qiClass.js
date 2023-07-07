import { newPopup, secs } from './utils/global.js'
import { getRandomPepperDialog } from './utils/pepper.js'

export class QiSessionConnection {
  // variables
  // `#` means private
  #session
  #connected = false
  #speechListener
  #wordRecognizedSubscriber
  #wordRecognizedSubscriberSignalLink
  #currentlyListening = false

  /** Initializes class and connects to robot */
  constructor() {
    function connectionSuccessful(session) {
      this.#connected = true
      $('#connection-status').text('Connected')
    }
    function connectionFailed() {
      this.#connected = false
      $('#connection-status').text(`Disconnected`)
    }
    this.#session = new QiSession(connectionSuccessful.bind(this), connectionFailed.bind(this))
  }

  /** Resets connection with robot */
  resetConnection() {
    this.#connected = false
    function connectionSuccessful(session) {
      this.#connected = true
      $('#connection-status').text('Connected')
    }
    function connectionFailed() {
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
   *  @param {SpeechRecFunction} speechRecFunction */
  setSpeechRecognitionFunc(speechRecFunction = defaultSpeechRecFunction) {
    // more specific?
    if (this.#wordRecognizedSubscriberSignalLink && this.#wordRecognizedSubscriber)
      this.#wordRecognizedSubscriber.signal.disconnect(this.#wordRecognizedSubscriberSignalLink)

    const boundSpeechRecFunction = speechRecFunction.bind(this)

    function setSignalLink(link) {
      this.#wordRecognizedSubscriberSignalLink = link
      // newPopup(`Link: ${link}`)
    }
    const boundSetSignalLink = setSignalLink.bind(this)

    function subscriberFunc(subscriber) {
      this.#wordRecognizedSubscriber = subscriber
      // connect to subscriber
      this.#wordRecognizedSubscriber.signal.connect(boundSpeechRecFunction).then(boundSetSignalLink, function (error) {
        newPopup('An error occurred: ' + error)
      })
    }
    const boundSubscriberFunc = subscriberFunc.bind(this)

    function waitForSession() {
      if (this.#session) {
        // connect to ALMemory
        this.#session.service('ALMemory').then(function (ALMemory) {
          // subscribe to event listener
          ALMemory.subscriber('WordRecognized').then(boundSubscriberFunc)
        })
        clearInterval(interval)
      }
    }
    const waitForSessionBound = waitForSession.bind(this)
    const interval = setInterval(waitForSessionBound, secs(0.3))
  }

  /**
   * Run this after running `setSpeechRecognitionFunc()`
   * @param {Array<string>} phrases - An array of phrases or words to listen for
   * @param {boolean} wordSpotting - If word spotting is disabled (default), the engine expects to hear one of the specified words, nothing more, nothing less. If enabled, the specified words can be pronounced in the middle of a whole speech stream, the engine will try to spot them. */
  listenForPhrases(phrases, wordSpotting) {
    // more specific?
    // if (this.#speechListener) this.stopListening
    // this.restartSpeechListener()

    function subscribeToSpeech(asr) {
      this.#speechListener = asr
      this.#speechListener.setVocabulary(phrases, wordSpotting)

      //
      function setActive() {
        this.#currentlyListening = false
        newPopup('started')
      }
      const boundSetActive = setActive.bind(this)
      // start listening

      // if (this.#currentlyListening) {
      //   function waitForNotListening() {
      //     if (!this.#currentlyListening) {
      this.#speechListener.subscribe('ListenerID')
      //       clearInterval(interval)
      //     }
      //   }
      //   const waitForNotListeningBound = waitForNotListening.bind(this)
      //   const interval = setInterval(waitForNotListeningBound, secs(0.3))
      // } else this.#speechListener.subscribe('ListenerID').then(boundSetActive)
    }
    const subscribeToSpeechBound = subscribeToSpeech.bind(this)

    // if (this.#currentlyListening) {
    // function waitForNotListening() {
    // if (!this.#currentlyListening) {
    this.#session.service('ALSpeechRecognition').then(subscribeToSpeechBound)
    // clearInterval(interval)
    //     }
    //   }
    //   const waitForNotListeningBound = waitForNotListening.bind(this)
    //   const interval = setInterval(waitForNotListeningBound, secs(0.3))
    // } else this.#session.service('ALSpeechRecognition').then(subscribeToSpeechBound)
  }

  changePhrases(phrases, wordSpotting) {
    this.#speechListener.setVocabulary(phrases, wordSpotting)
  }
  /** Unsubscribes from listener */
  stopListening() {
    if (!this.#speechListener) return
    function setInactive() {
      newPopup('stopped.')
      this.#currentlyListening = false
    }
    const boundSetInactive = setInactive.bind(this)
    this.#speechListener.unsubscribe('ListenerID').then(boundSetInactive)
  }
  /**
   * Stops and restarts the speech recognition engine according to the input parameter.
   * @param {boolean} isPaused True (stops ASR) or False (restarts ASR) */
  restartSpeechListener(isPaused = false) {
    this.#speechListener.pause(isPaused)
  }
}

/** @param {[string, number]} value */
function defaultSpeechRecFunction(value) {
  newPopup(`String heard: ${value[0]}, Confidence: ${value[1]}`)
}

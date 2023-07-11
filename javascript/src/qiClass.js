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

  /** returns whether or not the speechListener is currently active */
  currentlyListening() {
    return this.#currentlyListening
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

    const speechRecFunctionBound = speechRecFunction.bind(this)

    function setSignalLink(link) {
      this.#wordRecognizedSubscriberSignalLink = link
      // newPopup(`Link: ${link}`)
    }
    const setSignalLinkBound = setSignalLink.bind(this)

    function subscriberFunc(subscriber) {
      this.#wordRecognizedSubscriber = subscriber
      // connect to subscriber
      this.#wordRecognizedSubscriber.signal.connect(speechRecFunctionBound).then(setSignalLinkBound, function (error) {
        newPopup('An error occurred: ' + error)
      })
    }
    const subscriberFuncBound = subscriberFunc.bind(this)

    function waitForSession() {
      if (this.#session) {
        // connect to ALMemory
        this.#session.service('ALMemory').then(function (ALMemory) {
          // subscribe to event listener
          ALMemory.subscriber('WordRecognized').then(subscriberFuncBound)
        })
        clearInterval(interval)
      }
    }
    const waitForSessionBound = waitForSession.bind(this)
    const interval = setInterval(waitForSessionBound, secs(0.3))
  }

  /**
   * Run this after running `setSpeechRecognitionFunc()` to set the phrases to listen for
   * @param {Array<string>} phrases - An array of phrases or words to listen for
   * @param {boolean} wordSpotting - If word spotting is disabled (default), the engine expects to hear one of the specified words, nothing more, nothing less. If enabled, the specified words can be pronounced in the middle of a whole speech stream, the engine will try to spot them.
   * @param {number} duration - Duration in seconds to listen for
   * @returns {boolean} If already listening it returns false, Else it returns true.  */
  listenForPhrases(phrases, wordSpotting, duration) {
    if (this.#currentlyListening) return false

    function subscribeToSpeech(asr) {
      this.#speechListener = asr
      this.#speechListener.setVocabulary(phrases, wordSpotting)

      function setActive() {
        this.#currentlyListening = true
        newPopup('Listening...')
      }
      const setActiveBound = setActive.bind(this)

      // // start listening
      this.#speechListener.subscribe('ListenerID').then(setActiveBound)
    }
    const subscribeToSpeechBound = subscribeToSpeech.bind(this)

    this.#session.service('ALSpeechRecognition').then(subscribeToSpeechBound)

    function stopAfterDuration() {
      if (this.#currentlyListening) this.stopListening()
    }
    const stopAfterDurationBound = stopAfterDuration.bind(this)
    let checkedDuration = duration < 0 ? 0 : duration // prevent negatives
    setTimeout(stopAfterDurationBound, secs(checkedDuration))
    return true
  }

  /** Unsubscribes from listener */
  stopListening() {
    if (!this.#speechListener || !this.#currentlyListening) return

    function stopListener() {
      this.restartSpeechListener(true)
    }
    const stopListenerBound = stopListener.bind(this)
    this.#speechListener.unsubscribe('ListenerID').then(stopListenerBound)
  }
  /**
   * Stops and restarts the speech recognition engine according to the input parameter.
   * @param {boolean} isPaused True (stops ASR) or False (restarts ASR) */
  restartSpeechListener(isPaused = false) {
    function removeContext() {
      function setInactive() {
        this.#currentlyListening = false
      }
      const setInactiveBound = setInactive.bind(this)

      this.#speechListener.removeAllContext().then(setInactiveBound)
    }
    const removeContextBound = removeContext.bind(this)

    this.#speechListener.pause(isPaused).then(removeContextBound)
  }

  /** @param {string} moduleName  */
  removeModule(moduleName) {
    function unregister(memory) {
      memory.unregisterModuleReference(moduleName)
    }
    this.#session.service('ALMemory').then(unregister)
  }
}

/** @param {[string, number]} value */
function defaultSpeechRecFunction(value) {
  if (value[1] <= 0) newPopup('Stopped Listening')
  else newPopup(`String heard: ${value[0]}, Confidence: ${value[1]}`)
}

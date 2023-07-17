import { newPopup, secs } from './utils/global.js'
import { getRandomPepperDialog } from './utils/pepper.js'

export class QiSessionConnection {
  // variables
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
    try {
      this.#session = new QiSession(connectionSuccessful.bind(this), connectionFailed.bind(this))
    } catch (error) {
      newPopup(`Can't connect to robot`, 5)
      $('#connection-status').text(`Failed to connect`)
      this.#session = null
    }
  }

  /** Resets connection with robot */
  resetConnection() {
    if (!this.#session) return
    this.#connected = false
    function connectionSuccessful(session) {
      this.#connected = true
      $('#connection-status').text('Connected')
    }
    function connectionFailed() {
      this.#connected = false
      $('#connection-status').text(`Disconnected`)
    }
    try {
      this.#session = new QiSession(connectionSuccessful.bind(this), connectionFailed.bind(this))
    } catch (error) {
      newPopup(`Can't connect to robot`, 5)
      $('#connection-status').text(`Failed to connect`)
      this.#session = {}
    }
  }

  /**
   * @param {string} speech - What it will say
   * @param {boolean} animated - if true it will use `ALAnimatedSpeech` instead of `ALTextToSpeech` - Default: false */
  performSpeech(speech, animated = false) {
    if (!this.#session) return
    if (animated) {
      this.#session.service('ALAnimatedSpeech').then(function (tts) {
        tts.say(speech)
      })
    } else {
      this.#session.service('ALTextToSpeech').then(function (tts) {
        tts.say(speech)
      })
    }
  }

  /** @param {number} duration - Duration of random eyes */
  randomEyes(duration) {
    if (!this.#session) return
    this.#session.service('ALLeds').then(function (leds) {
      // leds is the ALLeds service
      leds.rasta(duration)
    })
  }

  /** Says something random from list of dialogs */
  saySomethingRandom() {
    const dialog = getRandomPepperDialog()
    this.performSpeech(dialog, true)
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
    if (!this.#session) return
    if (this.#wordRecognizedSubscriberSignalLink && this.#wordRecognizedSubscriber)
      this.#wordRecognizedSubscriber.signal.disconnect(this.#wordRecognizedSubscriberSignalLink)

    /** @param {[string, number]} data */
    function speechRecFunctionWrapper(data) {
      const speechRecFunctionBound = speechRecFunction.bind(this)
      speechRecFunctionBound([data[0].replace(/<...>/g, ''), data[1]])
    }
    const speechRecFunctionWrapperBound = speechRecFunctionWrapper.bind(this)

    function setSignalLink(link) {
      this.#wordRecognizedSubscriberSignalLink = link
      // newPopup(`Link: ${link}`)
    }
    const setSignalLinkBound = setSignalLink.bind(this)

    function subscriberFunc(subscriber) {
      this.#wordRecognizedSubscriber = subscriber
      // connect to subscriber
      this.#wordRecognizedSubscriber.signal
        .connect(speechRecFunctionWrapperBound)
        .then(setSignalLinkBound, function (error) {
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
   * @param {number} duration - Duration in seconds to listen for. If zero it will listen until canceled. Default: 0
   * @returns {boolean} If already listening it returns false, Else it returns true.  */
  startListening(phrases, wordSpotting, duration = 0) {
    if (!this.#session) return
    if (this.#currentlyListening) return false

    function subscribeToSpeech(asr) {
      this.#speechListener = asr
      this.#speechListener.setVocabulary(phrases, wordSpotting)

      function setActive() {
        this.#currentlyListening = true
        newPopup('Listening...') // TODO change
      }
      const setActiveBound = setActive.bind(this)

      // // start listening
      this.#speechListener.subscribe('ListenerID').then(setActiveBound)
    }
    const subscribeToSpeechBound = subscribeToSpeech.bind(this)

    this.#session.service('ALSpeechRecognition').then(subscribeToSpeechBound)

    if (duration > 0) {
      function stopAfterDuration() {
        if (this.#currentlyListening) this.stopListening()
      }
      const stopAfterDurationBound = stopAfterDuration.bind(this)
      let checkedDuration = duration < 0 ? 0 : duration // prevent negatives
      setTimeout(stopAfterDurationBound, secs(checkedDuration))
    }
    return true
  }

  /** Unsubscribes from listener */
  stopListening() {
    cancelVoiceAssistant()
    if (!this.#session) return
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
    if (!this.#session) return
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

  /**
   * Run this after running `setSpeechRecognitionFunc()` to set the phrases to listen for
   * @param {Array<string>} phrases - An array of phrases or words to listen for
   * @param {boolean} wordSpotting - If word spotting is disabled (default), the engine expects to hear one of the specified words, nothing more, nothing less. If enabled, the specified words can be pronounced in the middle of a whole speech stream, the engine will try to spot them.
   * @param {number} duration - Duration in seconds to listen for. If zero it will listen until canceled. Default: 0 */
  listenForPhrases(phrases, wordSpotting, duration = 0) {
    if (!this.#session) return
    this.stopListening()

    function checkIfStillListening() {
      if (!this.#currentlyListening) {
        clearInterval(interval)
        this.startListening(phrases, wordSpotting, duration)
      }
    }
    const interval = setInterval(checkIfStillListening.bind(this), secs(0.1))
  }

  // /** @param {string} moduleName  */
  // removeModule(moduleName) {
  //   function unregister(memory) {
  //     memory.unregisterModuleReference(moduleName)
  //   }
  //   this.#session.service('ALMemory').then(unregister)
  // }
}

/** @param {[string, number]} data */
function defaultSpeechRecFunction(data) {
  const [value, confidence] = data
  if (confidence <= 0) newPopup('Stopped Listening')
  else newPopup(`String heard: ${value}, Confidence: ${confidence}`)
}

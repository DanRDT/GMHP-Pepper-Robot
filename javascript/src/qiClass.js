import { getRandomPepperDialog } from './utils/pepper.js'

export class QiSessionConnection {
  // variables
  // `#` means private
  #session
  #connected = false
  #speechListener
  #wordRecognizedSubscriber
  #wordRecognizedSubscriberSignalLink

  // initialize class
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

  // core methods
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

  /**
   * @param {string} speech - What it will say
   */
  performSpeech(speech) {
    this.#session.service('ALAnimatedSpeech').then(function (tts) {
      // this.#session.service('ALTextToSpeech').then(function (tts) {
      // tts is the ALTextToSpeech service
      tts.say(speech)
    })
  }

  /**
   * @param {Array<string>} phrases - An array of phrases or words to listen for
   * @param {boolean} wordSpotting - If word spotting is disabled (default), the engine expects to hear one of the specified words, nothing more, nothing less. If enabled, the specified words can be pronounced in the middle of a whole speech stream, the engine will try to spot them.
   */
  listenForPhrases(phrases, wordSpotting) {
    if (this.#speechListener !== undefined) this.stopListening

    function subscribeToSpeech(asr) {
      this.#speechListener = asr
      this.#speechListener.setVocabulary(phrases, wordSpotting)
      this.#speechListener.subscribe('ListenerID')
    }
    const subscribeToSpeechBound = subscribeToSpeech.bind(this)

    this.#session.service('ALSpeechRecognition').then(subscribeToSpeechBound)
  }

  setupSpeechRecognition() {
    /**
     * @param {[string, number]} value Index 0 is the string heard. Index 1 is the confidence level.
     */
    function getSpokenText(value) {
      alert(`String heard: ${value[0]}, Confidence: ${value[1]}`)
    }
    const getSpokenTextBound = getSpokenText.bind(this)

    function subscriberFunc(subscriber) {
      this.#wordRecognizedSubscriber = subscriber
      this.#wordRecognizedSubscriber.signal.connect(getSpokenTextBound)
    }
    const boundSubscriberFunc = subscriberFunc.bind(this)

    // connect to ALMemory
    this.#session.service('ALMemory').then(function (ALMemory) {
      // connect to event listener
      ALMemory.subscriber('WordRecognized').then(
        //   function (subscriber) {
        //   // subscribe to event
        //   subscriber.signal.connect(getSpokenTextBound)
        // }
        boundSubscriberFunc
      )
    })
  }

  // faceDetection(phrases, wordSpotting) {
  //   const ALMemory = this.#session.service('ALMemory')
  //   const subscriber = ALMemory.subscriber('FaceDetected')
  //   subscriber.signal.connect(callbackFunc)

  //   this.#session.service('ALFaceDetection').subscribe('HumanGreeter')
  //   // this.got_face = false

  //   // setInterval(() => {
  //   //   // only detect a face every n seconds
  //   //   this.got_face = false
  //   // }, secs(5))

  //   this.#session.service('ALFaceDetection').unsubscribe('HumanGreeter')
  // }

  /**
   * @param {number} duration - Duration of random eyes
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

  /**
   * Function to run went speech recognized.
   * @callback SpeechRecFunction
   * @param {[string, number]} value Index 0 is the string heard. Index 1 is the confidence level.
   */
  /** @param {SpeechRecFunction} SpeechRecFunction */
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
   * @param {Array<string>} phrases - An array of phrases or words to listen for
   * @param {boolean} wordSpotting - If word spotting is disabled (default), the engine expects to hear one of the specified words, nothing more, nothing less. If enabled, the specified words can be pronounced in the middle of a whole speech stream, the engine will try to spot them.
   */
  listenForPhrases(phrases, wordSpotting) {
    // more specific?
    if (this.#speechListener) this.stopListening
    // this.restartSpeechListener()

    function subscribeToSpeech(asr) {
      this.#speechListener = asr
      this.#speechListener.setVocabulary(phrases, wordSpotting)
      this.#speechListener.subscribe('ListenerID')
      // this.restartSpeechListener()
    }
    const subscribeToSpeechBound = subscribeToSpeech.bind(this)

    this.#session.service('ALSpeechRecognition').then(subscribeToSpeechBound)
  }
  stopListening() {
    this.#speechListener.unsubscribe('ListenerID')
  }
  restartSpeechListener() {
    this.#speechListener.pause(false)
  }
}

// var signalLink

// function onServiceAdded(serviceId, serviceName) {
//   console.log('New service', serviceId, serviceName)
//   ALM.serviceAdded.disconnect(signalLink)
// }

// session.service('ServiceDirectory').then(function (ALM) {
//   ALM = sd
//   ALM.serviceAdded.connect(onServiceAdded).then(
//     function (link) {
//       signalLink = link
//     },
//     function (error) {
//       console.log('An error occurred: ' + error)
//     }
//   )
// })

// session.service('ALMemory').then(function (ALMemory) {
//   // connect to event listener
//   ALMemory.subscriber('WordRecognized').then(function (subscriber) {
//     // subscribe to event
//     // `.signal` required?
//     subscriber.signal
//       .connect(function (value, subscriberIdentifier) {
//         setTimeout(() => {
//           subscriber.signal.disconnect(signalLink)
//         }, secs(15))
//       })
//       .then(
//         function (link) {
//           signalLink = link
//         },
//         function (error) {
//           alert('An error occurred: ' + error)
//         }
//       )
//   })
// })

/** @param {[string, number]} value */
function defaultSpeechRecFunction(value) {
  alert(`String heard: ${value[0]}, Confidence: ${value[1]}`)
}

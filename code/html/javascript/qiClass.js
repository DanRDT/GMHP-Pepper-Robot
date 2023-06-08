export class QiSessionConnection {
  session

  constructor() {
    this.session = new QiSession(
      function (session) {
        $('#connection').text('Connection established!')
      },
      function () {
        $('#connection').text('Could not connect to the robot')
      }
    )
  }

  performSpeech(speech) {
    this.session.service('ALAnimatedSpeech').then(function (tts) {
      // tts is the ALTextToSpeech service
      tts.say(speech)
    })
  }

  randomEyes(duration) {
    this.session.service('ALLeds').then(function (leds) {
      // leds is the ALLeds service
      leds.rasta(duration)
    })
  }

  changePepperDialog() {
    const dialog = getRandomPepperDialog()

    // show on screen
    $('.box').text(dialog)

    //talk
    this.performSpeech(dialog)
  }

  resetConnection() {
    this.session = new QiSession(
      function (session) {
        $('#connection').text('Connection established!')
      },
      function () {
        $('#connection').text('Could not connect to the robot')
      }
    )
  }
}

function getRandomPepperDialog() {
  const randomIndex = Math.floor(Math.random() * listOfRandomPepperDialogs.length)
  return listOfRandomPepperDialogs[randomIndex]
}

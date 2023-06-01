// import { QiSession } from 'qi-js-sdk'
import { getRandomPepperDialog } from './javascript/utils.js'
import { menuItems } from './javascript/data.js'

// connect to robot
// const session = new QiSession(
//   function (session) {
//     $('#connection').text('Connection established!')
//   },
//   function () {
//     $('#connection').text('Could not connect to the robot')
//   }
// )

// modify the DOM (Website)
$(document).ready(function () {
  // randomEyes(2.0)
  // performSpeech('What would you like to order?')

  console.log(menuItems)

  $('#submitBtn').click(function () {
    console.log('clicked')
  })
})

function resetConnection() {
  session = new QiSession(
    function (session) {
      $('#connection').text('Connection established!')
    },
    function () {
      $('#connection').text('Could not connect to the robot')
    }
  )
}

function performSpeech(speech) {
  session.service('ALAnimatedSpeech').then(function (tts) {
    // tts is the ALTextToSpeech service
    tts.say(speech)
  })
}

function randomEyes(duration) {
  session.service('ALLeds').then(function (leds) {
    // leds is the ALLeds service
    leds.rasta(duration)
  })
}

function changePepperDialog() {
  const dialog = getRandomPepperDialog()

  // show on screen
  $('.box').text(dialog)

  //talk
  performSpeech(dialog)
}

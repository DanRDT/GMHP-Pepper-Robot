// @ts-check

import { speechComponent, userOptionComponent } from '../jquery-components/voice-assistant'
import { capitalize } from '../utils/global'

/** @param {string} text  */
export function newRobotChat(text) {
  $('#voice-assistant-text-bubbles').append(speechComponent(text, 'robot'))
  $('#voice-assistant-text-bubbles').animate({ scrollTop: $('#voice-assistant-text-bubbles').height() }, 500)
}
/** @param {string} text  */
export function newUserChat(text) {
  $('#voice-assistant-text-bubbles').append(speechComponent(text, 'user'))
  $('#voice-assistant-text-bubbles').animate({ scrollTop: $('#voice-assistant-text-bubbles').height() }, 500)
}
export function clearChats() {
  $('#voice-assistant-text-bubbles').empty()
}

/** @param {Array<string>} options  */
export function newUserOptions(options) {
  $('#user-options-container').empty()
  options.forEach(option => {
    $('#user-options-container').append(userOptionComponent(capitalize(option)))
  })
}

export function clearUserOptions() {
  $('#user-options-container').empty()
}

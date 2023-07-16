// @ts-check

import { speechComponent, userOptionComponent } from '../jquery-components/voice-assistant'
import { capitalize } from '../utils/global'

/** @param {string} text  */
export function newRobotChat(text) {
  $('#voice-assistant-text-bubbles').append(speechComponent(text, 'robot'))
}
/** @param {string} text  */
export function newUserChat(text) {
  $('#voice-assistant-text-bubbles').append(speechComponent(text, 'user'))
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

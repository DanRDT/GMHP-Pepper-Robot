//@ts-check

/**
 * @param {string} text
 * @param {'user'|'robot'} type */
export function speechComponent(text, type) {
  return `
  <div class="${type}-speech"><h3>${text}</h3></div>
  `
}

/** @param {string} text */
export function userOptionComponent(text) {
  return `
  <div class="user-option text-nowrap"><h5>${text}</h5></div>
  `
}

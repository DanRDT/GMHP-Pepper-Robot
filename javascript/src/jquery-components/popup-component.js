// @ts-check

/**
 * @param {string} id
 * @param {string} text */
export function popupComponent(id, text) {
  return `
  <div class="popup" data-id="${id}">
    <h4>${text}</h4>
  </div>
  `
}

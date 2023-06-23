// @ts-check
/**
 * @type {Array<string>}
 */
const pages = ['start-page', 'main-menu-page', 'food-item-page', 'cart-page', 'order-complete-page']

/**
 * Navigates to specified page
 * @param {string} newPage
 */
function navigateToPage(newPage) {
  pages.map(page => {
    if (page === newPage) $(`#${newPage}`).css('display', 'flex')
    else $(`#${page}`).hide()
  })
}

module.exports = {
  navigateToPage,
}

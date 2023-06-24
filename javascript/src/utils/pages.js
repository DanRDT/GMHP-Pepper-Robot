// @ts-check
/**
 * @typedef {'start-page'|'main-menu-page'|'food-item-page'|'cart-page'|'order-complete-page'} pages
 * @type {Array<pages>} pages
 */
const pages = ['start-page', 'main-menu-page', 'food-item-page', 'cart-page', 'order-complete-page']

/**
 * Navigates to specified page
 * @param {pages} newPage
 */
function navigateToPage(newPage) {
  pages.map(page => {
    if (newPage === page) $(`#${newPage}`).css('display', 'flex')
    else $(`#${page}`).hide()
  })
}

module.exports = {
  navigateToPage,
}

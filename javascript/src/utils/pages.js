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
export function navigateToPage(newPage) {
  pages.forEach(page => {
    if (newPage === page) $(`#${newPage}`).css('display', 'flex')
    else $(`#${page}`).hide()
  })
}

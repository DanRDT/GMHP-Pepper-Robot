/**
 * @type {Array<string>}
 */
const pages = ['start-page', 1, 'main-menu-page', 'category-page', 'food-item-page', 'cart-page', 'order-complete-page']

/**
 * Navigates to specified page
 * @param {string} newPage
 */
export function navigateToPage(newPage) {
  pages.map(page => {
    if (page === newPage) $(`#${newPage}`).css('display', 'flex')
    else $(`#${page}`).hide()
  })
}

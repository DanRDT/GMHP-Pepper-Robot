const pages = ['start-page', 'main-menu-page', 'category-page', 'food-item-page', 'cart-page', 'order-complete-page']

export function navigateToPage(newPage) {
  pages.map(page => {
    if (page === newPage) $(`#${newPage}`).css('display', 'flex')
    else $(`#${page}`).hide()
  })
}

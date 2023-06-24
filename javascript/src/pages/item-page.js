//@ts-check

import { twoDecimalPlaces } from '../utils/global'
import { navigateToPage } from '../utils/pages'

/**
 * @param {JQuery<any>} itemCard
 */
export function goToItemPage(itemCard) {
  const name = itemCard.attr('data-name')
  const price = Number(itemCard.attr('data-price'))
  const calories = Number(itemCard.attr('data-calories'))
  const image = itemCard.attr('data-image')

  navigateToPage('food-item-page')

  $('#food-item-page').attr('data-name', name)
  $('#food-item-page').attr('data-price', price)
  $('#food-item-page').attr('data-image', image)
  $('#food-item-page').attr('data-quantity', '1')

  $('#food-item-page #item-page-name').text(name)
  $('#food-item-page #item-page-price').text(`$${twoDecimalPlaces(price)}`)
  $('#food-item-page #item-page-calories').text(`${calories} Calories`)
  $('#food-item-page #item-page-image').attr('src', `./resources/images/${image}`)

  $('#food-item-page .count').text('1')
}

// @ts-check

import { menuItems } from '../data/menu'
import { twoDecimalPlaces } from '../utils/global'
import { navigateToPage } from '../utils/pages'

/** @param {JQuery<any>} itemCard */
export function goToItemPage(itemCard) {
  const name = itemCard.attr('data-name')
  const variant = itemCard.attr('data-variant')
  const price = Number(itemCard.attr('data-price'))
  const calories = Number(itemCard.attr('data-calories'))
  const image = itemCard.attr('data-image')

  navigateToPage('food-item-page')

  let item = {
    name: 'No Item Found',
    variants: [
      {
        name: 'Reg',
        price: 0,
        calories: 0,
        image: '',
      },
    ],
  }
  menuItems.map(menuItem => {
    if (menuItem.name === name) item = menuItem
  })

  // set attributes
  $('#food-item-page').attr('data-name', name)
  $('#food-item-page').attr('data-price', price)
  $('#food-item-page').attr('data-image', image)
  $('#food-item-page').attr('data-variant', variant)
  $('#food-item-page').attr('data-quantity', '1')

  $('.quantity').off('click')
  $('.quantity').on('click', function () {
    console.log('hey')
  })

  // set user visible text
  $('#food-item-page #item-page-name').text(name)
  $('#food-item-page #item-page-variant').text(variant)
  $('#food-item-page #item-page-price').text(`$${twoDecimalPlaces(price)}`)
  $('#food-item-page #item-page-image').attr('src', `./resources/images/${image}`)
  $('#food-item-page .count').text('1')

  // If calories are negative then hide them
  if (calories >= 0) $('#food-item-page #item-page-calories').text(`${calories} Calories`)
  else $('#food-item-page #item-page-calories').text(` `)
}

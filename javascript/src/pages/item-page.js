// @ts-check

import { menuItems } from '../data/menu'
import { variantComponent } from '../jquery-components/item-page'
import { itemCardComponent } from '../jquery-components/main-menu-page'
import { secs, twoDecimalPlaces } from '../utils/global'
import { navigateToPage } from '../utils/pages'

/** @param {JQuery<any>} itemCard */
export function goToItemPage(itemCard) {
  const name = itemCard.attr('data-name')
  const variant = itemCard.attr('data-variant')
  const price = Number(itemCard.attr('data-price'))
  const calories = Number(itemCard.attr('data-calories'))
  const image = itemCard.attr('data-image')

  navigateToPage('food-item-page')

  // set user visible data
  setUserVisibleData(name, price, image, calories)
  // set attributes (used by add to cart method)
  setPageDataAttributes(name, variant, price, image, calories)

  // Default Item
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
  // Look for item with same name
  menuItems.forEach(menuItem => {
    if (menuItem.name === name) item = menuItem
  })

  // clear previous variants and click listeners
  $('.variants-container').empty()
  $('.variants-container').off('click')

  // if more than one variant
  if (item.variants.length > 1) {
    // add variant buttons to screen
    item.variants.forEach(variant => {
      $('.variants-container').append(variantComponent(variant.name))
    })

    // click listener for variant buttons
    $('.variants-container').on('click', '.variant', function () {
      // make variant buttons grey and active button blue
      $('.variants-container').children().attr('data-active', 'false')
      $(this).attr('data-active', 'true')

      // loop thru variants and find variant with same name as the one clicked
      const clickedVariantName = $(this).attr('data-variant')
      item.variants.forEach(itemVariant => {
        if (itemVariant.name === clickedVariantName) {
          // change attributes
          setPageDataAttributes(name, itemVariant.name, itemVariant.price, itemVariant.image, itemVariant.calories)
          // change user visible data
          setUserVisibleData(name, itemVariant.price, itemVariant.image, itemVariant.calories)
        }
      })
    })

    // click on variant that was passed in itemCard
    $(`.variant[data-variant="${variant}"]`).trigger('click')
  }
}

/**
 * Set attributes
 * Used for the addToCart function
 * @param {string} name
 * @param {string} variant
 * @param {number} price
 * @param {string} image
 * @param {number} calories
 * @param {number} quantity default: 1 */
function setPageDataAttributes(name, variant, price, image, calories, quantity = 1) {
  $('#food-item-page').attr('data-name', name)
  $('#food-item-page').attr('data-price', price)
  $('#food-item-page').attr('data-image', image)
  $('#food-item-page').attr('data-variant', variant)
  $('#food-item-page').attr('data-calories', calories)
  $('#food-item-page').attr('data-quantity', '1')
}

/**
 * @param {string} name
 * @param {number} price
 * @param {string} image
 * @param {number} calories
 * @param {number} quantity default: 1 */
function setUserVisibleData(name, price, image, calories, quantity = 1) {
  $('#food-item-page #item-page-name').text(name)
  $('#food-item-page #item-page-price').text(`$${twoDecimalPlaces(price)}`)
  $('#food-item-page #item-page-image').attr('src', `./resources/images/${image}`)
  $('#food-item-page .count').text(quantity)
  // If calories are negative show nothing
  if (calories >= 0) $('#food-item-page #item-page-calories').text(`${calories} Calories`)
  else $('#food-item-page #item-page-calories').text(' ')
}

/** @param {import('../data/menu').MenuItem} item */
export function goToItemPageWithObject(item) {
  $('#black-box').append(
    itemCardComponent({
      name: item.name,
      variant: item.variants[0].name,
      price: item.variants[0].price,
      image: item.variants[0].image,
      calories: item.variants[0].calories,
    })
  )
  goToItemPage($(`.food-card[data-name="${item.name}"]`))

  setTimeout(() => $('#black-box').empty(), secs(5))
}

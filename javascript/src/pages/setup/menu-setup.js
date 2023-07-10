// @ts-check
import { Cart } from '../../cart'
import { categoryInfo, foodCategories } from '../../data/menu'
import { categoryCardComponent, itemCardComponent } from '../../jquery-components/main-menu-page'
import { navigateToPage } from '../../utils/pages'
import { goToCartPage } from '../cart-page'
import { goToItemPage } from '../item-page'

/**
 * @param {Cart} cart
 */
export function setupMenuPage(cart) {
  //Cancel order btn
  $('#main-menu-page .cancel-btn').on('click', function () {
    navigateToPage('start-page')
    cart.clearCart()
  })

  // View cart btn
  $('#main-menu-page .view-cart-btn').on('click', function () {
    goToCartPage(cart)
  })

  // Setup food categories
  foodCategories.forEach(category => {
    $('#food-categories-container').append(categoryCardComponent(category.name, category.image))
  })

  // Show food items when category is clicked
  $('#food-categories-container').on('click', '.food-categories-card', function () {
    // Access the clicked image using $(this)
    const clickedCard = $(this)
    const divId = clickedCard.attr('id')

    // Show it as active
    $('.food-categories-card').attr('data-active', 'false')
    clickedCard.attr('data-active', 'true')

    // Clear the #food-items-container before appending item cards from new category
    $('#food-items-container').empty()

    // Append item cards for the specified category
    categoryInfo[divId].forEach(item => {
      const itemVariant = {
        name: item.name,
        variant: item.variants[0].name,
        price: item.variants[0].price,
        calories: item.variants[0].calories,
        image: item.variants[0].image,
      }
      $('#food-items-container').append(itemCardComponent(itemVariant))
    })
  })

  // Set first category as first
  $('#food-categories-container').children('.food-categories-card').first().trigger('click')

  // Go to item page on card click
  $('#food-items-container').on('click', '.food-card', function () {
    goToItemPage($(this))
  })
}

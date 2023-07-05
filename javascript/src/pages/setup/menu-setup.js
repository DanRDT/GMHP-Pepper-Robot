// @ts-check
import { categoryInfo, dailySpecials, foodCategories } from '../../data/menu'
import { categoryCardComponent, itemCardComponent } from '../../jquery-components/main-menu-page'
import { navigateToPage } from '../../utils/pages'
import { Cart } from 'C:/Users/Joseph/Documents/School/CPT 275 Comp Tech Sr Project/GMHP-Pepper-Robot/javascript/src/cart'
import { goToItemPage } from '../item-page'

// Create a new instance of Cart
const cart = new Cart()

export function setupMenuPage() {
  //Cancel order btn
  $('#main-menu-page .cancel-btn').on('click', function () {
    $('#cart-items-container').empty()
    cart.clearCart()
    cart.updateCartUI()
    navigateToPage('start-page')
  })

  // View cart btn
  $('#main-menu-page .view-cart-btn').on('click', function () {
    navigateToPage('cart-page')
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
      $('#food-items-container').append(itemCardComponent(item.name, item.price, item.calories, item.image))
    })
    $('.food-card').on('click', function () {
      goToItemPage($(this))
    })
  })

  // Set first category as first
  $('#food-categories-container').children('.food-categories-card').first().trigger('click')

  $('#food-items-container').on('click', '.food-card', function () {
    goToItemPage($(this))
  })
}

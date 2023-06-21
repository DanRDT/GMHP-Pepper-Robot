// @ts-check

/**
 *
 * @param {string} itemName
 * @param {number} price
 * @param {number} calories
 * @param {string} image
 */
export function itemCard(itemName, price, calories, image) {
  return `
  <div id="${itemName}" class="food-card">
    <img class="image" src="./resources/images/${image}" alt="" />
    <div class="item-details">
      <p>${price}</p>
      <p class="text-nowrap">${calories} cal</p>
    </div>
    <div class="flex-grow"></div>
    <p class="text-center font-semibold">${itemName}</p>
  </div> 
  `
}

/**
 *
 * @param {string} categoryName
 * @param {string} image
 */
export function categoryCard(categoryName, image) {
  return `
  <div id="${categoryName}" class="food-categories-card">
    <img class="image" src="./resources/images/${image}" alt="" />
    <p class="font-semibold text-center">${categoryName}</p>
    <div class="flex-grow"></div>
    <img class="arrow-in-circle" src="./resources/images/other/arrow-in-circle.svg" alt=">" />
  </div>
  `
}

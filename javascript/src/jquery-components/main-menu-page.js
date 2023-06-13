// @ts-check

export function itemCard(itemName, price, calories, image) {
  return `
  <div class="food-card">
    <img class="image" src="./resources/images/${image}" alt="" />
    <div class="item-details">
      <p>${price}</p>
      <p class="text-nowrap">${calories} cal</p>
    </div>
    <div class="flex-grow"></div>
    <p class="text-center font-semibold">${itemName}s</p>
  </div> 
  `
}
export function categoryCard(categoryName, image) {
  return `
  <div class="food-categories-card">
    <img class="image" src="./resources/images/${image}" alt="" />
    <p class="font-semibold text-center">${categoryName}</p>
    <div class="flex-grow"></div>
    <img class="arrow-in-circle" src="./resources/images/other/arrow-in-circle.svg" alt=">" />
  </div>
  `
}

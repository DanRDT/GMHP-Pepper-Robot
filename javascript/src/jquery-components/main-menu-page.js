// @ts-check

import { twoDecimalPlaces } from '../utils/global'

/**
 * @param {object} item
 * @param {string} item.name
 * @param {string} item.variant
 * @param {number} item.price
 * @param {number} item.calories
 * @param {string} item.image */
export function itemCardComponent({ name, variant, price, calories, image }) {
  return `
  <div class="food-card" data-name="${name}" data-variant="${variant}" data-price="${price}" data-calories="${calories}" data-image="${image}">
    <img class="image" src="./resources/images/${image}" alt="" />
    <div class="item-details">
      <p>$${twoDecimalPlaces(price)}</p>
      <p class="text-nowrap">${calories} cal</p>
    </div>
    <div class="flex-grow"></div>
    <p class="text-center font-semibold">${name}</p>
  </div>
  `
}

/**
 * @param {string} categoryName
 * @param {string} image */
export function categoryCardComponent(categoryName, image) {
  return `
  <div class="food-categories-card" data-category="${categoryName}" data-active="false">
    <img class="image" src="./resources/images/${image}" alt="" />
    <p class="font-semibold text-center">${categoryName}</p>
    <div class="flex-grow"></div>
    <svg width="42" height="42" class="arrow-in-circle" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 0.875C9.88633 0.875 0.875 9.88633 0.875 21C0.875 32.1137 9.88633 41.125 21 41.125C32.1137 41.125 41.125 32.1137 41.125 21C41.125 9.88633 32.1137 0.875 21 0.875ZM27.9494 21.292L16.8986 29.2881C16.6605 29.4588 16.3281 29.2881 16.3281 28.9961V26.8893C16.3281 26.4311 16.5482 25.9953 16.9211 25.7258L23.4527 21L16.9211 16.2742C16.5482 16.0047 16.3281 15.5734 16.3281 15.1107V13.0039C16.3281 12.7119 16.6605 12.5412 16.8986 12.7119L27.9494 20.708C28.1471 20.8518 28.1471 21.1482 27.9494 21.292Z" fill="#1f2b5d"/>
    </svg>
    </div>
    `
}

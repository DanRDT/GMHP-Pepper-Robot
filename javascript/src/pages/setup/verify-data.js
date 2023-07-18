// @ts-check

import { newPopup } from '../../utils/global'

/**
 * @param {Array<{
 *  name: string;
 *  variants: Array<{
 *    name: string;
 *    price: number;
 *    calories: number;
 *    image: string;
 *    }>
 *  }> } menuItems
 */
export function verifyMenuItems(menuItems) {
  const POPUP_VISIBLE_TIME = 10
  try {
    menuItems.forEach(item => {
      if (typeof item.name !== 'string') newPopup(`Name not a string for ${JSON.stringify(item)}`, POPUP_VISIBLE_TIME)
      if (!Array.isArray(item.variants)) newPopup(`Variants not an array for ${item.name}`, POPUP_VISIBLE_TIME)
      if (item.variants.length < 1) newPopup(`Variants array empty for ${item.name}`, POPUP_VISIBLE_TIME)
      item.variants.forEach(variant => {
        if (typeof variant.name !== 'string')
          newPopup(`Name not a string for ${JSON.stringify(variant)} of ${item.name}`, POPUP_VISIBLE_TIME)
        if (typeof variant.price !== 'number')
          newPopup(`Price not a number for ${variant.name} of ${item.name}`, POPUP_VISIBLE_TIME)
        if (typeof variant.calories !== 'number')
          newPopup(`Calories not a number for ${variant.name} of ${item.name}`, POPUP_VISIBLE_TIME)
        if (typeof variant.image !== 'string')
          newPopup(`Image not a string for ${variant.name} of ${item.name}`, POPUP_VISIBLE_TIME)
      })
    })
  } catch (error) {
    newPopup(`Verifying Menu Items failed ~ ${error}`)
  }
}

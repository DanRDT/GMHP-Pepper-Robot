// @ts-check
/** @param {string} variantName */
export function variantComponent(variantName) {
  return `
  <div class="variant" data-active="" data-variant="${variantName}"><h2>${variantName}</h2></div>
  `
}

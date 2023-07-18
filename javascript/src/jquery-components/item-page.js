// @ts-check
/** @param {string} variantName */
export function variantComponent(variantName) {
  let variantDisplayName = variantName
  if (variantName.toLowerCase() === '3x small') variantDisplayName = '3XS'
  else if (variantName.toLowerCase() === '2x small') variantDisplayName = 'XXS'
  else if (variantName.toLowerCase() === 'extra small') variantDisplayName = 'XS'
  else if (variantName.toLowerCase() === 'small') variantDisplayName = 'S'
  else if (variantName.toLowerCase() === 'medium') variantDisplayName = 'M'
  else if (variantName.toLowerCase() === 'large') variantDisplayName = 'L'
  else if (variantName.toLowerCase() === 'extra large') variantDisplayName = 'XL'
  else if (variantName.toLowerCase() === '2x large') variantDisplayName = 'XXL'
  else if (variantName.toLowerCase() === '3x large') variantDisplayName = '3XXL'

  return `
  <div class="variant" data-active="" data-variant="${variantName}"><h2>${variantDisplayName}</h2></div>
  `
}

// '3X Small' => '3XS'
// '2X Small' => 'XXS'
// 'Extra Small' => 'XS'
// 'Small' => 'S'
// 'Medium' => 'M'
// 'Large' => 'L'
// 'Extra Large' => 'XL'
// '2X Large' => 'XXL'
// '3X Large' => '3XXL'

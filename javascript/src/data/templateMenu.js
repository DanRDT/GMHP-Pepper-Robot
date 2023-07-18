// @ts-check

/**
 * @typedef {{
 *    name: string;
 *    price: number;
 *    calories: number;
 *    image: string;
 *    } } Variant
 */

/**
 * @typedef {{
 *  name: string;
 *  variants: Array<Variant>
 *  } } MenuItem
 */

// Step 1
//Create menu categories with their respective items below
export const exampleCategory = [
  {
    name: 'Example Pasta Primavera',
    variants: [
      {
        name: '', // Empty string for only one variant
        price: 7.0,
        calories: 575,
        image: 'menu/pasta.jpg',
      },
    ],
  },
  {
    name: 'Example Pizza',
    variants: [
      {
        name: 'Small',
        price: 4.0,
        calories: 350,
        image: 'menu/bbqchickenpizza.jpg',
      },
      {
        name: 'Medium',
        price: 6.0,
        calories: 550,
        image: 'menu/bbqchickenpizza.jpg',
      },
      {
        name: 'Large',
        price: 8.0,
        calories: 750,
        image: 'menu/bbqchickenpizza.jpg',
      },
    ],
  },
  {
    name: 'Example Taco Salad',
    variants: [
      {
        name: 'Chicken',
        price: 5.0,
        calories: 400,
        image: 'menu/tacosalad.jpg',
      },
      {
        name: 'Beef',
        price: 6.0,
        calories: 550,
        image: 'menu/tacosalad.jpg',
      },
    ],
  },
]
// Create more categories here

// Step 2
// Put all menu categories in the menuItems array using the spread operator (...)
/** @type {Array<MenuItem>} menuItems */
export const menuItems = [...exampleCategory]

// Step 3
// Put all menu categories in the foodCategories array along with the image for the calorie (you can use the image from first item in each category)
/** @type {Array<{ name: string; image: string; }> } */
export const foodCategories = [
  {
    name: 'Example Category',
    image: exampleCategory[0].variants[0].image, // image for category could be the image for the first item in the category
  },
  // Add more categories here
]

// Step 4
// Put all menu categories in the categoryInfo object using the category name as the key
export const categoryInfo = {
  'Example Category': exampleCategory,
  // Add more categories here
}

// Step 5
// Remove all references to exampleCategory if you haven't already

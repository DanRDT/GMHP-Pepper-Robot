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

//Create menu categories with their respective items below
export const dailySpecials = [
  {
    name: 'BBQ Chicken Pizza',
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
    name: 'Taco Salad',
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
  {
    name: 'Pasta Primavera',
    variants: [
      {
        name: 'Veggie',
        price: 5.0,
        calories: 375,
        image: 'menu/pasta.jpg',
      },
      {
        name: 'Chicken',
        price: 7.0,
        calories: 575,
        image: 'menu/pasta.jpg',
      },
    ],
  },
  {
    name: 'Sushi Roll Sampler',
    variants: [
      {
        name: '',
        price: 6.0,
        calories: 375,
        image: 'menu/sushi.jpg',
      },
    ],
  },
  {
    name: 'Fish and Chips',
    variants: [
      {
        name: '3-Piece',
        price: 5.0,
        calories: 450,
        image: 'menu/fishandchips.jpg',
      },
      {
        name: '5-Piece',
        price: 6.5,
        calories: 600,
        image: 'menu/fishandchips.jpg',
      },
    ],
  },
]

export const sides = [
  {
    name: 'French Fries',
    variants: [
      {
        name: 'Small',
        price: 2.0,
        calories: 365,
        image: 'menu/frenchfries.jpg',
      },
      {
        name: 'Medium',
        price: 3.0,
        calories: 465,
        image: 'menu/frenchfries.jpg',
      },
      {
        name: 'Large',
        price: 4.0,
        calories: 565,
        image: 'menu/frenchfries.jpg',
      },
    ],
  },
  {
    name: 'Sweet Potato Fries',
    variants: [
      {
        name: 'Small',
        price: 2.5,
        calories: 495,
        image: 'menu/sweetpotatofries.jpg',
      },
      {
        name: 'Medium',
        price: 3.5,
        calories: 595,
        image: 'menu/sweetpotatofries.jpg',
      },
      {
        name: 'Large',
        price: 4.5,
        calories: 695,
        image: 'menu/sweetpotatofries.jpg',
      },
    ],
  },
  {
    name: 'Garden Salad',
    variants: [
      {
        name: 'Veggie',
        price: 3.0,
        calories: 100,
        image: 'menu/gardensalad.jpg',
      },
      {
        name: 'Chicken',
        price: 5.0,
        calories: 300,
        image: 'menu/gardensalad.jpg',
      },
    ],
  },
  {
    name: 'Fruit Cup',
    variants: [
      {
        name: 'Small',
        price: 2.5,
        calories: 60,
        image: 'menu/fruitcup.jpg',
      },
      {
        name: 'Large',
        price: 4.0,
        calories: 130,
        image: 'menu/fruitcup.jpg',
      },
    ],
  },
  {
    name: 'Hummus and Vegetable Sticks',
    variants: [
      {
        name: '',
        price: 3.0,
        calories: 200,
        image: 'menu/hummussticks.jpg',
      },
    ],
  },
]

export const desserts = [
  {
    name: 'Chocolate Chip Cookie',
    variants: [
      {
        name: '1 pack',
        price: 1.5,
        calories: 200,
        image: 'menu/cookie.jpg',
      },
      {
        name: '3 pack',
        price: 2.5,
        calories: 600,
        image: 'menu/cookie.jpg',
      },
      {
        name: '5 pack',
        price: 3.5,
        calories: 700,
        image: 'menu/cookie.jpg',
      },
    ],
  },
  {
    name: 'Apple Pie Slice',
    variants: [
      {
        name: '',
        price: 2.5,
        calories: 320,
        image: 'menu/applepie.jpg',
      },
    ],
  },
  {
    name: 'Ice Cream',
    variants: [
      {
        name: 'Vanilla',
        price: 2.0,
        calories: 210,
        image: 'menu/icecream.jpg',
      },
      {
        name: 'Chocolate',
        price: 2.0,
        calories: 210,
        image: 'menu/icecream.jpg',
      },
    ],
  },
  {
    name: 'Fresh Fruit Parfait',
    variants: [
      {
        name: 'Small',
        price: 3.0,
        calories: 150,
        image: 'menu/parfait.jpg',
      },
      {
        name: 'Large',
        price: 5.0,
        calories: 350,
        image: 'menu/parfait.jpg',
      },
    ],
  },
]

export const beverages = [
  {
    name: 'Bottled Water',
    variants: [
      {
        name: '',
        price: 1.5,
        calories: 0,
        image: 'menu/water.jpg',
      },
    ],
  },
  {
    name: 'Iced Tea',
    variants: [
      {
        name: 'Small',
        price: 2.0,
        calories: 70,
        image: 'menu/icedtea.jpg',
      },
      {
        name: 'Medium',
        price: 3.0,
        calories: 95,
        image: 'menu/icedtea.jpg',
      },
      {
        name: 'Large',
        price: 4.0,
        calories: 130,
        image: 'menu/icedtea.jpg',
      },
    ],
  },
  {
    name: 'Lemonade',
    variants: [
      {
        name: 'Small',
        price: 2.0,
        calories: 120,
        image: 'menu/lemonade.jpg',
      },
      {
        name: 'Medium',
        price: 3.0,
        calories: 200,
        image: 'menu/lemonade.jpg',
      },
      {
        name: 'Large',
        price: 4.0,
        calories: 260,
        image: 'menu/lemonade.jpg',
      },
    ],
  },
  {
    name: 'Assorted Soda (Coke, Sprite, Fanta)',
    variants: [
      {
        name: 'Small',
        price: 2.0,
        calories: 150,
        image: 'menu/soda.jpg',
      },
      {
        name: 'Medium',
        price: 3.0,
        calories: 250,
        image: 'menu/soda.jpg',
      },
      {
        name: 'Large',
        price: 4.0,
        calories: 350,
        image: 'menu/soda.jpg',
      },
    ],
  },
  {
    name: 'Fresh Squeezed Orange Juice',
    variants: [
      {
        name: 'Small',
        price: 2.5,
        calories: 110,
        image: 'menu/orangejuice.jpg',
      },
      {
        name: 'Medium',
        price: 3.5,
        calories: 210,
        image: 'menu/orangejuice.jpg',
      },
      {
        name: 'Large',
        price: 4.5,
        calories: 310,
        image: 'menu/orangejuice.jpg',
      },
    ],
  },
]

export const coffeeItems = [
  {
    name: 'Regular Coffee',
    variants: [
      {
        name: 'Small',
        price: 2.0,
        calories: 5,
        image: 'menu/smallcoffee.jpg',
      },
      {
        name: 'Medium',
        price: 3.0,
        calories: 15,
        image: 'menu/smallcoffee.jpg',
      },
      {
        name: 'Large',
        price: 4.0,
        calories: 25,
        image: 'menu/smallcoffee.jpg',
      },
    ],
  },
  {
    name: 'Iced Coffee',
    variants: [
      {
        name: 'Small',
        price: 2.5,
        calories: 30,
        image: 'menu/smallicedcoffee.jpg',
      },
      {
        name: 'Medium',
        price: 3.5,
        calories: 40,
        image: 'menu/smallcoffee.jpg',
      },
      {
        name: 'Large',
        price: 4.5,
        calories: 50,
        image: 'menu/americano.jpg',
      },
      {
        name: 'Extra Large',
        price: 5.5,
        calories: 60,
        image: 'menu/americano.jpg',
      },
    ],
  },
  {
    name: 'Cappuccino',
    variants: [
      {
        name: '12oz',
        price: 3.0,
        calories: 120,
        image: 'menu/cappuccino.jpg',
      },
      {
        name: '16oz',
        price: 4.0,
        calories: 180,
        image: 'menu/cappuccino.jpg',
      },
    ],
  },
  {
    name: 'Latte',
    variants: [
      {
        name: '12oz',
        price: 3.0,
        calories: 150,
        image: 'menu/latte.jpg',
      },
      {
        name: '16oz',
        price: 4.0,
        calories: 190,
        image: 'menu/latte.jpg',
      },
    ],
  },
  {
    name: 'Americano',
    variants: [
      {
        name: '12oz',
        price: 2.5,
        calories: 15,
        image: 'menu/americano.jpg',
      },
      {
        name: '16oz',
        price: 3,
        calories: 25,
        image: 'menu/americano.jpg',
      },
    ],
  },
  {
    name: 'Espresso Shot',
    variants: [
      {
        name: 'Single',
        price: 1.5,
        calories: 5,
        image: 'menu/espresso.jpg',
      },
      {
        name: 'Double',
        price: 2.5,
        calories: 10,
        image: 'menu/espresso.jpg',
      },
    ],
  },
  {
    name: 'Tea (various flavors) - Small',
    variants: [
      {
        name: 'Small',
        price: 2.0,
        calories: 5,
        image: 'menu/smalltea.jpg',
      },
      {
        name: 'Medium',
        price: 3.0,
        calories: 15,
        image: 'menu/smalltea.jpg',
      },
      {
        name: 'Large',
        price: 4.0,
        calories: 20,
        image: 'menu/smalltea.jpg',
      },
    ],
  },
]

export const healthyOptions = [
  {
    name: 'Quinoa Salad',
    variants: [{ name: '', price: 5.5, calories: 5, image: 'menu/quinoasalad.jpg' }],
  },
  {
    name: 'Grilled Salmon with Steamed Veggies',
    variants: [{ name: '', price: 2.5, calories: 30, image: 'menu/grilledsalmon.jpg' }],
  },
  {
    name: 'Vegan Lentil Soup',
    variants: [{ name: '', price: 3.0, calories: 120, image: 'menu/veganlentilsoup.jpg' }],
  },
  {
    name: 'Greek Yogurt with Granola and Berries',
    variants: [{ name: '', price: 3.0, calories: 150, image: 'menu/yogurtgranola.jpg' }],
  },
]

// Put all menu categories in the menuItems array using the spread operator (...)
/** @type {Array<MenuItem>} menuItems */
export const menuItems = [...dailySpecials, ...sides, ...desserts, ...beverages, ...coffeeItems, ...healthyOptions]

// Put all menu categories in the foodCategories array along with the image for the calorie (you can use the image from first item in each category)
/** @type {Array<{ name: string; image: string; }> } */
export const foodCategories = [
  {
    name: 'Daily Specials',
    image: dailySpecials[0].variants[0].image,
  },
  {
    name: 'Sides',
    image: sides[0].variants[0].image,
  },
  {
    name: 'Desserts',
    image: desserts[0].variants[0].image,
  },
  {
    name: 'Beverages',
    image: beverages[0].variants[0].image,
  },
  {
    name: 'Coffee',
    image: coffeeItems[0].variants[0].image,
  },
  {
    name: 'Healthy Options',
    image: healthyOptions[0].variants[0].image,
  },
]

// Put all menu categories in the categoryInfo object using the category name as the key
export const categoryInfo = {
  'Daily Specials': dailySpecials,
  Sides: sides,
  Desserts: desserts,
  Beverages: beverages,
  Coffee: coffeeItems,
  'Healthy Options': healthyOptions,
}

// @ts-check

export const dailySpecials = [
  {
    day: 'Monday',
    name: 'BBQ Chicken Pizza',
    price: 4.0,
    calories: 350,
    image: 'menu/bbqchickenpizza.jpg',
    ingredients: [
      { name: 'Pizza dough', price: 1, calories: 100, image: 'menu/dough.jpg' },
      { name: 'BBQ Sauce', price: 1, calories: 70, image: 'menu/bbqsauce.jpg' },
      { name: 'Grilled chicken', price: 1, calories: 120, image: 'menu/grilledchicken.jpg' },
      { name: 'Mozzarella cheese', price: 1, calories: 60, image: 'menu/cheese.jpg' },
    ],
  },
  {
    day: 'Tuesday',
    name: 'Taco Salad',
    price: 5.0,
    calories: 400,
    image: 'menu/tacosalad.jpg',
    ingredients: [
      { name: 'Lettuce', price: 1, calories: 5, image: 'menu/lettuce.jpg' },
      { name: 'Ground beef', price: 2, calories: 200, image: 'menu/beef.jpg' },
      { name: 'Tomatoes', price: 1, calories: 20, image: 'menu/tomatoes.jpg' },
      { name: 'Cheese', price: 1, calories: 110, image: 'menu/cheese.jpg' },
      { name: 'Salsa', price: 0.5, calories: 25, image: 'menu/salsa.jpg' },
      { name: 'Sour cream', price: 0.5, calories: 40, image: 'menu/sourcream.jpg' },
    ],
  },
  {
    day: 'Wednesday',
    name: 'Pasta Primavera',
    price: 5.0,
    calories: 375,
    image: 'menu/pasta.jpg',
    ingredients: [
      { name: 'Pasta', price: 1, calories: 200, image: 'menu/pasta.jpg' },
      { name: 'Olive oil', price: 0.5, calories: 60, image: 'menu/oil.jpg' },
      { name: 'Assorted vegetables', price: 2, calories: 100, image: 'menu/vegetables.jpg' },
      { name: 'Parmesan cheese', price: 1.5, calories: 15, image: 'menu/parmesan.jpg' },
    ],
  },
  {
    day: 'Thursday',
    name: 'Sushi Roll Sampler',
    price: 6.0,
    calories: 375,
    image: 'menu/sushi.jpg',
    ingredients: [
      { name: 'Rice', price: 1, calories: 120, image: 'menu/rice.jpg' },
      { name: 'Nori', price: 0.5, calories: 5, image: 'menu/nori.jpg' },
      { name: 'Assorted fish', price: 3, calories: 200, image: 'menu/fish.jpg' },
      { name: 'Avocado', price: 1.5, calories: 50, image: 'menu/avocado.jpg' },
    ],
  },
  {
    day: 'Friday',
    name: 'Fish and Chips',
    price: 5.0,
    calories: 450,
    image: 'menu/fishandchips.jpg',
    ingredients: [
      { name: 'White fish', price: 2, calories: 200, image: 'menu/fish.jpg' },
      { name: 'Batter', price: 1, calories: 150, image: 'menu/batter.jpg' },
      { name: 'Potatoes', price: 1, calories: 100, image: 'menu/potatoes.jpg' },
      { name: 'Tartar sauce', price: 1, calories: 80, image: 'menu/tartarsauce.jpg' },
    ],
  },
]

export const sides = [
  {
    name: 'French Fries',
    price: 2.0,
    calories: 365,
    image: 'menu/frenchfries.jpg',
    ingredients: [
      { name: 'Potatoes', price: 0.5, calories: 200, image: 'menu/potatoes.jpg' },
      { name: 'Oil', price: 0.5, calories: 165, image: 'menu/oil.jpg' },
      { name: 'Salt', price: 0, calories: 0, image: 'menu/salt.jpg' },
    ],
  },
  {
    name: 'Sweet Potato Fries',
    price: 2.5,
    calories: 395,
    image: 'menu/sweetpotatofries.jpg',
    ingredients: [
      { name: 'Sweet potatoes', price: 0.75, calories: 180, image: 'menu/sweetpotatoes.jpg' },
      { name: 'Oil', price: 0.5, calories: 165, image: 'menu/oil.jpg' },
      { name: 'Salt', price: 0, calories: 0, image: 'menu/salt.jpg' },
      { name: 'Spices', price: 0.25, calories: 50, image: 'menu/spices.jpg' },
    ],
  },
  {
    name: 'Garden Salad',
    price: 3.0,
    calories: 100,
    image: 'menu/gardensalad.jpg',
    ingredients: [
      { name: 'Lettuce', price: 0.75, calories: 5, image: 'menu/lettuce.jpg' },
      { name: 'Tomatoes', price: 0.5, calories: 10, image: 'menu/tomatoes.jpg' },
      { name: 'Cucumbers', price: 0.5, calories: 10, image: 'menu/cucumbers.jpg' },
      { name: 'Carrots', price: 0.25, calories: 20, image: 'menu/carrots.jpg' },
      { name: 'Dressing', price: 1.0, calories: 55, image: 'menu/dressing.jpg' },
    ],
  },
  {
    name: 'Fruit Cup',
    price: 2.5,
    calories: 60,
    image: 'menu/fruitcup.jpg',
    ingredients: [{ name: 'Various fruits', price: 2.5, calories: 60, image: 'menu/fruits.jpg' }],
  },
  {
    name: 'Hummus and Vegetable Sticks',
    price: 3.0,
    calories: 200,
    image: 'menu/hummussticks.jpg',
    ingredients: [
      { name: 'Hummus', price: 1.5, calories: 100, image: 'menu/hummus.jpg' },
      { name: 'Carrots', price: 0.5, calories: 25, image: 'menu/carrots.jpg' },
      { name: 'Celery', price: 0.5, calories: 10, image: 'menu/celery.jpg' },
      { name: 'Bell peppers', price: 0.5, calories: 15, image: 'menu/bellpeppers.jpg' },
      { name: 'Cucumbers', price: 0.5, calories: 10, image: 'menu/cucumbers.jpg' },
    ],
  },
]

export const desserts = [
  {
    name: 'Chocolate Chip Cookie',
    price: 1.5,
    calories: 200,
    image: 'menu/cookie.jpg',
    ingredients: [
      { name: 'Flour', price: 0.1, calories: 75, image: 'menu/flour.jpg' },
      { name: 'Sugar', price: 0.1, calories: 80, image: 'menu/sugar.jpg' },
      { name: 'Chocolate Chips', price: 0.3, calories: 70, image: 'menu/chocolatechips.jpg' },
      { name: 'Eggs', price: 0.2, calories: 70, image: 'menu/eggs.jpg' },
      { name: 'Butter', price: 0.3, calories: 100, image: 'menu/butter.jpg' },
      { name: 'Vanilla', price: 0.1, calories: 10, image: 'menu/vanilla.jpg' },
    ],
  },
  {
    name: 'Apple Pie Slice',
    price: 2.5,
    calories: 320,
    image: 'menu/applepie.jpg',
    ingredients: [
      { name: 'Apples', price: 0.5, calories: 95, image: 'menu/apples.jpg' },
      { name: 'Sugar', price: 0.1, calories: 80, image: 'menu/sugar.jpg' },
      { name: 'Flour', price: 0.1, calories: 75, image: 'menu/flour.jpg' },
      { name: 'Butter', price: 0.3, calories: 100, image: 'menu/butter.jpg' },
      { name: 'Cinnamon', price: 0.1, calories: 5, image: 'menu/cinnamon.jpg' },
    ],
  },
  {
    name: 'Vanilla or Chocolate Ice Cream',
    price: 2.0,
    calories: 210,
    image: 'menu/icecream.jpg',
    ingredients: [
      { name: 'Milk', price: 0.5, calories: 80, image: 'menu/milk.jpg' },
      { name: 'Sugar', price: 0.1, calories: 80, image: 'menu/sugar.jpg' },
      { name: 'Vanilla/Chocolate', price: 0.4, calories: 50, image: 'menu/vanilla.jpg' },
    ],
  },
  {
    name: 'Fresh Fruit Parfait',
    price: 3.0,
    calories: 150,
    image: 'menu/parfait.jpg',
    ingredients: [
      { name: 'Various fruits', price: 1.0, calories: 60, image: 'menu/fruits.jpg' },
      { name: 'Greek Yogurt', price: 1.0, calories: 70, image: 'menu/yogurt.jpg' },
      { name: 'Granola', price: 1.0, calories: 20, image: 'menu/granola.jpg' },
    ],
  },
]

export const beverages = [
  {
    name: 'Bottled Water',
    price: 1.5,
    calories: 0,
    image: 'menu/water.jpg',
    ingredients: [{ name: 'Water', price: 1.5, calories: 0, image: 'menu/water.jpg' }],
  },
  {
    name: 'Iced Tea',
    price: 2.0,
    calories: 70,
    image: 'menu/icedtea.jpg',
    ingredients: [
      { name: 'Tea', price: 0.5, calories: 0, image: 'menu/tea.jpg' },
      { name: 'Sugar', price: 0.1, calories: 70, image: 'menu/sugar.jpg' },
      { name: 'Ice', price: 0.1, calories: 0, image: 'menu/ice.jpg' },
    ],
  },
  {
    name: 'Lemonade',
    price: 2.0,
    calories: 120,
    image: 'menu/lemonade.jpg',
    ingredients: [
      { name: 'Lemon', price: 0.5, calories: 20, image: 'menu/lemon.jpg' },
      { name: 'Sugar', price: 0.1, calories: 70, image: 'menu/sugar.jpg' },
      { name: 'Water', price: 0.1, calories: 0, image: 'menu/water.jpg' },
      { name: 'Ice', price: 0.1, calories: 0, image: 'menu/ice.jpg' },
    ],
  },
  {
    name: 'Assorted Soda (Coke, Sprite, Fanta)',
    price: 2.0,
    calories: 150,
    image: 'menu/soda.jpg',
    ingredients: [{ name: 'Soda', price: 2.0, calories: 150, image: 'menu/soda.jpg' }],
  },
  {
    name: 'Fresh Squeezed Orange Juice',
    price: 2.5,
    calories: 110,
    image: 'menu/orangejuice.jpg',
    ingredients: [{ name: 'Oranges', price: 2.5, calories: 110, image: 'menu/oranges.jpg' }],
  },
]

export const coffeeItems = [
  {
    name: 'Regular Coffee',
    price: 2.0,
    calories: 5,
    image: 'menu/smallcoffee.jpg',
    ingredients: [
      { name: 'Coffee beans', price: 0.5, calories: 5, image: 'menu/coffeebeans.jpg' },
      { name: 'Water', price: 0.1, calories: 0, image: 'menu/water.jpg' },
    ],
  },
  {
    name: 'Iced Coffee',
    price: 2.5,
    calories: 30,
    image: 'menu/smallicedcoffee.jpg',
    ingredients: [
      { name: 'Coffee beans', price: 0.5, calories: 5, image: 'menu/coffeebeans.jpg' },
      { name: 'Water', price: 0.1, calories: 0, image: 'menu/water.jpg' },
      { name: 'Ice', price: 0.1, calories: 0, image: 'menu/ice.jpg' },
      { name: 'Milk', price: 0.3, calories: 25, image: 'menu/milk.jpg' },
    ],
  },

  {
    name: 'Cappuccino',
    price: 3.0,
    calories: 120,
    image: 'menu/cappuccino.jpg',
    ingredients: [
      { name: 'Coffee beans', price: 0.7, calories: 10, image: 'menu/coffeebeans.jpg' },
      { name: 'Water', price: 0.1, calories: 0, image: 'menu/water.jpg' },
      { name: 'Milk', price: 0.6, calories: 60, image: 'menu/milk.jpg' },
      { name: 'Foam', price: 0.6, calories: 50, image: 'menu/foam.jpg' },
    ],
  },
  {
    name: 'Latte',
    price: 3.0,
    calories: 150,
    image: 'menu/latte.jpg',
    ingredients: [
      { name: 'Coffee beans', price: 0.7, calories: 10, image: 'menu/coffeebeans.jpg' },
      { name: 'Water', price: 0.1, calories: 0, image: 'menu/water.jpg' },
      { name: 'Milk', price: 0.8, calories: 80, image: 'menu/milk.jpg' },
      { name: 'Sugar', price: 0.4, calories: 60, image: 'menu/sugar.jpg' },
    ],
  },
  {
    name: 'Americano',
    price: 2.5,
    calories: 15,
    image: 'menu/americano.jpg',
    ingredients: [
      { name: 'Coffee beans', price: 0.7, calories: 10, image: 'menu/coffeebeans.jpg' },
      { name: 'Water', price: 0.1, calories: 0, image: 'menu/water.jpg' },
      { name: 'Sugar', price: 0.2, calories: 5, image: 'menu/sugar.jpg' },
    ],
  },
  {
    name: 'Espresso Shot',
    price: 1.5,
    calories: 5,
    image: 'menu/espresso.jpg',
    ingredients: [{ name: 'Coffee beans', price: 1.5, calories: 5, image: 'menu/coffeebeans.jpg' }],
  },
  {
    name: 'Tea (various flavors) - Small',
    price: 2.0,
    calories: 5,
    image: 'menu/smalltea.jpg',
    ingredients: [
      { name: 'Tea leaves', price: 0.5, calories: 0, image: 'menu/tealeaves.jpg' },
      { name: 'Water', price: 0.1, calories: 0, image: 'menu/water.jpg' },
      { name: 'Sugar', price: 0.2, calories: 5, image: 'menu/sugar.jpg' },
    ],
  },
  {
    name: 'Tea (various flavors) - Large',
    price: 2.5,
    calories: 10,
    image: 'menu/largetea.jpg',
    ingredients: [
      { name: 'Tea leaves', price: 0.7, calories: 0, image: 'menu/tealeaves.jpg' },
      { name: 'Water', price: 0.1, calories: 0, image: 'menu/water.jpg' },
      { name: 'Sugar', price: 0.4, calories: 10, image: 'menu/sugar.jpg' },
    ],
  },
]

export const healthyOptions = [
  {
    name: 'Quinoa Salad',
    price: 5.5,
    calories: 220,
    image: 'menu/quinoasalad.jpg',
    ingredients: [
      { name: 'Quinoa', price: 1.5, calories: 100, image: 'menu/quinoa.jpg' },
      { name: 'Mixed Vegetables', price: 1.5, calories: 50, image: 'menu/mixedveg.jpg' },
      { name: 'Olive Oil', price: 0.5, calories: 60, image: 'menu/oliveoil.jpg' },
      { name: 'Spices', price: 0.1, calories: 10, image: 'menu/spices.jpg' },
    ],
  },
  {
    name: 'Grilled Salmon with Steamed Veggies',
    price: 7.5,
    calories: 400,
    image: 'menu/grilledsalmon.jpg',
    ingredients: [
      { name: 'Salmon', price: 3.5, calories: 200, image: 'menu/salmon.jpg' },
      { name: 'Mixed Vegetables', price: 2, calories: 100, image: 'menu/mixedveg.jpg' },
      { name: 'Olive Oil', price: 0.5, calories: 80, image: 'menu/oliveoil.jpg' },
      { name: 'Lemon', price: 0.5, calories: 20, image: 'menu/lemon.jpg' },
    ],
  },
  {
    name: 'Vegan Lentil Soup',
    price: 4.5,
    calories: 200,
    image: 'menu/veganlentilsoup.jpg',
    ingredients: [
      { name: 'Lentils', price: 1.5, calories: 100, image: 'menu/lentils.jpg' },
      { name: 'Vegetable Stock', price: 1, calories: 30, image: 'menu/vegstock.jpg' },
      { name: 'Mixed Vegetables', price: 1.5, calories: 50, image: 'menu/mixedveg.jpg' },
      { name: 'Spices', price: 0.5, calories: 20, image: 'menu/spices.jpg' },
    ],
  },
  {
    name: 'Greek Yogurt with Granola and Berries',
    price: 3.5,
    calories: 250,
    image: 'menu/yogurtgranola.jpg',
    ingredients: [
      { name: 'Greek Yogurt', price: 1.5, calories: 100, image: 'menu/yogurt.jpg' },
      { name: 'Granola', price: 1, calories: 100, image: 'menu/granola.jpg' },
      { name: 'Berries', price: 1, calories: 50, image: 'menu/berries.jpg' },
    ],
  },
]

/**
 * @type {Array<{
 *  name: string;
 *  price: number;
 *  calories: number;
 *  image: string;
 *  ingredients: Array<{
 *    name: string;
 *    price: number;
 *    calories: number;
 *    image: string;
 *    }>
 *  }> } menuItems
 */
export const menuItems = [...dailySpecials, ...sides, ...desserts, ...beverages, ...coffeeItems, ...healthyOptions]

/**
 * @type {Array<{ name: string; image: string; }> } foodCategories
 */
export const foodCategories = [
  {
    name: 'Daily Specials',
    image: dailySpecials[0].image,
  },
  {
    name: 'Sides',
    image: sides[0].image,
  },
  {
    name: 'Desserts',
    image: desserts[0].image,
  },
  {
    name: 'Beverages',
    image: beverages[0].image,
  },
  {
    name: 'Coffee',
    image: coffeeItems[0].image,
  },
  {
    name: 'Healthy Options',
    image: healthyOptions[0].image,
  },
]

  // Define object to store category information
  export const categoryInfo = {
    'Daily Specials': dailySpecials,
    Sides: sides,
    Desserts: desserts,
    Beverages: beverages,
    Coffee: coffeeItems,
    'Healthy Options': healthyOptions,
  }

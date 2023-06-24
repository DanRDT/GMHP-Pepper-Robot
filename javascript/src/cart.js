//@ts-check

class Cart {
  /**
   * @type {Array<{
   *  name: string;
   *  price: number;
   *  quantity: number;
   *  image: string;
   *  }>}
   */
  cart = []

  constructor() {}

  getCart() {
    return this.cart
  }

  addToCart(item) {
    this.cart.push(item)
    console.log(`Added ${item} to the cart.`)
  }

  removeFromCart(item) {
    const index = this.cart.indexOf(item)
    if (index !== -1) {
      this.cart.splice(index, 1)
      console.log(`Removed ${item} from the cart.`)
    } else {
      console.log(`${item} is not in the cart.`)
    }
  }

  clearCart() {
    this.cart = []
    console.log('Cart cleared.')
  }
}

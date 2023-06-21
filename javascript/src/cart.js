class Cart {
    constructor() {
          this.cart = [];
    }
      
    getCart() {
          return this.cart;
    }
      
    addToCart(item) {
          this.cart.push(item);
          console.log(`Added ${item} to the cart.`);
    }
      
    removeFromCart(item) {
          const index = this.cart.indexOf(item);
          if (index !== -1) {
            this.cart.splice(index, 1);
            console.log(`Removed ${item} from the cart.`);
          } else {
            console.log(`${item} is not in the cart.`);
          }
    }
      
      clearCart() {
          this.cart = [];
          console.log('Cart cleared.');
    }
}
      


//@ts-check


// Generate order number
export function updateOrderNumber() {
    // Generate a random 6-digit number
      function generateRandomNumber() {
        return Math.floor(Math.random() * 900000) + 100000
      }
  
    const orderNumber = generateRandomNumber()
  
    // Update order number in the HTML element with id "order-number"
    $("#order-number").text(orderNumber)
  
  
  }
  
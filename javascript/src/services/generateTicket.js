//@ts-check

import { Cart } from '../cart'

/**
 * @param {Cart} cart
 */
//Generate ticket to send to kitchen
export function generateTicket(cart) {
  const mycart = cart.getCart()
  const orderNumber = $('#order-number').text()

  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleDateString()
  const formattedTime = currentDate.toLocaleTimeString()

  let receipt = '<table style="border-collapse: separate; border-spacing: 10px; margin: auto;">'
  receipt += `<tr><td style="text-align:left;"><strong>Order#:</strong>${orderNumber}</td><td>${formattedDate}</td><td>${formattedTime}</td></tr>`
  receipt += '<tr><td colspan="3"><hr></td></tr>'
  receipt += '<tr><th colspan="3";style="text-align:center;"><strong>Pick Up Order</th></strong></tr>'
  receipt += '<tr><td colspan="3"><hr></td></tr>'
  receipt += '<tr><th>Item</th><th>Details</th><th>Quantity</th></tr>'
  receipt += '<tr><td colspan="3"><hr></td></tr>'

  mycart.forEach(cartItem => {
    const { name, variant, price, quantity, image, calories } = cartItem
    const itemTotal = price * quantity

    receipt += '<tr>'
    receipt += `<td>${name}</td>`
    receipt += `<td>${variant}</td>`
    receipt += `<td style="text-align:center;">${quantity}</td>`
    receipt += '</tr>'
  })
  receipt += `</table>`
  return receipt
}

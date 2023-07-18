//@ts-check

import { Cart } from '../cart'
import { twoDecimalPlaces } from '../utils/global'

/**
 * @param {Cart} cart
 */
export function generateReceipt(cart) {
  const myCart = cart.getCart()
  const orderNumber = $('#order-number').text()

  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleDateString()
  const formattedTime = currentDate.toLocaleTimeString()

  let receipt = `
  <p><h2 style="text-align:center; width:100%;"><strong>Chaser's Cafe</h2></strong></p>
  <p><h3 style="text-align:center; width:100%;"><strong>Spartanburg Community College</h3></strong></p>
  <p><h4 style="text-align:center; width:100%;"><strong>107 Community College Dr.<br>Spartanburg, SC 29303</h4></strong></p>

  <table style="border-collapse: separate; border-spacing: 10px; margin: auto;">
    <tr> <td> </td><td> </td><td> </td><td style="text-align:right;"><strong>Order#:</strong></td><td style="text-align:left;">${orderNumber}</td></tr>
    <tr><td colspan="5"><hr></td></tr>
    <tr><th>Item</th><th>Details</th><th>Price</th><th>Quantity</th><th>Item Total</th></tr>
    <tr><td colspan="5"><hr></td></tr>
  `

  myCart.forEach(cartItem => {
    const { name, variant, price, quantity, image, calories } = cartItem
    const itemTotal = price * quantity

    receipt += `
    <tr>
      <td>${name}</td>
      <td>${variant}</td>
      <td>$${twoDecimalPlaces(price)}</td>
      <td style="text-align:center;">${quantity}</td>
      <td style="text-align:right;">$${twoDecimalPlaces(itemTotal)}</td>
    </tr>`
  })
  receipt += `
    <tr><td colspan="5"><hr></td></tr>
    <tr> <td> </td><td> </td><td> </td><td style="text-align:right;"><strong>Subtotal:</strong></td><td style="text-align:right;">$${twoDecimalPlaces(
      cart.totals.subtotal
    )}</td></tr>
    <tr> <td> </td><td> </td><td> </td><td style="text-align:right;"><strong>Tax:</strong></td><td style="text-align:right;">$${twoDecimalPlaces(
      cart.totals.tax
    )}</td></tr>
    <tr> <td> </td><td> </td><td> </td><td style="text-align:right;"><strong>Total:</strong></td><td style="text-align:right;">$${twoDecimalPlaces(
      cart.totals.total
    )}</td></tr>
    <tr><td colspan="5"><hr></td></tr>
    <tr> <td> </td><td> </td><td> </td><td style="text-align:right;"><strong>Debit Tend:</strong></td><td style="text-align:right;">$${twoDecimalPlaces(
      cart.totals.total
    )}</td></tr>
    <tr> <td> </td><td> </td><td> </td><td style="text-align:right;"><strong>Change Due:</strong></td><td style="text-align:right;">$0.00</td></tr>
  </table>

  <p><h2 style="text-align:center; width:100%;"><strong>Thank you for your order!</h2></strong></p>
  <p style="text-align:center; width:100%;">${formattedDate}&emsp;&nbsp;${formattedTime}</p>`

  return receipt
}

//@ts-check

import { Cart } from "../cart"
import { twoDecimalPlaces } from "../utils/global"
import { newPopup } from "../utils/global"
import { updateOrderNumber } from "../pages/order-complete-page"


/**
 * @param {Cart} cart
 */
export function generateReceipt(cart) {
    
    const mycart = cart.getCart()
    const orderNumber =  $('#order-number').text()

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString()
    const formattedTime = currentDate.toLocaleTimeString()

    let receipt =  `<p><h2 style="text-align:center; margin-right: 950px;"><strong>Chaser's Cafe</h2></strong></p>`
    receipt +=  `<p><h3 style="text-align:center; margin-right: 950px;"><strong>Spartanburg Community College</h3></strong></p>`
    receipt +=  `<p><h4 style="text-align:center; margin-right: 950px;"><strong>107 Community College Dr.<br>Spartanburg, SC 29303</h4></strong></p>`
    receipt += '<table style="border-collapse: separate; border-spacing: 10px">'
    receipt += `<tr> <td> </td><td> </td><td> </td><td style="text-align:right;"><strong>Order#:</strong></td><td style="text-align:left;">${orderNumber}</td></tr>`
    receipt += '<tr><td colspan="5"><hr></td></tr>'
    receipt += '<tr><th>Item</th><th>Details</th><th>Price</th><th>Quantity</th><th>Item Total</th></tr>'
    receipt += '<tr><td colspan="5"><hr></td></tr>'

    mycart.forEach(cartItem => {
    const { name, variant, price, quantity, image, calories } = cartItem
    const itemTotal = price * quantity

    receipt += '<tr>'
    receipt += `<td>${name}</td>`
    receipt += `<td>${variant}</td>`
    receipt += `<td>$${twoDecimalPlaces(price)}</td>`
    receipt += `<td style="text-align:center;">${quantity}</td>`
    receipt += `<td style="text-align:right;">$${twoDecimalPlaces(itemTotal)}</td>`
    receipt += '</tr>'
    })
    receipt += '<tr><td colspan="5"><hr></td></tr>'
    receipt += `<tr> <td> </td><td> </td><td> </td><td style="text-align:right;"><strong>Subtotal:</strong></td><td style="text-align:right;">$${twoDecimalPlaces(cart.totals.subtotal)}</td></tr>`
    receipt += `<tr> <td> </td><td> </td><td> </td><td style="text-align:right;"><strong>Tax:</strong></td><td style="text-align:right;">$${twoDecimalPlaces(cart.totals.tax)}</td></tr>`
    receipt += `<tr> <td> </td><td> </td><td> </td><td style="text-align:right;"><strong>Total:</strong></td><td style="text-align:right;">$${twoDecimalPlaces(cart.totals.total)}</td></tr>`
    receipt += '<tr><td colspan="5"><hr></td></tr>'
    receipt += `<tr> <td> </td><td> </td><td> </td><td style="text-align:right;"><strong>Debit Tend:</strong></td><td style="text-align:right;">$${twoDecimalPlaces(cart.totals.total)}</td></tr>`
    receipt += `<tr> <td> </td><td> </td><td> </td><td style="text-align:right;"><strong>Change Due:</strong></td><td style="text-align:right;">$0.00</td></tr>`
    receipt += '</table>'
    receipt +=  `<p><h2 style="text-align:center; margin-right: 950px;"><strong>Thank you for your order!</h2></strong></p>`
    receipt += `<p style="text-align:center; margin-right: 950px;">${formattedDate}&emsp;${formattedTime}</p>`
    return receipt
  }
  
  
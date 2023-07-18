//@ts-check
import { Cart } from '../cart'
import { generateTicket } from './generateTicket'

// generates html for cooks and staff to view order

/** @param {Cart} cart */
export function printTicket(cart) {
  // Generate the receipt content
  const ticketContent = generateTicket(cart)

  // Create a hidden iframe to load the receipt content
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  document.body.appendChild(iframe)

  // Load the receipt content into the iframe
  const doc = iframe.contentDocument || iframe.contentWindow.document
  doc.write(ticketContent)
  doc.close()

  // Wait for the content to be fully loaded and
  iframe.onload = function () {
    // Print the iframe content
    // show ticket on pepper
    // iframe.contentWindow.print()

    // Put Code here to send the html to the kitchen
    //

    // Remove the iframe from the DOM
    document.body.removeChild(iframe)
  }
}

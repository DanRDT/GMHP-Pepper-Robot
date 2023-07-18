//@ts-check
import { Cart } from "../cart"
import { generateTicket } from "./generateTicket"

/**
 * @param {Cart} cart
 */
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

  // Wait for the content to be fully loaded
  iframe.onload = function () {
    // Print the iframe content
    iframe.contentWindow.print()

    // Remove the iframe from the DOM
    document.body.removeChild(iframe)
  }
}



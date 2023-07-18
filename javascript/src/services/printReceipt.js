//@ts-check
import { Cart } from '../cart'
import { generateReceipt } from './generateReceipt'

/**
 * @param {Cart} cart
 */
export function printReceipt(cart) {
  // Generate the receipt content
  const receiptContent = generateReceipt(cart)
  // const receiptWindow = window.open('', '_blank')
  // receiptWindow.document.open()
  // receiptWindow.document.write(
  //   receiptContent +
  //     '<a href="javascript:window.close();" style="width:100%; text-align:center; display:inline-block;">close</a>'
  // )
  // receiptWindow.document.close()

  // Create a hidden iframe to load the receipt content
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  document.body.appendChild(iframe)

  // Load the receipt content into the iframe
  const doc = iframe.contentDocument || iframe.contentWindow.document
  doc.write(receiptContent)
  doc.close()

  // Wait for the content to be fully loaded
  iframe.onload = function () {
    // Print the iframe content
    iframe.contentWindow.print()

    // Remove the iframe from the DOM
    document.body.removeChild(iframe)
  }
}

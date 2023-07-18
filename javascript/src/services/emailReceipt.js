//@ts-check
//This code is for template purposes only. Code is not functional at the moment.

import { Cart } from "../cart"
import { generateReceipt } from "./generateReceipt"

/**
 * @param {Cart} cart
 */
//Email Receipt
/*
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')

export function emailReceipt(customerEmail,cart) {

  const receipt = generateReceipt(cart)

  const msg = {
    to: customerEmail,
    from: 'sccchasercafe@gmail.com',
    subject: "Your Chaser's Cafe Order Receipt",
    text: receipt,
    html: '<p>This is the HTML version of the email</p>'
  }
  
  sgMail.send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}
*/
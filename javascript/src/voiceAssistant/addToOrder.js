/**
 * @param {Cart} cart
 * @param {QiSessionConnection} session */
export function addItemToOrderVoiceAssistant(cart, session) {
  /** @param {[string, number]} data */
  function handlePhraseHeard(data) {
    // destructure index 0 and 1 from data as separate variables
    const [value, confidence] = data
    // if confidence is bellow 0.45 return from the function early
    if (confidence < 0.45) return

    // Check for value in code and run relevant code
    switch (value) {
      // TODO
      case 'What would you recommend':
        break
      default:
        //TODO
        // Check if value is one of the menu items and run code if so
        break
    }
  }

  // set function to be run when phrase heard
  session.setSpeechRecognitionFunc(handlePhraseHeard)
  // loops thru menu items and creates new array of just the item names
  const itemNames = menuItems.map(item => item.name)
  // create array of strings including itemNames and others
  const phrases = [...itemNames, 'What would you recommend']
  // start listening for phrases
  session.changePhrases(itemNames, false, 25)
}

/**
 * @param {Cart} cart
 * @param {QiSessionConnection} session */
export function addItemToOrderVoiceAssistant(cart, session) {
  
  session.performSpeech('I would be happy to help you with your order.')
  
  let casestatus = 0
  let recommendedSpecialName
  let itemCard
  let itemName
  
  /** @param {[string, number]} data */
  function handlePhraseHeard(data) {
    // destructure index 0 and 1 from data as separate variables
    const [value, confidence] = data
    // if confidence is bellow 0.45 return from the function early
    if (confidence < 0.45) return

    // Check for value in code and run relevant code
    switch (true) {
      // TODO
      case value === 'What would you recommend':
         recommendedSpecialName = getRecommendedItem()
         // select the item card with the id that corresponds to the recommended special
         itemCard = $(`#${recommendedSpecialName}`)
         // navigate to item page
         goToItemPage(itemCard)
         casestatus = 1
         break

      case value.startsWith('I want to order a '):
          itemName = value.slice(17); // remove 'I want to order a ' from the start
          itemCard = $(`#${itemName}`)
          goToItemPage(itemCard)
          session.performSpeech('Did you want to order a ' + itemName)
          casestatus = 2
          break     

      case value === 'Add to cart':
          if (casestatus === 1){
             cart.addItem(recommendedSpecialName)
            }
          else if (casestatus === 2){
            cart.addItem(itemName)
           }
          break

      case value === 'No that is not what I am looking for':
          session.performSpeech('Sorry about that, please let me know how i can assist you') 
          navigateToPage('item-page')
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
  const itemPhrases = itemNames.map(item => 'I want to order a ' + item);
  const dailySpecialsArray = dailySpecials.map(item => item.name)
  // create array of strings including itemNames and others
 
  const phrases = [
    ...itemNames,
    ...dailySpecialsArray,
    ...itemPhrases,
    'What would you recommend',
    'No that is not what I am looking for',
    ]
  // start listening for phrases
  session.changePhrases(phrases, false, 25)
}

function recommendRandomSpecial() {
  const dailySpecialsArray = dailySpecials.map(item => item.name)
  const randomIndex = Math.floor(Math.random() * dailySpecialsArray.length)
  const randomSpecial = dailySpecialsArray[randomIndex]
  return randomSpecial
}

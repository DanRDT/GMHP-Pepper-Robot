import { menuItems, dailySpecials } from '../data/menu'   // Import the required menu items and daily specials

let itemCard;                                           // These variables will hold the information throughout the lifecycle
let selectedVariant;

export function addItemToOrderVoiceAssistant(cart, session) {  // Main function starts here. It accepts cart and session as parameters
  session.onPhraseHeard(async (data) => {               // Listener for the event when a phrase is heard by the Pepper bot
    const [value, confidence] = data;                   // Destructure the array to get the value of the phrase and confidence score

    if (confidence < 0.45) return;                      // If the confidence score is too low (less than 0.45), it returns and exits the function

    let casestatus = value.toLowerCase();               // Convert the heard phrase to lowercase to make it easier for comparison

    switch (true) {                                     // A switch-case is used to check the phrase against certain conditions

      case casestatus.startsWith('i want to order a '): // If the user wants to order a specific item, this case runs
        let itemName = casestatus.slice(18);            // Extract the item name from the phrase
        let menuItem = menuItems.find(item => item.name.toLowerCase() === itemName); // Find the item in the menu
        if (!menuItem) {                                // If the item is not found, Pepper bot will apologize and the function will return
          session.performSpeech('Sorry, I could not find the item ' + itemName);
          return;
        }
        itemCard = menuItem;                            // If the item is found, save it to the itemCard variable
        goToItemPage(itemCard);                          // Navigate to the item's page
        session.performSpeech('You have selected ' + itemName);  // Pepper bot confirms the selection
        itemVariantSelection(itemCard, cart, session);  // Call a function to handle item variant selection
        break;

      case casestatus === 'what would you recommend':   // If the user asks for a recommendation, this case runs
        let recommendedSpecialName = recommendRandomSpecial();  // Call a function to get a random special
        let recommendedSpecial = dailySpecials.find(item => item.name === recommendedSpecialName); // Find the special in the daily specials
        itemCard = recommendedSpecial;                  // If the special is found, save it to the itemCard variable
        goToItemPage(itemCard);                          // Navigate to the special's page
        session.performSpeech('Did you want to order ' + recommendedSpecialName + '?');  // Pepper bot suggests the special
        itemVariantSelection(itemCard, cart, session);  // Call a function to handle item variant selection
        break;

      case casestatus === 'add to cart':                // If the user wants to add the current item to the cart, this case runs
        if (itemCard && selectedVariant) {              // If an item has been selected and its variant has been chosen, it gets added to the cart
          addItemToCart(itemCard, selectedVariant);
          session.performSpeech(selectedVariant + ' of ' + itemCard.name + ' has been added to your cart.');  // Pepper bot confirms the action
          itemCard = null;                              // Clear the itemCard and selectedVariant variables for the next item
          selectedVariant = null;
        } else {                                        // If no item has been selected, Pepper bot will ask the user to select an item first
          session.performSpeech("There's no selected item or variant to add to the cart. Please select an item and its variant first.");
        }
        break;

      default:                                          // If the heard phrase doesn't match any of the above cases, Pepper bot will ask the user to repeat
        session.performSpeech("Sorry, I didn't understand that. Could you please repeat?");
        break;
    }
  });
}

function recommendRandomSpecial() {                     // This function gets a random special from the daily specials
  const dailySpecialsArray = dailySpecials.map(item => item.name);
  const randomIndex = Math.floor(Math.random() * dailySpecialsArray.length);
  const randomSpecial = dailySpecialsArray[randomIndex];
  return randomSpecial;
}

async function itemVariantSelection(itemCard, cart, session) {  // Function to handle the selection of an item variant
  let variants = itemCard.variants;
  
  if (variants.length === 1) {                                // If the item has only one variant, it gets selected automatically
    session.performSpeech('Would you like to add ' + itemCard.name + ' to the cart?');
    selectedVariant = variants[0];
  } else {                                                     // If the item has multiple variants, Pepper will list them and then listen for the user's choice
    let variantsList = variants.map((variant, index) => `${index + 1}. ${variant}`).join(', ');
    session.performSpeech(`Which variant would you like? We have: ${variantsList}`);
    await session.setSpeechRecognitionFunc((data) => {
      const [value, confidence] = data;
      if (confidence < 0.45) return;
      let variantIndex = parseInt(value) - 1;
      if (variantIndex >= 0 && variantIndex < variants.length) {
        selectedVariant = variants[variantIndex];
        session.performSpeech('Would you like to add ' + selectedVariant + ' to the cart?');
      } else {
        session.performSpeech("I'm sorry, I didn't understand that. Please choose a variant by its number.");
      }
    });
    // listen for numbers only, for 10 seconds
    session.listenForPhrases(Array.from({ length: variants.length }, (_, i) => (i + 1).toString()), false, 10);
  }
}

function goToItemPage(itemData) {
  const item = this.menu.findItemByName(itemData.name);

  $('#item-image').attr('src', `./resources/images/${item.image}`);
  $('#item-name').text(item.name);
  $('#item-variant').text(item.variant);
  $('#item-price').text(item.price);
  $('#item-calories').text(item.calories);

  // Remove old variants from previous item
  $('#item-variants-container').empty();
  
  // Add all variants for this item
  item.variants.forEach((variant) => {
      $('#item-variants-container').append(variantComponent(variant));
  });

  // Change to the item page
  displayPage('item');
}

function addItemToCart(_item, selectedVariant) {
  const item = this.menu.findItemByName(_item.name);
  // Assuming quantity is a predefined value, like 1. If the quantity is 
  // variable, it should be passed as a parameter to the function.
  const quantity = 1;

  this.cart.addToCart({
      name: foundItem.name,
      variant: selectedVariant,
      price: foundItem.price,
      quantity: quantity,
      image: foundItem.image,
      calories: foundItem.calories
  });

  // Update cart UI
  this.cart.updateCartUI();
}
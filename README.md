# GMHP-Pepper-Robot

This project is a Pepper Robot project that is designed to be used in a cafe environment to take orders from customers. The robot's tablet will display an interactive javascript app that will allow the customer to order food and drinks. The app also has a voice assistant button that when pressed will allow the customer to order by just talking to the robot.

## Authors

---

Daniel Pulber

Giuseppe Marchuk

Kelly Green

Michelle Holgerson

Alvaro Huerta-Flores

---

## How to run

Make sure you have `NodeJs` and `npm` installed on your device first.

Step 1: Open folder in terminal

Step 2: Run `cd javascript` to enter the javascript folder

Step 3: Run `npm install` to install the `node_modules`

Step 4: Run `npm run build` to run webpack and babel. This will build the bundled javascript file. The file will be put in `project/html/` as `app.js`

Step 5: Open the `project.pml` file in Choregraphe and click yes for any prompts that may appear

Step 6: Connect to the robot and run the `behavior.xar` file. This will run the behavior and open the `index.html` on the robot tablet.

Important: If you make any changes to the code in the `javascript` folder you will need to run `npm run build` again to build the bundled javascript file again and see the changes reflected.

## How to setup menu items

Step 1: Open the `menu.js` file in the `javascript/src/data/` folder and delete everything in it.

Step 2: Open the `templateMenu.js` file in the `javascript/src/data/` folder and copy the contents of the file into the `menu.js` file.

Step 3: Now add the menu items to the `menu.js` file by following steps 1-5 in the code you copied from `templateMenu.js`. Be sure to follow the [Data Rules](#data-rules) below. Use the `exampleMenu.js` file as a reference.

### Data Rules

A menu Item should be and object with the following properties:

```typescript
{
  name: string
  variants: {
    name: string
    price: number
    calories: number
    image: string
  }
  ;[]
}
```

- name: The name of the menu item - type: String

- variants: An array (min length is 1) of objects that contain the following properties:

  - name: The name of the variant. View the [Variant Name Rules](#variant-name-rules) for more details - type: String

  - price: The price of the variant - type: Number

  - calories: The calories of the variant - type: Number

  - image: The image of the variant. View the [Images Rules](#image-rules) for more details - type: String

  Example

  ```javascript
  {
    name: 'Example Pizza',
    variants: [
      {
        name: 'Small',
        price: 4.0,
        calories: 350,
        image: 'menu/pizza.jpg',
      },
      {
        name: 'Medium',
        price: 6.0,
        calories: 550,
        image: 'menu/pizza.jpg',
      },
      {
        name: 'Large',
        price: 8.0,
        calories: 750,
        image: 'menu/pizza.jpg',
      },
    ],
  }
  ```

#### Variant Name Rules

The variant name should be a string that is the name of the variant. For example, if you have a chicken sandwich you could have a regular variant and a no pickles variant. The regular variant name would be `"Regular"` and the no pickles variant name would be `"No Pickles"`.

If there is only one variant for a menu item then the variant name should an empty string ~ `""`.

If your variants are different size like small, medium, and large, don't put "S", "M", or "L" as the variant name. Instead put the full name of the variant like "Small", "Medium", or "Large". This is because the robot won't be able to understand the abbreviations. The item page will automatically convert small, medium, etc. to "S", "M", etc. for the buttons.

Heres a list of supported size values that will be converted to abbreviations:

- '3X Small' => '3XS'
- '2X Small' => 'XXS'
- 'Extra Small' => 'XS'
- 'Small' => 'S'
- 'Medium' => 'M'
- 'Large' => 'L'
- 'Extra Large' => 'XL'
- '2X Large' => 'XXL'
- '3X Large' => '3XXL'

#### Image Rules

The image property should be a string that is the path to the image starting with `menu/` and ending with the image name and type (Example: `menu/pizza.png`). The image should be in the `project/html/resources/images/menu/` folder. Feel free to delete any images you don't need from the folder. You can use the same image for multiple variants.

## Other

### Running on PC Browser

To open pepper webpage code on browser instead of pepper tablet, open [http://pepper.local/apps/.lastUploadedChoregrapheBehavior/index.html](http://pepper.local/apps/.lastUploadedChoregrapheBehavior/index.html) in your browser.

Default Credentials

Username: "nao"

Password: "nao"

### Running on Pepper without PC

After connecting and running the software, you can your change your PC's wifi connection and it will continue to run the app on its own. Then you can close the choreograph app and now the app if fully self sufficient.

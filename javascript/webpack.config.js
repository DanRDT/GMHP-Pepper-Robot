const path = require('path')
const { EnvironmentPlugin } = require('webpack')

// exports final file to /project/html/app.js
module.exports = {
  plugins: [
    new EnvironmentPlugin({
      EMAIL_HOST: 'smtp-mail.outlook.com', // Email smtp server address
      EMAIL_USERNAME: '', // Email address from which your sending
      EMAIL_PASSWORD: '', // Password for that email
      ORDERS_API: '', // Where to send orders in json format after order was completed
    }),
  ],
  entry: './src/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../project/html'),
    environment: {
      // The environment supports arrow functions ('() => { ... }').
      arrowFunction: false,
      // The environment supports BigInt as literal (123n).
      bigIntLiteral: false,
      // The environment supports const and let for variable declarations.
      const: false,
      // The environment supports destructuring ('{ a, b } = obj').
      destructuring: false,
      // The environment supports an async import() function to import EcmaScript modules.
      dynamicImport: false,
      // The environment supports an async import() when creating a worker, only for web targets at the moment.
      dynamicImportInWorker: false,
      // The environment supports 'for of' iteration ('for (const x of array) { ... }').
      forOf: true,
      // The environment supports 'globalThis'.
      globalThis: true,
      // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
      module: false,
      // The environment supports optional chaining ('obj?.a' or 'obj?.()').
      optionalChaining: false,
      // The environment supports template literals.
      templateLiteral: false,
    },
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
}

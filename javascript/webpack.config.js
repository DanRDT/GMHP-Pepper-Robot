const path = require('path')

// exports final file to /project/html/app.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../project/html'),
  },
  mode: 'production',
}

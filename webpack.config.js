const path = require('path');

module.exports = {
  mode: 'development',
  entry: './public/assets/scripts/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  devtool: 'eval-source-map'
};
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './public/assets/scripts/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  devtool: 'eval-source-map'
};
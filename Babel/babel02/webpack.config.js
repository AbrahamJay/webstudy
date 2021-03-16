const path = require('path');
module.exports = {
  // entry: ['@babel/polyfill', './a.js'],
  entry: ['core-js/stable', 'regenerator-runtime/runtime', './a.js'],
  output: {
    filename: 'b.js',
    path: path.resolve(__dirname, '')
  },
  mode: 'development'
};
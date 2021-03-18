const path = require('path');
module.exports = {
  // entry: ['./polyfill.js', './main.js'],
  // entry: ['@babel/polyfill', './main.js'],
  entry: ['core-js/stable', 'regenerator-runtime/runtime', './main.js'],
  output: {
    filename: 'compiled.js',
    path: path.resolve(__dirname, '')
  },
  mode: 'development'
};
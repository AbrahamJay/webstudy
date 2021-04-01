"use strict";

require("core-js/modules/es.promise.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.array.flat.js");

// import '@babel/polyfill'
var fn = function fn(num) {
  return num + 2;
};

var promise = Promise.resolve('ok');
console.log(promise);
[1, [2, [3, 4]]].flat();

"use strict";

var fn = function fn(num) {
  return num + 2;
};

var result = [1, 2, 3, 4].includes(function (item) {
  return item > 2;
});
console.log(result);
var promise = Promise.resolve('ok');

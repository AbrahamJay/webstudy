"use strict";

// 直接在html文件引入Babel官方的polyfill.js脚本文件
var fn = function fn(num) {
  return num + 2;
};

var result = [1, 2, 3, 4].includes(function (item) {
  return item > 2;
});
console.log(result);
var promise = Promise.resolve('ok');

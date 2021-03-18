"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

// import '@babel/polyfill'
var array = [1, 2, 3, 4];
array.includes(function (item) {
  return item > 2;
});

var Person = function Person() {
  (0, _classCallCheck2["default"])(this, Person);
};

var Person2 = function Person2() {
  (0, _classCallCheck2["default"])(this, Person2);
};

var promise = _promise["default"].resolve('ok');

[1, [2, [3, 4]]].flat();
typeof a === "undefined" ? "undefined" : (0, _typeof2["default"])(a);

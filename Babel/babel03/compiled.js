"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

// import '@babel/polyfill'
var array = [1, 2, 3, 4];
(0, _includes["default"])(array).call(array, function (item) {
  return item > 2;
});

var Person = function Person() {
  (0, _classCallCheck2["default"])(this, Person);
};

var Person2 = function Person2() {
  (0, _classCallCheck2["default"])(this, Person2);
};

typeof a === "undefined" ? "undefined" : (0, _typeof2["default"])(a);

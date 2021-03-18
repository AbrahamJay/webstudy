// 在前端工程的入口文件里引入polyfill.js
// import './polyfill.js';

//  在前端工程的入口文件里引入@babel/polyfill
// import '@babel/polyfill';

// 在前端工程的入口文件里引入core-js/stable与regenerator-runtime/runtime
// import "core-js/stable";
// import "regenerator-runtime/runtime";

const fn = (num) => num + 2;

const result = [1, 2, 3, 4].includes(item => item > 2)

console.log(result)

var promise = Promise.resolve('ok')

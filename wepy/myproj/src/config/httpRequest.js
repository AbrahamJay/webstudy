
const request = (options) => {
  return new Promise((resolve, reject) => {
    console.log(options)
    wx.request({
      url: `localhost:8080${options.url}`,
      method: options.method || 'GET',
      data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
      header: {
        'Content-Type': 'application/json; charset=UTF-8',
        'x-token': 'x-token'  // 看自己是否需要
      },
      success(request) {
        console.log(request)
        if (request.data.code === 2000) {
          resolve(request.data)
        } else {
          reject(request.data)
        }
      },
      fail(error) {
        console.log(error)
        reject(error.data)
      }
    })
  })
}

const http = (options = {}) => {
  return request(options)
}
export default http
// const get = (url, options = {}) => {
//   return request(url, { method: 'GET', data: options })
// }

// const post = (url, options) => {
//   return request(url, { method: 'POST', data: options })
// }

// const put = (url, options) => {
//   return request(url, { method: 'PUT', data: options })
// }

// // 不能声明DELETE（关键字）
// const remove = (url, options) => {
//   return request(url, { method: 'DELETE', data: options })
// }

// module.exports = {
//   get,
//   post,
//   put,
//   remove
// }

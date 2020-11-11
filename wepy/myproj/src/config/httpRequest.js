
const http = (options = {}) => {
  return new Promise((resolve, reject) => {
    console.log(options)
    wx.request({
      url: `http://localhost:8080${options.url}`,
      method: options.method || 'GET',
      data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
      header: {
        'Content-Type': 'application/json;charset=UTF-8',
        'x-token': 'x-token'  // 是否需要
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
        reject(error.errMsg)
      }
    })
  })
}

export default http

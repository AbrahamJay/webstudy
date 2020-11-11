/**
 * @desc 自定义错误类
 * @param {String} msg 自定义错误信息
 * @param {Int} code 自定义错误码
 * @param {Int} status 自定义请求错误码 200... 400... 500...等
 */
class HttpException extends Error {
  constructor (msg = '服务器内部错误', code = 10000, status = 400) {
    super()
    this.msg = msg
    this.code = code
    this.status = status
  }
}

/**
 * @desc (已知错误)参数类型错误子类
 * @param {String} msg 自定义错误信息
 * @param {Int} code 自定义错误码
 */
class ParameterException extends HttpException {
  constructor (msg, code) {
    super()
    this.status = 400
    this.msg = msg || '参数错误'
    this.code = code || 10000
  }
}

module.exports = {
  HttpException,
  ParameterException
}
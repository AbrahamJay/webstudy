const { HttpException } = require("../core/http-exception")

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // 开发环境 生产环境
    if (global.config.environment === 'dev') {
      throw error
    }
    // 已知异常
    if (error instanceof HttpException) {
      ctx.body = {
        msg: error.msg,
        code: error.code,
        request_url: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.status
    } else {
      // 未知异常
      ctx.body = {
        msg: '服务器内部错误，请联系管理员',
        code: 99999,
        request_url: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError
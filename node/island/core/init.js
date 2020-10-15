const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager {
  // 入口方法
  static initCore (app) {
    InitManager.app = app
    InitManager.initLoadRouter()
  }
  // 初始化路由
  static initLoadRouter () {
    const apiRirectory = `${process.cwd()}/node/island/app/api`
    requireDirectory(module, apiRirectory, {
      visit: whenLoadModule
    })
    function whenLoadModule (obj) {
      if (obj instanceof Router) {
        // 路由注册
        InitManager.app.use(obj.routes())
      }
    }
  }
}

module.exports = InitManager
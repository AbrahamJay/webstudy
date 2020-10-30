const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager {
  // 入口方法
  static initCore (app) {
    InitManager.app = app
    InitManager.initLoadRouter()
    InitManager.loadConfig()
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
  // 配置文件挂载到全局
  static loadConfig (path = '') {
    const configPath = path || `${process.cwd()}/node/island/config/config`
    const config = require(configPath)
    global.config = config
  }
}

module.exports = InitManager
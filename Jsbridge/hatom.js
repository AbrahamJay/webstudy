import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
  routes: []
})
const vueRouter = {};
['match', 'init', 'beforeEach', 'beforeResolve', 'afterEach', 'onReady', 'onError', 'push', 'replace', 'go', 'back', 'forward', 'getMatchedComponents', 'resolve', 'addRoutes'].forEach(method => {
  vueRouter[method] = (...args) => {
    router[method](...args)
  }
})
function setupWebViewJavascriptBridge (callback) {
  if (window.WebViewJavascriptBridge) {
    console.log('WebViewJavascriptBridge+++++', window.WebViewJavascriptBridge)
    callback(window.WebViewJavascriptBridge)
  } else {
    document.addEventListener(
      'WebViewJavascriptBridgeReady',
      function () {
        console.log('WebViewJavascriptBridge+++++', window.WebViewJavascriptBridge)
        callback(window.WebViewJavascriptBridge)
      },
      false
    )
  }
}
class Plugin {
  constructor () {
    // 回调函数，接收java发送来的数据
    setupWebViewJavascriptBridge(function (bridge) {
      // 默认接收
      bridge.init()
      console.log('bridge+++++', bridge)
    })
    this.router = vueRouter
    this.isMobile = getIsMobile()
  }

  /**
     * 前端注册方法供app端调用
     * @param {*} funcName 前端注册方法，与app端一致
     * @param {*} callbackFunc app端触发之后执行回调函数
     */
  setBridge (funcName, callbackFunc) {
    try {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.registerHandler(funcName, callbackFunc)
      })
    } catch {
    //   console.log(err)
    }
  }

  /**
     * @description: 调用原生插件通过native统一调用
     * @param {String} funcName 由 插件名.方法名 组成
     * @param {Function} callbackFunc 回调函数，返回JSON对象
     * @param {Object} args 调用插件传参
     * 错误回调：{"code":-1,"message":"插件方法不存在"(错误提示)}
     * 成功回调：{"code": 0,"message":"调用插件成功"} 返回插件数据
     * 区分常用插件与定制插件
     */
  native (funcName, callbackFunc, args = {}) {
    if (args && typeof args === 'object' && Object.prototype.toString.call(args).toLowerCase() === '[object object]' && !args.length) {
      args = JSON.stringify(args)
    } else {
      console.log('args不符合规范')
    }
    if (getIsMobile()) {
      window.WebViewJavascriptBridge.callHandler(
        funcName,
        args,
        (res) => {
          res = JSON.parse(res)
          if (res.code === 0) {
            return callbackFunc(res)
          } else {
            console.log(res.message)
          }
        }
      )
    } else {
      console.log(`调用插件: ${funcName}`)
    }
  }

  /**
     * 调用原生相机插件
     * @param {String} mQuality 图像质量：图像质量在0~100内，默认值为50
     * @param {String} destType 照片返回格式：DATA_URL,返回base64编码字符串;FILE_URL,返回图片文件URL,NATIVE_URL,返回图片本机URL。三种类型分别对应0，1，2，默认为1.
     * @param {String} srcType 照片调用位置：PHOTOLIBRARY，打开照片库；CAMERA，打开本机相机；SAVEDPHOTOALBUM，打开已保存的相册。三种类型分别对应0，1，2，默认为1.
     * @param {String} targetWidth 图片缩放宽度
     * @param {String} targetHeight 图片缩放高度
     * @param {String} encodingType 图片返回格式： JPEG，返回JPEG格式图像；PNG，返回PNG格式图像。两种类型分别对应0，1，默认为0
     * @param {String} mediaType 选择media类型。picture/video/allMedia,分别对应0，1，2，默认为0
     * @param {Boolean} allowEdit 是否允许编辑 true/false 默认false
     * @param {Boolean} correctOrientation 如果是横向拍摄的照片，会自动旋转到正确的方向，默认false
     * @param {Boolean} saveToPhotoAlbum 是否保存到图片库中，默认false
     */
  camera (callbackFunc, args = {}) {
    const options = {
      mQuality: args.mQuality || '50',
      destType: args.destType || '1',
      srcType: args.srcType || '1',
      targetWidth: args.targetWidth || '-1',
      targetHeight: args.targetHeight || '-1',
      encodingType: args.encodingType || '0',
      mediaType: args.mediaType || '0',
      allowEdit: args.allowEdit || false,
      correctOrientation: args.correctOrientation || false,
      saveToPhotoAlbum: args.saveToPhotoAlbum || false
    }
    this.native('CameraLauncher.takePicture', callbackFunc, options)
  }

  networkManager (callbackFunc) {
    this.native('NetworkManagerPlugin.registerNetWorkReceiver', callbackFunc)
  }
}

const hatom = new Plugin()

// 跳转多页面
hatom.router.goPage = (route) => {
  if (getIsMobile()) {
    // 调用多页面跳转插件,需要在插件初始化之后再调用
    hatom.native(
      'Router.pushPage',
      (res) => {
        console.log('调用Router.openPage成功')
      },
      route
    )
  } else {
    console.log('调用Router.pushPage')
    // 后续：设置传参默认值
    window.location.href = route.params.test
    // window.location.hash = '';
    // window.location.pathname = route.params.test;
  }
}

// 定位相关
hatom.locationInfo = {};
['getLocation', 'getLocationPermission', 'turnOffLocation'].forEach(method => {
  hatom.locationInfo[method] = (callbackFunc) => {
    hatom.native(
            `GetLocationInfoPlugin.${method}`,
            callbackFunc
    )
  }
})

// 跳转其他地图app
hatom.goMapApp = (callbackFunc, params) => {
  hatom.native(
    'GetMapAppPlugin.getMapApp',
    callbackFunc,
    params
  )
}

// 扫描二维码
hatom.scan = (callbackFunc) => {
  hatom.native(
    'BarcodeScannerPlugin.scan',
    callbackFunc
  )
}

// 视频预览/视频回放
hatom.singleRealPlay = {};
['realPlay', 'playBack'].forEach(method => {
  hatom.singleRealPlay[method] = (callbackFunc, params) => {
    hatom.native(
            `SingleRealPlay.${method}`,
            callbackFunc,
            params
    )
  }
})

// 获取登录信息
hatom.rootInfo = {};
['getRootInfo', 'redirectLogin'].forEach(method => {
  hatom.rootInfo[method] = (callbackFunc) => {
    hatom.native(
            `GetRootInfoPlugin.${method}`,
            callbackFunc
    )
  }
})

// setting 设置
hatom.setting = {};
['updateApp', 'logout', 'modifyPassword', 'gotoSetting', 'gestureSetting', 'messageSetting', 'cameraFaceRecognition', 'getStatusInfo'].forEach(method => {
  hatom.setting[method] = (callbackFunc) => {
    hatom.native(
            `SettingPlugin.${method}`,
            callbackFunc
    )
  }
})

// 多页面相关插件设置
hatom.page = {
  preload: (callbackFunc, params) => {
    hatom.native(
      'Router.preload',
      callbackFunc,
      params
    )
  },
  exit: (callbackFunc) => {
    hatom.native(
      'Router.exitWebApp',
      callbackFunc
    )
  },
  popPage: (route) => {
    if (getIsMobile()) {
      // 调用多页面跳转插件,需要在插件初始化之后再调用
      hatom.native(
        'Router.popPage',
        (res) => {
          console.log('调用Router.openPage成功')
        },
        route
      )
    } else {
      console.log('调用Router.pushPage')
      // 后续：设置传参默认值
      if (route) {
        window.location.hash = ''
        window.location.pathname = route.params.page
      } else {
        window.history.back()
      }
    }
  },
  pushPage: (route) => {
    if (getIsMobile()) {
      // 调用多页面跳转插件,需要在插件初始化之后再调用
      hatom.native(
        'Router.pushPage',
        (res) => {
          console.log('调用Router.openPage成功')
        },
        route
      )
    } else {
      console.log('调用Router.pushPage')
      console.log(route)
      // 后续：设置传参默认值
      window.location.hash = ''
      window.location.pathname = route.params.page
    }
  },
  back: (callbackFunc, params) => {
    hatom.native(
      'Router.popPage',
      callbackFunc,
      params
    )
  },
  cleanCache: (callbackFunc) => {
    hatom.native(
      'Router.cleanCache',
      callbackFunc
    )
  }
}

// 消息推送
hatom.message = {};
['startMessage', 'stopMessage'].forEach(method => {
  hatom.message[method] = (callbackFunc, params) => {
    hatom.native(
            `PushMessagePlugin.${method}Push`,
            callbackFunc,
            params
    )
  }
})

// 顶部导航栏配置
hatom.topBar = {};
['setTopBarLeftButton', 'setTopBarRightButton', 'setTopBarTitle', 'setTopBarBackground'].forEach(method => {
  hatom.topBar[method] = (callbackFunc, params) => {
    hatom.native(
            `topbar.${method}`,
            callbackFunc,
            params
    )
  }
})

// 底部导航栏配置
hatom.bottomBar = {};
['setItemConfig', 'selectItem', 'setBadge'].forEach(method => {
  hatom.bottomBar[method] = (callbackFunc, params) => {
    hatom.native(
            `bottomNavigation.${method}`,
            callbackFunc,
            params
    )
  }
})

// storage 数据存储
hatom.storage = {
  setItem: (key, value) => {
    if (getIsMobile()) {
      const obj = {}
      obj[key] = value
      hatom.native(
        'DataSharePlugin.saveData',
        (res) => {
          console.log(res)
          if (res.code === 0) {
            console.log(key, value)
          }
        },
        obj
      )
    } else {
      window.localStorage.setItem(key, value)
    }
  },
  getItem: (key, callbackFunc) => {
    console.log(window.localStorage)
    if (getIsMobile()) {
      const obj = {}
      obj[key] = key
      hatom.native(
        'DataSharePlugin.getData',
        callbackFunc,
        obj
      )
    } else {
      const res = window.localStorage.getItem(key)
      callbackFunc(res)
      // window.localStorage.getItem(key);
    }
  }
}
export default hatom

function getIsMobile () {
  const p = window.navigator.platform
  const isMobile = p.indexOf('Linux arm') > -1 || p.indexOf('iphone') > -1 || p.indexOf('Linux') > -1 || p.indexOf('iPhone') > -1
  return isMobile
}

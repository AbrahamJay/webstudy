import { wsConfig } from '@/api/config.js'
export const webSocket = {
  stompClient: null,
  pongInval: null,
  subping: null,
  subscribes: [],
  reConnectTimeout: null,
  connect: (callback) => {
    // let origin = `ws//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`
    let origin = `wss://${window.location.hostname}`
    // console.log('wsuri origin', origin)
    /* eslint-disable no-undef */
    // const wsuri = `${origin + wsConfig.url}`
    const wsuri = `${process.env.NODE_ENV === 'development' ? wsConfig.url : (origin + wsConfig.url)}`
    // let stompClient = window.Stomp.client(wsConfig.url + '?r=' + Math.random())
    console.log('wsuri', wsuri)
    let stompClient = window.Stomp.client(wsuri)
    stompClient.connect({}, function (frame) {
      console.log(wsConfig)
      // console.log('Connected: ' + frame)
      // stompClient.subscribe(webrtcConfig.apis.ping, _this.wsPingCallback);
      webSocket.stompClient = stompClient
      if (wsConfig.subscribe && wsConfig.subscribe.length > 0) {
        for (let i = 0; i < wsConfig.subscribe.length; i++) {
          let sSubscribe = wsConfig.subscribe[i]
          let submessage = stompClient.subscribe(sSubscribe, (greeting) => {
            // console.log(JSON.parse(greeting.body).content)
            // JSON.parse(greeting)
            callback.call(window, i + 1, JSON.parse(greeting.body))
          })
          webSocket.subscribes.push(submessage)
        }
      }
      if (wsConfig.ping) {
        // subscribe 接收到心跳
        webSocket.subping = stompClient.subscribe(wsConfig.ping, () => {})
      }
      if (wsConfig.pong) {
        // 发送心跳 30S一次
        webSocket.pongInval = window.setInterval(function () {
          stompClient.send(wsConfig.pong, {}, 'pong')
        }, wsConfig.pongTime)
      }
    }, function (error) {
      console.log('websocket 连接失败:', error)
      // 取消心跳定时器
      if (webSocket.pongInval) {
        window.clearInterval(webSocket.pongInval)
        webSocket.pongInval = null
      }
      // 取消订阅
      if (webSocket.subscribes && webSocket.subscribes.length > 0) {
        for (let i = 0; i < webSocket.subscribes.length; i++) {
          webSocket.subscribes[i].unsubscribe()
        }
        webSocket.subscribes = []
      }
      if (webSocket.subping) {
        webSocket.subping.unsubscribe()
        webSocket.subping = null
      }
      // 重连ws
      webSocket.wsTimeout = window.setTimeout(() => {
        webSocket.reConnect(callback)
      }, 5000)
    })
  },
  // 重连ws
  reConnect (callback) {
    // 关闭ws定时器
    if (webSocket.reConnectTimeout) {
      window.clearTimeout(webSocket.reConnectTimeout)
    }
    console.log('重连 websocket')
    webSocket.connect(callback)
  },
  disconnect: () => {
    if (webSocket.stompClient !== null) {
      webSocket.stompClient.disconnect()
    }
  }
}

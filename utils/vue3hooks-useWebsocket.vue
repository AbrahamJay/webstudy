<template>
  <div class="container">
    vue3 composable组合式api useWebsocket,<br />
    使用方式以及源代码如左侧代码示例，<br />
    useWebSocket.js可下载获取也可左侧代码最下方复制。
  </div>
</template>

<script setup>
import { watchEffect } from 'vue'
import { useWebSocket } from '@/composables/useWebSocket'

const { ws } = useWebSocket('your websocket url')
watchEffect(() => {
  if (ws.value) {
    ws.value.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log('websocket message data', data)
      // TODO 接收消息 逻辑处理
    }
  }
})
</script>

<style
  lang="scss"
  scoped
>

</style>


<!--********* useWebSocket.js  **********-->
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useWebSocket (url) {
  const ws = ref(null)
  const heartbeatInterval = 30000
  let reconnectTimer = null
  let reconnectInterval = 5000 // 重连间隔时间，单位为毫秒

  const createWebSocket = () => {
    ws.value = new WebSocket(url)
    console.log('WebSocket connected url', url)

    ws.value.onopen = () => {
      console.log('WebSocket connected')
      startHeartbeat()
    }

    ws.value.onmessage = (event) => {
      console.log('Received message:', event.data)
      // 处理收到的消息
    }

    ws.value.onclose = () => {
      console.log('WebSocket disconnected')
      stopHeartbeat()
      reconnect()
    }
  }

  const startHeartbeat = () => {
    ws.value.send('ping')

    ws.value.heartbeatTimer = setInterval(() => {
      ws.value.send('ping')
    }, heartbeatInterval)
  }

  const stopHeartbeat = () => {
    clearInterval(ws.value.heartbeatTimer)
  }

  const reconnect = () => {
    if (!reconnectTimer) {
      reconnectTimer = setInterval(() => {
        createWebSocket()
        clearInterval(reconnectTimer)
        reconnectTimer = null
      }, reconnectInterval)
    }
  }

  onMounted(() => {
    createWebSocket()
  })

  onBeforeUnmount(() => {
    if (ws.value) {
      ws.value.close()
    }
    if (reconnectTimer) {
      clearInterval(reconnectTimer)
    }
  })

  return {
    ws
  }
}

</script>

export default {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          pickerOptionsMixin: {
            shortcuts: [
              {
                text: '最近一周',
                onClick(picker) {
                  const end = new Date()
                  const start = new Date()
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                  picker.$emit('pick', [start, end])
                }
              },
              {
                text: '最近一个月',
                onClick(picker) {
                  const end = new Date()
                  const start = new Date()
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                  picker.$emit('pick', [start, end])
                }
              },
              {
                text: '最近三个月',
                onClick(picker) {
                  const end = new Date()
                  const start = new Date()
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                  picker.$emit('pick', [start, end])
                }
              }
            ]
          },
          websock: null
        }
      },
      destroyed() {
        // this.websock.close() // 离开路由之后断开websocket连接
      },
      methods: {
        initWebSocket() { // 初始化weosocket
          const wsUrl = process.env.VUE_APP_WS_API
          this.websock = new WebSocket(wsUrl)
          this.websock.onmessage = this.websocketonmessage
          this.websock.onopen = this.websocketonopen
          this.websock.onerror = this.websocketonerror
          this.websock.onclose = this.websocketclose
        },
        websocketonopen() { // 连接建立之后执行send方法发送数据
          console.log('发送数据', this.statisticsVotes)
          // 推送分组
          const message = {
            cmd: 'send_to_group',
            group_id: this.activity_id,
            message: { type: 'message', content: this.statisticsVotes.slice(-1) }
          }
          this.websocketsend(JSON.stringify(message))
          // '{"cmd":"send_to_group", "group_id":"123", "message":{"type":"message","content":123}}'
          // for (let index = 0; index < 10; index++) {
          //   setTimeout(() => {
          //     this.websocketsend(JSON.stringify(message))
          //     console.log('次数')
          //   }, 5000)
          // }
        },
        websocketonerror() { // 连接建立失败重连
          this.initWebSocket()
        },
        websocketsend(Data) { // 数据发送
          this.websock.send(Data)
        },
        websocketclose(e) { // 关闭
          console.log('断开连接', e)
        }
      }
    })
  }
}

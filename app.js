// app.js
const request = require('./http/request.js')
const Api = require('./http/api.js')
App({
  Api,                    // 向App上挂载Api
  get: request.fetch,     // 向App上挂载get方法
  post: (url, data, option) => {
    request.fetch(url, data, option)
  },                      // 向App上挂载post方法
  onLaunch() {

  },                      // 小程序启动方法
  globalData: {
    userInfo: null
  }                       // 全局对象
})

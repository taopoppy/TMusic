// app.js
const request = require('./http/request.js')
const Api = require('./http/api.js')
App({
  // // 向App上挂载Api
  // Api,
  // // 向App上挂载get方法
  // get: request.fetch,
  // // 向App上挂载post方法
  // post: (url, data, option) => {
  //   request.fetch(url, data, option)
  // },
  // 启动                 
  onLaunch() {
    wx.redirectTo({
      url: '/pages/start/index',
    })
  },
  // 全局对象
  globalData: {
    // 首页是否显示倒计时
    showStartComoponent: {
      expires: 0, 
      content: true
    },
    // 轮播图数据
    bannerData: {
      expires: 0,
      content: []
    },
    // 推荐歌单
    recommendList: {
      expires: 0,
      content: []
    }
  }
})

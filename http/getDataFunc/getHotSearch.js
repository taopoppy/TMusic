const Api = require('../api.js')
const request = require('../request.js')

// 获取热搜数据
module.exports = { 
  func: async (app, force = false) => {
    let oldData = app.globalData.hotSearch

    let forceGet = force // 是否强制请求新数据
    let firstInto = oldData.expires === 0 // 如果时间戳为0表示第一次进入小程序
    let isExpired = (Date.parse(new Date()) - oldData.expires >=0) && (oldData.expires != 0) // 为true表示数据过期了
    if(firstInto || isExpired || forceGet) {
      // 请求新数据
      console.log("getHotSearch请求新的热搜数据")
      try {
        let res = await request.fetch(Api.hotSearch(), {}, {})
        let tempBannerData = res.data.data
        if(res.statusCode === 200 && res.errMsg === "request:ok") {
          let returnData = {
            expires: Date.parse(new Date()) + 900000, // 保存15分钟
            content: tempBannerData
          }
          // 保存到app当中
          app.globalData.hotSearch = returnData
          return returnData
        }
      } catch (error) {
        console.log("getHotSearch函数catch到错误",error)
        return oldData
      }
    }
    console.log("getHotSearch返回旧的热搜数据")
    return oldData
  }
}
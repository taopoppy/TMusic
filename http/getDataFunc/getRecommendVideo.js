const Api = require('../api.js')
const request = require('../request.js')

// 获取推荐视频信息
module.exports = {
  func: async (app, force=false) => {
    let oldData = app.globalData.recommendVideoList
  
    let forceGet = force // 是否强制请求新数据
    let firstInto = oldData.expires === 0 // 如果时间戳为0表示第一次进入小程序
    let isExpired = (Date.parse(new Date()) - oldData.expires >=0) && (oldData.expires != 0) // 为true表示数据过期了
  
    if(firstInto || isExpired || forceGet) {
      // 请求新数据
      console.log("getRecommendVideoList请求新的推荐视频数据")
      try {
        let res = await request.fetch(Api.getRecommendVideList(), {
          cookie: wx.getStorageSync("wangyiyunmessage").content.cookie
        }, {})
        let tempRecommendVideoList = res.data.datas
        if(res.data.code === 200) {
          let returnData = {
            expires: Date.parse(new Date()) + 1800000, // 保存30分钟
            content: tempRecommendVideoList
          }
          // 保存到App当中
          app.globalData.recommendVideoList = returnData
          return returnData
        }
      } catch (error) {
        console.log("getRecommendVideoList函数catch到错误", error)
        return oldData
      }
    }
    console.log("getRecommendVideoList返回旧的推荐歌单数据")
    return oldData
  }
}
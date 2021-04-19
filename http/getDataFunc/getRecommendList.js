const Api = require('../api.js')
const request = require('../request.js')

// 获取推荐歌单信息
module.exports = {
  func: async (app, force=false) => {
    let oldData = app.globalData.recommendList
  
    let forceGet = force // 是否强制请求新数据
    let firstInto = oldData.expires === 0 // 如果时间戳为0表示第一次进入小程序
    let isExpired = (Date.parse(new Date()) - oldData.expires >=0) && (oldData.expires != 0) // 为true表示数据过期了
  
    if(firstInto || isExpired || forceGet) {
      // 请求新数据
      console.log("getRecommendList请求新的推荐歌单数据")
      try {
        let res = await request.fetch(Api.personalized(), {}, {})
        let tempRecommendList = res.data.result
        if(res.data.code === 200) {
          let returnData = {
            expires: Date.parse(new Date()) + 900000, // 保存15分钟
            content: tempRecommendList
          }
          // 保存到App当中
          app.globalData.recommendList = returnData
          return returnData
        }
      } catch (error) {
        console.log("getRecommendList函数catch到错误", error)
        return oldData
      }
    }
    console.log("getRecommendList返回旧的推荐歌单数据")
    return oldData
  }
}
const Api = require('./api.js')
const request = require('./request.js')

module.exports = {
  // 获取轮播图的数据
  getBannerData: async (app, force = false) => {
    let oldData = app.globalData.bannerData

    let forceGet = force // 是否强制请求新数据
    let firstInto = oldData.expires === 0 // 如果时间戳为0表示第一次进入小程序
    let isExpired = (Date.parse(new Date()) - oldData.expires >=0) && (oldData.expires != 0) // 为true表示数据过期了
    if(firstInto || isExpired || forceGet) {
      // 请求新数据
      console.log("getBannerData请求新的轮播图数据")
      try {
        let res = await request.fetch(Api.banner(), {type: 2}, {})
        let tempBannerData = res.data.banners
        if(res.statusCode === 200 && res.errMsg === "request:ok") {
          if(Array.isArray(tempBannerData)) {
            tempBannerData = tempBannerData.map(item => {
              if(item && item.pic && typeof item.pic === 'string') {
                let str = item.pic
                return {
                  ...item,
                  pic: str.replace("http:", "https:")
                }
              }
              return item
            })
          }
           let returnData = {
            expires: Date.parse(new Date()) + 900000, // 保存15分钟
            content: tempBannerData
          }
          // 保存到app当中
          app.globalData.bannerData = returnData
          return returnData
        }
      } catch (error) {
        console.log("getBannerData函数catch到错误",error)
        return oldData
      }
    }
    console.log("getBannerData返回旧的轮播图数据")
    return oldData
  },

  // 获取推荐歌单信息
  getRecommendList: async (app, force=false) => {
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
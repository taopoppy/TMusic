const Api = require('./api.js')
const fetch = require('./request.js')

module.exports = {
  // 获取轮播图的数据
  getBannerData: async (app) => {
    let oldData = app.globalData.bannerData

    if((oldData.expires === 0) || (Date.parse(new Date()) - oldData.expires >=0) ) {
      // 请求新数据
      try {
        let res = await fetch(Api.banner(), {type: 2}, {})
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
          console.log("tempBannerData", tempBannerData)
          // 保存到app当中
          app.globalData.bannerData = {
            expires: Date.parse(new Date()) + 900000,
            bannerData: tempBannerData
          }
        }
      } catch (error) {
        return oldData
      }
    }
    return oldData
  }

}
// index.js
// 获取应用实例
const app = getApp()
const Api = app.Api

Page({
  data: {
    // 轮播图数据
    bannerData: []
  },
  onLoad() {
    app.get(Api.banner(), {type: 2}, {})
    .then(res => {
      if(res.statusCode === 200 && res.errMsg === "request:ok") {
        let tempBannerData = res.data.banners
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

        this.setData({
          bannerData: tempBannerData
        })
      }
    }).catch(e => {
      console.log(e)
    })
  },
})

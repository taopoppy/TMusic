// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    // 轮播图数据
    bannerData: []
  },
  onLoad() {
    wx.hideHomeButton()
    console.log(app.globalData.bannerData)
  },
})

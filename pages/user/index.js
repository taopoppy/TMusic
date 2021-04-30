// pages/user/index.js

const { wangYiYunMessageHistory } = require('../../store/getStorageData.js')
const getData = require('../../http/getData.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAvatar: "", // 网易云用户头像
    userName: "", // 网易云用户名称
    videoList: [], // 视频数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const wangYiYunUser = wangYiYunMessageHistory.getWangYiYunMessage()
    // 获取推荐视频数据
    const tempVideoList = await getData.getRecommendVideoList(app)

    let videoListData = tempVideoList.content
    if(Array.isArray(tempVideoList.content) && tempVideoList.content.length > 0) {
      videoListData =  tempVideoList.content.filter(ele=> ele.type === 1)
    }

    if(wangYiYunUser) {
      this.setData({
        userAvatar: wangYiYunUser.content.profile.avatarUrl,
        userName: wangYiYunUser.content.profile.nickname,
        videoList: videoListData
      })
    }

  },

  // 进入视频播放页面
  playVideo(event) {
    wx.navigateTo({
      url: `/pages/avi/index?id=${event.currentTarget.dataset.id}`,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
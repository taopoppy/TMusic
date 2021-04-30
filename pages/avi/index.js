// pages/avi/index.js
const app = getApp()
const getData  =require('../../http/getData.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoInfo: {},
    videoComment: [],
    commentViewHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 拿到视频信息
    const recommedVideoList = app.globalData.recommendVideoList.content
    // 拿评论数据
    const videoComment = await getData.getVideoComment(options.id) || {}

    let tempVideoInfo = {}, 
        tempVideoComment = [],
        tempCommentViewHeight = 0

    if(Array.isArray(recommedVideoList) && recommedVideoList.length > 0) {
      let data = recommedVideoList.filter((ele)=> ele.data.vid === options.id)
      if(data) {
        tempVideoInfo = data[0]
      }
    }

    if(videoComment !== null) {
      tempVideoComment = [...videoComment.hotComments, ...videoComment.comments]
    }

    this.setData({
      videoInfo: tempVideoInfo,
      videoComment: tempVideoComment,
    })

    wx.getSystemInfo({
      success: (result) => {
        const query = this.createSelectorQuery()
        query.select('.video-view').boundingClientRect()
        query.exec((rect)=> {
          // 评论区滑动的高度为真实可用的window高度减去video高度
          // 因为存在导航栏，所以result.screenHeight表示手机屏幕长度
          // result.windowHeight表示窗口高度
          tempCommentViewHeight =  result.windowHeight - rect[0].height
          this.setData({
            commentViewHeight: tempCommentViewHeight
          })
        })
      },
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
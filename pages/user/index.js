// pages/user/index.js
const { getWangYiYunUser } = require('../../http/getData.js')
const { wangYiYunMessageHistory } = require('../../store/getStorageData.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhone: "",
    userPassword: "",
    needLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = wangYiYunMessageHistory.getWangYiYunMessage()
    if(data) {
      this.setData({
        needLogin: true
      })
    }

  },

  inputPhone(event) {
    this.setData({
      userPhone:event.detail.value
    })
  },

  inputPassword(event) {
    this.setData({
      userPassword:event.detail.value
    })
  },
  // 用户登录
  async login(event) {
    let data = await getWangYiYunUser(this.data.userPhone, this.data.userPassword)
    wx.showToast({
      title: data.message,
      icon:'none'
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
// pages/search/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: "",
    inputPlaceholder: "",
    hotSearchData: [],
    historySearchData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const hotSearchIndex = Number(options.current) || 0
    this._getHotSearchData(hotSearchIndex)
    this._getHistorySearchData()
  },
  
  // 获取热搜的数据
  _getHotSearchData(hotSearchIndex) {
    const hotSearchData = app.globalData.hotSearch.content
    const defaultInputValue = hotSearchData[hotSearchIndex]
    this.setData({
      inputPlaceholder: defaultInputValue.searchWord,
      hotSearchData: hotSearchData
    })
  },

  // 获取历史数据
  _getHistorySearchData() {

  },

  // 搜索
  bindconfirm:function(event) {
    if(event.detail.value) {
      this.setData({
        historySearchData: [event.detail.value, ...this.data.historySearchData]
      })
    }

    // 保存进入搜素历史

    // 请求接口进行搜索

  },

  // 取消按钮点击事件
  cancel(e) {
    wx.navigateBack()
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
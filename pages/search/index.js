// pages/search/index.js
const app = getApp()
const { searchHistory } = require('../../store/getStorageData.js')
const getData = require('../../http/getData.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: "",
    inputPlaceholder: "",
    hotSearchData: [], // 热搜数据
    historySearchData: [], // 搜索历史数据
    hasSearchResult: false,
    searchResult: {}
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
    this.setData({
      historySearchData: searchHistory.getAllHistories()
    })
  },

  // 回车搜索
  bindconfirm: function(event) {
    let keyword = event.detail.value || this.data.inputPlaceholder
    if(keyword) {
      this.setData({
        hasSearchResult:true
      })
      // 保存进入搜素历史
      searchHistory.saveToSearchHistory(keyword)
      // 更新搜索历史
      this._getHistorySearchData()

      // 请求接口进行搜索
      this._searchKeyword(keyword)
    }
  },

  // 点击热搜元素进行搜索
  async tapHotSearch(e) {
    let keyword = e.currentTarget.dataset.keyword
    if(keyword) {
      this.setData({
        inputValue: keyword,
        hasSearchResult:true
      })
      searchHistory.saveToSearchHistory(keyword)
      this._getHistorySearchData()
      await this._searchKeyword(keyword)
    }
  },

  // 点击历史搜索进行搜索
  async tapHistorySearch(e) {
    let keyword = e.currentTarget.dataset.keyword
    if(keyword) {
      this.setData({
        inputValue: keyword,
        hasSearchResult:true
      })
      searchHistory.changIndex(keyword) // 修改点击的历史记录到第一位
      this._getHistorySearchData()
      await this._searchKeyword(keyword)
    }
  },

  // 根据关键字搜索结果
  async _searchKeyword(keyword) {
    console.log("请求关键字")
    let res = await getData.getSearchResult(keyword)
    this.setData({
      searchResult: res
    })
  },

  // 清空输入框内容
  clearInput(e) {
    this.setData({
      inputValue: "",
      hasSearchResult:false
    })
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
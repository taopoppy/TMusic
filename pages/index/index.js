// index.js
// 获取应用实例
const app = getApp()
const getData = require('../../http/getData.js')
const { userMessageHistory,wangYiYunMessageHistory } = require('../../store/getStorageData.js')

Page({
  data: {
    // 轮播图当前显示的index
    bannerIndex: 0,
    // 轮播图数据
    bannerData: [],
    // 推荐歌单数据
    recommendData: [],
    // 热搜数据
    hotSearchData: [],
    // 用户头像
    userAvatar: ""
  },
  async onLoad(option) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })

    wx.hideHomeButton()
    if(app.globalData.showStartComoponent.content) {
      // 进入小程序，实际上先进入到index/index，这时我们不拿数据
      // 进入start/index的时候拿数据
      // 再从start/index进入到index/index的时候直接从app里拿
      // 从计时页进来不需要请求数据， 不是第一次进入首页需要去拿数据
      app.globalData.showStartComoponent = {
        expires: Date.parse(new Date()) + 1800000,  // 30分钟
        content: false
      }
    } else {
      await this.getAllData()
    }
  },

  // 请求并更新轮播图和推荐歌单的数据
  async getAllData(force = false) {
    let newBannerData = await getData.getBannerData(app, force)
    let newRecommendData = await getData.getRecommendList(app, force)
    let newHotSearchData = await getData.getHotSearch(app, force)
    let wangYiYunUser = wangYiYunMessageHistory.getWangYiYunMessage()
    let tempUserAvatar = ""
    if(wangYiYunUser && wangYiYunUser.content && wangYiYunUser.content.profile) {
      tempUserAvatar = wangYiYunUser.content.profile.avatarUrl
    }

    this.setData({
      bannerData: newBannerData.content,
      recommendData: newRecommendData.content,
      hotSearchData: newHotSearchData.content,
      userAvatar: tempUserAvatar
    })
  },

  // 下拉刷新
  onPullDownRefresh: async function(){
    console.log("正在下拉刷新")
    wx.showLoading()
    await this.getAllData(true) // 强制请求新数据
    wx.stopPullDownRefresh() // 关闭下拉动画
    setTimeout(()=> {
      wx.hideLoading()
    },500)
  },
  // 触底事件
  onReachBottom:function() {
    wx.showToast({
      title: '没有更多了',
      icon:'none'
    })
  },

  // 轮播图current修改时触发的事件
  bannerIndexChange(event) {
    const {current} = event.detail
    this.setData({
      bannerIndex: current
    })
  },


  // 跳转到搜索页
  goToSearchPage:function(e) {
    wx.navigateTo({
      url: `/pages/search/index?current=${this.data.bannerIndex}`,
    })
  },

  // 跳转到用户中心页面
  goToUserSpace:async function(e) {
    let userMessage = userMessageHistory.getUserMessage()
    if(!userMessage) {
      // 获取用户信息
      await getData.getOpenId()
    }

    // 检查用户是否授权
    if(!userMessage.content.hasAuthorize) {
      // 用户授权
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          if(res.errMsg === "getUserProfile:ok" && res.userInfo) {
            let data = res.userInfo
            data.hasAuthorize = true
            userMessageHistory.UpdateUserMessage(data)
          }
          
          this.goWhere()
        }
      })
    }else {
      this.goWhere()
    }
  },

  // 选择性的跳转
  goWhere() {
    let wangYiYunUser = wangYiYunMessageHistory.getWangYiYunMessage()
    if(!wangYiYunUser) {
      // 跳转到网易云账号登录界面
      wx.navigateTo({
        url: '/pages/login/index',
      })
    } else {
      // 跳转到用户中心界面
      wx.reLaunch({
        url: '/pages/user/index',
      })
    }
  },

  // 发送给朋友
  onShareAppMessage() {
    return {
      title: "TMusic",
      path: "/pages/index/index",
      imageUrl: "/assets/images/logo.png"
    }
  }
})

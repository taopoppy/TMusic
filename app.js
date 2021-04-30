// app.js
App({
  // 启动                 
  onLaunch() {
    wx.redirectTo({
      url: '/pages/start/index',
    })
  },
  // 设置播放音乐的ID
  setPlayMusicId(musicId) {
    this.globalData.playingMusicId = musicId
  },
  // 获取播放音乐的ID
  getPlayMusicId() {
    return this.globalData.playingMusicId
  },
  // 全局对象
  globalData: {
    // 当前正在播放音乐的ID
    playingMusicId: -1,
    // 首页是否显示倒计时
    showStartComoponent: {
      expires: 0, 
      content: true
    },
    // 轮播图数据
    bannerData: {
      expires: 0,
      content: []
    },
    // 推荐歌单
    recommendList: {
      expires: 0,
      content: []
    },
    // 推荐视频
    recommendVideoList: {
      expires: 0,
      content: []
    },
    // 热搜信息
    hotSearch: {
      expires: 0,
      content: []
    },
  }
})

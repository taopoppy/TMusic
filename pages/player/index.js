// pages/player/player.js
// 获取全局唯一的背景音频管理器
const backgroundAudioManager = wx.getBackgroundAudioManager()
const app = getApp()
const utils = require('../../utils/util.js')
const getData = require('../../http/getData.js')
const { playingList, playHistory } = require('../../store/getStorageData.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    musicId: -1,             // 歌曲ID
    picUrl: '',              // 歌曲封面
    isPlaying: false,        // false表示不播放，true表示正在播放
    isLyricShow: false,      // 表示当前歌词是否显示
    lyric: '',               // 歌词
    isSame: false,           // 表示是否为同一首歌
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._loadMusicDetail(options.musicId)
  },

  // 初始化音乐信息，并且开始播放
  async _loadMusicDetail(musicId) {
    if (musicId == app.getPlayMusicId()) {
      this.setData({
        isSame: true
      })
    } else {
      this.setData({
        isSame: false
      })
    }
    if (!this.data.isSame) {
      backgroundAudioManager.stop()
    }
    let music = await this._getMusicData(musicId)
    // 导航栏信息设置为音乐名字
    wx.setNavigationBarTitle({
      title: music.name,
    })

    // 设置音乐信息
    this.setData({
      musicId: musicId,
      picUrl: utils.transHttps(music.al.picUrl), 
      isPlaying: false,
    })

    // 设置正在播放音乐的id
    app.setPlayMusicId(musicId)

    getData.getSongUrl(musicId).then((res) => {
      // res就是获取到播放地址的对象
      if (res.url == null) {
        wx.showToast({
          title: '无权限播放',
        })
        return
      }
      if (!this.data.isSame) {
        backgroundAudioManager.src = res.url // 音乐的播放地址，当设置了新的 src 时，会自动开始播放
        backgroundAudioManager.title = music.name // 音频标题，用于原生音频播放器音频标题（必填）
        backgroundAudioManager.coverImgUrl = music.al.picUrl // 封面图 URL，用于做原生音频播放器背景图
        backgroundAudioManager.singer = music.ar[0].name // 歌手名，原生音频播放器中的分享功能
        backgroundAudioManager.epname = music.al.name // 专辑名，原生音频播放器中的分享功能

        // 保存播放历史
        playHistory.savePlayHistory(music)
      }

      this.setData({
        isPlaying: true
      })

      // 加载歌词
      getData.getSongLyric(musicId).then((res) => {
        let lyric = '暂无歌词'
        const lrc = res.lrc
        if (lrc) {
          lyric = lrc.lyric
        }
        this.setData({
          lyric
        })
      })
    })
  },

  // 请求歌曲详情
  async _getMusicData(musicId) {
    let music = await getData.getSongDetail(musicId)
    return music
  },

  // 暂停和继续播放处理
  togglePlaying() {
    if (this.data.isPlaying) {
      backgroundAudioManager.pause() // 正在播放则暂停
    } else {
      backgroundAudioManager.play()  // 正在暂停则播放
    }
    this.setData({
      isPlaying: !this.data.isPlaying
    })
  },

  // 上一首
  onPrev() {
    // 查找当前歌曲在播放列表中的index
    // 然后找到index-1歌曲信息中的musicId即可
    let tempMusicId = playingList.getPrevMusicId(this.data.musicId)
    this._loadMusicDetail(tempMusicId)
  },
  // 下一首
  onNext() {
    // 查找当前歌曲在播放列表中的index
    // 然后找到index+1歌曲信息中的musicId即可
    let tempMusicId = playingList.getNextMusicId(this.data.musicId)
    this._loadMusicDetail(tempMusicId)
  },

  // 切换歌词和封面显示
  onChangeLyricShow() {
    this.setData({
      isLyricShow: !this.data.isLyricShow
    })
  },

  // 进度条更新
  timeUpdate(event) {
    // 将进度条组件传递回来的更新时间，再传给歌词组件
    // update组件必须要再歌词组件当中定义好
    this.selectComponent('.lyric').update(event.detail.currentTime)
  },

  // 播放
  onPlay() {
    this.setData({
      isPlaying: true,
    })
  },

  // 暂停
  onPause() {
    this.setData({
      isPlaying: false,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
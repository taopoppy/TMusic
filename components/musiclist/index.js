const app = getApp()
const { playingList, userMessageHistory, wangYiYunMessageHistory } = require('../../store/getStorageData.js')
// components/musiclist/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musiclist: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    playingId: -1 // 全局正在播放的音乐的ID
  },
  // 组件所在页面被展示时执行
  pageLifetimes: {
    show() {
      this.setData({
        playingId: parseInt(app.getPlayMusicId())
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelect(event) {
      // 判断是否登录
      let weixinUser = userMessageHistory.getUserMessage()
      let wangyiyunUser = wangYiYunMessageHistory.getWangYiYunMessage()
      if(!(weixinUser && wangyiyunUser)) {
        wx.showToast({
          title: '请到首页登录',
          duration: 2000
        })
        return 
      } 
      // 事件源 事件处理函数 事件对象 事件类型
      // console.log(event.currentTarget.dataset.musicid)
      const ds = event.currentTarget.dataset
      const musicid = ds.musicid
      this.setData({
        playingId: musicid
      })

      // 点击某个歌单的一首歌，将歌单里的那10条详细的歌曲信息保存在storage当中
      playingList.saveMusicList(musicid, this.properties.musiclist)

      // 最后跳转
      wx.navigateTo({
        url: `/pages/player/index?musicId=${musicid}`,
      })
    }
  }
})

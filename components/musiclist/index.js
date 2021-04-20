const app = getApp()
const storage = require('../../store/index.js')
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
      // 事件源 事件处理函数 事件对象 事件类型
      // console.log(event.currentTarget.dataset.musicid)
      const ds = event.currentTarget.dataset
      const musicid = ds.musicid
      this.setData({
        playingId: musicid
      })

      // 点击某个歌单的一首歌，将歌单里的那10条详细的歌曲信息保存在storage当中
      let playinglist = storage.getItem("playinglist")
      let hasNewData = Array.isArray(this.properties.musiclist) && this.properties.musiclist.length > 0
      if(playinglist === "" && hasNewData) {
        // 说明要么没存过，要么过期被删除了
        storage.setItem("playinglist",[...this.properties.musiclist])
      } else if (Array.isArray(playinglist.content) && playinglist.content.length < 30 && hasNewData) {
        // 说明才保存的歌曲数量还没有到顶点30
        storage.setItem("playinglist", [...this.properties.musiclist, ...playinglist.content])
      } else if (Array.isArray(playinglist.content) && playinglist.content.length >= 30 && hasNewData) {
        // 说明storage保存的播放列表中的歌曲数量到底上限30
        let oldData = playinglist.content.slice(0, 20)
        storage.setItem("playinglist", [...this.properties.musiclist, ...oldData])
      }

      // 最后跳转
      wx.navigateTo({
        url: `/pages/player/index?musicId=${musicid}`,
      })
    }
  }
})

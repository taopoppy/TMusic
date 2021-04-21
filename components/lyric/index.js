// components/lyric/lyric.js
let lyricHeight = 0
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLyricShow: {
      type: Boolean,
      value: false,
    },
    lyric: String, // 歌词本身
  },

  observers: {
    lyric(lrc) {
      if (lrc == '暂无歌词') {
        this.setData({
          lrcList: [{
            lrc,
            time: 0,
          }],
          nowLyricIndex: -1
        })
      } else {
        this._parseLyric(lrc)
      }
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    lrcList: [], // 特殊格式的歌词：[{"lrc":"你问我爱你有多深", "time":123455}, {"lrc":"我爱你有几分", "time":1234785}]
    nowLyricIndex: 0, // 当前选中的歌词的索引
    scrollTop: 0, // 滚动条滚动的高度
  },

  lifetimes: {
    ready() {
      // 所有手机的小程序的宽度都是750rpx
      wx.getSystemInfo({
        success(res) {
          // 屏幕实际宽度 / 750 = 1rpx
          // 一行歌词为64rpx，所以lyricHeight单位为px
          lyricHeight = res.screenWidth / 750 * 64
        },
      })
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 被父组件调用的更新当前歌词显示的方法
    update(currentTime) {
      // console.log(currentTime)
      let lrcList = this.data.lrcList
      if (lrcList.length == 0) {
        return
      }
      // 处理歌曲后面没有歌词的部分时间
      if (currentTime > lrcList[lrcList.length - 1].time) {
        if (this.data.nowLyricIndex != -1) {
          this.setData({
            nowLyricIndex: -1,
            scrollTop: lrcList.length * lyricHeight
          })
        }
      }
      for (let i = 0, len = lrcList.length; i < len; i++) {
        if (currentTime <= lrcList[i].time) {
          this.setData({
            nowLyricIndex: i - 1,
            scrollTop: (i - 1) * lyricHeight
          })
          break
        }
      }
    },

    // 解析歌词
    _parseLyric(sLyric) {
      let line = sLyric.split('\n') // 歌词分为数组类型
      let _lrcList = []
      line.forEach((elem) => {
        let time = elem.match(/\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g)
        if (time != null) {
          let lrc = elem.split(time)[1]
          let timeReg = time[0].match(/(\d{2,}):(\d{2})(?:\.(\d{2,3}))?/)
          // console.log(timeReg)
          // 把时间转换为秒
          let time2Seconds = parseInt(timeReg[1]) * 60 + parseInt(timeReg[2]) + parseInt(timeReg[3]) / 1000
          _lrcList.push({
            lrc,
            time: time2Seconds,
          })
        }
      })
      this.setData({
        lrcList: _lrcList
      })
    }
  }
})
// components/playlist/index.js
const { tranNumber } = require('../../utils/util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object
  },
  /**
   * 数据监听器，对当前数据变化进行监听
   */
  observers: {
    // 下面这种写法是对playlist整个对象进行监听
    // playlist(value) {}
    
    // 下面这种写法是对playlist下面的某个属性进行监听
    ['data.playCount'](count) {
      let playCountStr = this._tranNumber(count,2)
      this.setData({
        playCount: playCountStr
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    playCount: '' // 播放数量
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 数字转化，num为数字，ponit为小数点保留位数
    _tranNumber:function(num,point) {
      return tranNumber(num, point)
    },
    // 跳转到歌单详情页
    goToMusicList:function(event) {
      wx.navigateTo({
        url: `/pages/musiclist/index?playlistId=${this.properties.data.id}`,
      })
    },
  }
})

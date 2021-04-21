// components/progress-bar/progress-bar.js
let movableAreaWidth = 0  // 可移动区域的真实宽度
let movableViewWidth = 0  // 拖拽圆点的真实宽度
const backgroundAudioManager = wx.getBackgroundAudioManager()
let currentSec = -1 // 当前的秒数
let duration = 0 // 当前歌曲的总时长，以秒为单位
let isMoving = false // 表示当前进度条是否在拖拽，解决：当进度条拖动时候和updatetime事件有冲突的问题

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isSame: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    showTime: {
      currentTime: '00:00', // 当前播放时间
      totalTime: '00:00',   // 音乐总时长
    },
    movableDis: 0,          // 进度距离
    progress: 0,            // 进度条百分比
  },

  // 在组件在视图层布局完成后执行
  lifetimes: {
    ready() {
      if (this.properties.isSame && this.data.showTime.totalTime == '00:00') {
        this._setTime()
      }
      this._getMovableDis()
      this._bindBGMEvent()
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 拖动进度条
    onChange(event) {
      if (event.detail.source == 'touch') {
        // source为touch表示人为的拖动，空字符串表示通过设置x属性自行滑动
        this.data.progress = event.detail.x / (movableAreaWidth - movableViewWidth) * 100
        this.data.movableDis = event.detail.x
        isMoving = true
        // 拖动进度条的时候音乐停止播放
        backgroundAudioManager.pause()
      }
    },

    // 拖动最终结束
    onTouchEnd() {
      const currentTimeFmt = this._dateFormat(Math.floor(backgroundAudioManager.currentTime))
      this.setData({
        progress: this.data.progress,
        movableDis: this.data.movableDis,
        ['showTime.currentTime']: currentTimeFmt.min + ':' + currentTimeFmt.sec
      })
      // 音乐播放器跳转位置
      backgroundAudioManager.seek(duration * this.data.progress / 100)
      backgroundAudioManager.play()
      isMoving = false
    },

    // 获取元素宽度
    _getMovableDis() {
      const query = this.createSelectorQuery() // 如果在page当中就是wx而不是this
      query.select('.movable-area').boundingClientRect() // 查找到class为.movable-area的节点
      query.select('.movable-view').boundingClientRect()
      query.exec((rect) => {
        movableAreaWidth = rect[0].width
        movableViewWidth = rect[1].width
      })

    },

    // 绑定背景音乐播放器的事件
    _bindBGMEvent() {
      // 播放
      backgroundAudioManager.onPlay(() => {
        isMoving = false
        this.triggerEvent('musicPlay') // 向父组件传递musicPlay事件
      })

      // 停止
      backgroundAudioManager.onStop(() => {
      })

      // 暂停
      backgroundAudioManager.onPause(() => {
        this.triggerEvent('musicPause') // 向父组件传递musicPause事件
      })

      // 等待音频加载
      backgroundAudioManager.onWaiting(() => {
      })

      // 音乐可以播放
      backgroundAudioManager.onCanplay(() => {
        // backgroundAudioManager.duration为音乐的总时长
        if (typeof backgroundAudioManager.duration != 'undefined') {
          this._setTime()
        } else {
          setTimeout(() => {
            this._setTime()
          }, 1000)
        }
      })

      // 监听音乐播放的进度
      backgroundAudioManager.onTimeUpdate(() => {
        if (!isMoving) {
          const currentTime = backgroundAudioManager.currentTime // 获取当前播放时长（2.34567）
          const duration = backgroundAudioManager.duration // 获取音乐播放总时长
          const sec = currentTime.toString().split('.')[0] // 一秒内只触发一次
          if (sec != currentSec) {
            // console.log(currentTime)
            const currentTimeFmt = this._dateFormat(currentTime)
            this.setData({
              movableDis: (movableAreaWidth - movableViewWidth) * currentTime / duration,
              progress: currentTime / duration * 100,
              ['showTime.currentTime']: `${currentTimeFmt.min}:${currentTimeFmt.sec}`,
            })
            currentSec = sec
            // 联动歌词
            this.triggerEvent('timeUpdate', {currentTime})// 向父组件传递timeUpdate事件
          }
        }
      })

      // 监听音乐播放完成（应该进入下一首）
      backgroundAudioManager.onEnded(() => {
        this.triggerEvent('musicEnd') // 向父组件传递musicEnd事件
      })

      // 监听音乐播放错误
      backgroundAudioManager.onError((res) => {
        console.error(res.errMsg)
        console.error(res.errCode)
        wx.showToast({
          title: '错误:' + res.errCode,
        })
      })
    },

    // 设置音乐总时长
    _setTime() {
      duration = backgroundAudioManager.duration
      const durationFmt = this._dateFormat(duration) // {'min': '05', 'sec': '34'}
      this.setData({
        ['showTime.totalTime']: `${durationFmt.min}:${durationFmt.sec}` // 05:34
      })
    },
    // 格式化时间
    _dateFormat(sec) {
      // 分钟
      const min = Math.floor(sec / 60)
      sec = Math.floor(sec % 60)
      return {
        'min': this._parse0(min),
        'sec': this._parse0(sec),
      }
    },
    // 补零
    _parse0(sec) {
      return sec < 10 ? '0' + sec : sec
    }
  }
})
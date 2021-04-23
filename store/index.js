module.exports = {
  // 获取存储
  getItem(key) {
    let val = wx.getStorageSync(key)
    if(Date.parse(new Date()) - val.expires >= 0) {
      this.remove(key)
      return ''
    }
    return val
  },

  // 设置存储
  setItem(key, value, time=1296000000) {
    let val = {
      expires: Date.parse(new Date()) + time, // 过期时间为15天
      content: value
    }
    wx.setStorageSync(key, val)
  },


  // 移除指定缓存
  remove(key) {
    wx.removeStorageSync(key)
  },

  // 清除所有缓存
  clear() {
    wx.clearStorageSync()
  }
}
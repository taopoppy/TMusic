module.exports = {
  // 获取存储
  getItem(key, module_name) {
    if(module_name) {
      let value  = this.getItem(module_name)
      if(value) {
        return value[key]
      }
      return ""
    } else {
      return wx.getStorageSync(key)
    }
  },

  // 设置存储
  setItem(key, value, module_name) {
    if(module_name) {
      let module_name_info = this.getItem(module_name)
      module_name_info[key] = value
      wx.setStorageSync(module_name, module_name_info)
    } else {
      wx.setStorageSync(key, value)
    }
  },

  // 清除缓存
  clear() {
    wx.clearStorageSync()
  }
}
// 网易云api
const baseUrl = "https://autumnfish.cn"

module.exports = {
  // 轮播图api
  banner: function() {
    return `${baseUrl}/banner`
  },
  // 搜索
  search: function(keyword) {
    return `${baseUrl}/search?keywords=${keyword}`
  }
}
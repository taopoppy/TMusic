// 网易云api
const baseUrl = "https://autumnfish.cn"

module.exports = {
  // 轮播图api
  banner: function() {
    return `${baseUrl}/banner`
  },
  // 搜索
  search: function(keyword) {
    return `${baseUrl}/search`
  },
  // 推荐歌单
  personalized: function() {
    return `${baseUrl}/personalized`
  }
}
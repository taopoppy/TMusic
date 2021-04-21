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
  },
  // 歌单详情
  playlistDetail: function() {
    return `${baseUrl}/playlist/detail`
  },
  // 获取歌曲播放地址
  getSongUrl: function() {
    return `${baseUrl}/song/url`
  },
  // 获取歌词
  getSongLyric: function() {
    return `${baseUrl}/lyric`
  }
}
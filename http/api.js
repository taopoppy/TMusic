// 网易云api
const { baseUrl } = require('../config.js')

module.exports = {
  // 微信请求openID
  getOpenId:function(appId, appSecret, code) {
    return `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
  },

  // 轮播图api
  banner: function() {
    return `${baseUrl}/banner`
  },
  // 搜索
  search: function() {
    return `${baseUrl}/search`
  },
  // 热搜信息
  hotSearch: function() {
    return `${baseUrl}/search/hot/detail`
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
  },
  // 获取搜索结果
  getSearchResult: function() {
    return `${baseUrl}/search/suggest`
  },
  // 获取歌曲详情
  getSongDetail: function() {
    return `${baseUrl}/song/detail`
  },
  // 用户登录
  getLoginCookie: function() {
    return `${baseUrl}/login/cellphone`
  },
  // 获取网易云用户详情
  getWangYiYunUserDetail: function() {
    return `${baseUrl}/user/detail`
  },
  // 获取每日推荐歌单
  getEveryDayMusicList: function() {
    return `${baseUrl}/recommend/resource`
  },
  // 获取每日推荐歌曲
  getEveryDayMusicList: function() {
    return `${baseUrl}/recommend/songs`
  },
  // 获取喜欢的列表
  getUserLikeList: function() {
    return `${baseUrl}/likelist`
  },
  // 获取视频推荐列表
  getRecommendVideList: function() {
    return `${baseUrl}/video/timeline/recommend`
  },
  // 获取视频评论数据
  getVideoComment: function() {
    return `${baseUrl}/comment/video`
  }
}
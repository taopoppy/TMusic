const getBannerObj = require('./getDataFunc/getBannerData.js')
const getRecommendListObj = require('./getDataFunc/getRecommendList.js')
const getPlayListDetailObj = require('./getDataFunc/getPlayListDetail.js')
const getSongUrlObj = require('./getDataFunc/getSongUrl.js')
const getSongLyricObj = require('./getDataFunc/getSongLyric.js')
const getHotSearch = require('./getDataFunc/getHotSearch.js')
const getSongDetailObj = require('./getDataFunc/getSongDetail.js')
const getSearchResultObj = require('./getDataFunc/getSearchResult.js')
const getOpenIdObj = require('./getDataFunc/getOpenId.js')
const getWangYiYunUserObj = require('./getDataFunc/getWangYiYunUser.js')
const getRecommendVideoListObj = require('./getDataFunc/getRecommendVideo.js')
const getVideoCommentObj = require('./getDataFunc/getVideoComment.js')

module.exports = {
  // 获取微信用户的openId
  getOpenId: getOpenIdObj.func,
  // 获取轮播图的数据
  getBannerData: getBannerObj.func,
  // 获取推荐歌单信息
  getRecommendList: getRecommendListObj.func,
  // 获取推荐视频信息
  getRecommendVideoList: getRecommendVideoListObj.func,
  // 获取热搜信息
  getHotSearch: getHotSearch.func,
  // 获取歌单里歌曲信息
  getPlayListDetail: getPlayListDetailObj.func,
  // 获取音乐播放地址
  getSongUrl: getSongUrlObj.func,
  // 获取音乐歌词信息
  getSongLyric: getSongLyricObj.func,
  // 获取歌曲信息
  getSongDetail: getSongDetailObj.func,
  // 获取搜索结果
  getSearchResult: getSearchResultObj.func,
  // 获取网易云账号的信息（包括id和cookid）
  getWangYiYunUser: getWangYiYunUserObj.func,
  // 获取视频评论数据
  getVideoComment: getVideoCommentObj.func
}
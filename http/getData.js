const getBannerObj = require('./getDataFunc/getBannerData.js')
const getRecommendListObj = require('./getDataFunc/getRecommendList.js')
const getPlayListDetailObj = require('./getDataFunc/getPlayListDetail.js')
const getSongUrlObj = require('./getDataFunc/getSongUrl.js')
const getSongLyricObj = require('./getDataFunc/getSongLyric.js')

module.exports = {
  // 获取轮播图的数据
  getBannerData: getBannerObj.func,
  // 获取推荐歌单信息
  getRecommendList: getRecommendListObj.func,
  // 获取歌单里歌曲信息
  getPlayListDetail: getPlayListDetailObj.func,
  // 获取音乐播放地址
  getSongUrl: getSongUrlObj.func,
  // 获取音乐歌词信息
  getSongLyric: getSongLyricObj.func
}
const getBannerObj = require('./getDataFunc/getBannerData.js')
const getRecommendListObj = require('./getDataFunc/getRecommendList.js')
const getPlayListDetailObj = require('./getDataFunc/getPlayListDetail.js')

module.exports = {
  // 获取轮播图的数据
  getBannerData: getBannerObj.func,
  // 获取推荐歌单信息
  getRecommendList: getRecommendListObj.func,
  // 获取歌单里歌曲信息
  getPlayListDetail: getPlayListDetailObj.func
}
const playingListObj = require('./getStorage/playinglist.js')
const playHistoryObj = require('./getStorage/playhistory.js')
const searchHistoryObj = require('./getStorage/searchhistory.js')
const userMessageHistoryObj = require('./getStorage/userMessage.js')

module.exports = {
  // 正在播放歌曲的缓存
  playingList: playingListObj,

  // 歌曲播放历史的缓存
  playHistory: playHistoryObj,

  // 搜索历史的缓存
  searchHistory: searchHistoryObj,

  // 用户信息的缓存
  userMessageHistory: userMessageHistoryObj
}
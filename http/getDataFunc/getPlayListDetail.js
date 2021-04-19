const Api = require('../api.js')
const request = require('../request.js')

// 获取歌单里歌曲的数据
module.exports = {
  func: async (playlistId) => {
    try {
      let res = await request.fetch(Api.playlistDetail(),{id:playlistId}, {loading:true})
      if(res.statusCode && res.statusCode === 200) {
        return res.data
      }
      return null
    } catch (error) {
      console.log("获取歌单信息失败", error) 
      return null
    }
  }
}
const Api = require('../api.js')
const request = require('../request.js')
const storage = require('../../store/index.js')


// 获取歌单里歌曲的数据
module.exports = {
  func: async (playlistId) => {
    try {
      // 1. 先去缓存中找
      let storage_music = storage.getItem("musiclist")
      if(storage_music && storage_music!== "" && storage_music.content && Array.isArray(storage_music.content)) {
        let musiclist = storage_music.content
        let data = musiclist.filter(ele => String(ele.id) === String(playlistId))
        if(data.length!==0){ 
          return data[0]
        } 
      }

      // 2. 缓存当中找不到再从网路里请求
      let res = await request.fetch(Api.playlistDetail(),{id:playlistId}, {loading:true})
      if(res.statusCode && res.statusCode === 200) {
        // 先保存到storage当中，再返回
        if(storage_music === "" && res.data.playlist) {
          storage.setItem("musiclist",[res.data.playlist])
        } else if (Array.isArray(storage_music.content) && storage_music.content.length<10) {
          storage.setItem("musiclist", [res.data.playlist, ...storage_music.content])
        } else if (Array.isArray(storage_music.content) && storage_music.content.length >= 10) {
          storage_music.content.pop()
          storage.setItem("musiclist", [res.data.playlist, ...storage_music.content])
        }
        return res.data
      }
      return null
    } catch (error) {
      console.log("获取歌单信息失败", error) 
      return null
    }
  }
}
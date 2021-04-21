const Api = require('../api.js')
const request = require('../request.js')
const storage = require('../../store/index.js')

// 根据id获取歌词
module.exports = {
  func: async (id) => {
    // 1. 先去storage当中去找
    let songsLyric = storage.getItem("songslyric")
    if(songsLyric && songsLyric !== "" && songsLyric.content) {
      let data = songsLyric.content
      if(Array.isArray(data)) {
        let lyricObj = data.find(ele => ele.id === id)
        if(lyricObj) {
          return lyricObj
        }
      }
    }
    // 2. 缓存当中找不到就去请求
    try {
      let res = await request.fetch(Api.getSongLyric(), {id: id},{})
      if(res.statusCode && res.statusCode === 200) {
        let tempLyricObj = res.data
        tempLyricObj.id = id
        // 保存到正在播放的列表数据当中
        if(songsLyric === "" && tempLyricObj) {
          storage.setItem("songslyric",[tempLyricObj])
        } else if (Array.isArray(songsLyric.content) && songsLyric.content.length<30) {
          storage.setItem("songslyric", [tempLyricObj, ...songsLyric.content])
        } else if (Array.isArray(songsLyric.content) && songsLyric.content.length >= 30) {
          let oldData = songsLyric.content.slice(0, 30)
          storage.setItem("songslyric", [tempLyricObj, ...oldData])
        }

        // 最后返回
        return tempLyricObj
      }
    } catch (error) {
      console.log("获取歌曲播放地址失败")
      return null
    }
  }
}
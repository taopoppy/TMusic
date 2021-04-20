const Api = require('../api.js')
const request = require('../request.js')
const storage = require('../../store/index.js')

// 根据id获取歌曲的播放地址
module.exports = {
  func: async (id) => {
    // 1. 先去storage当中去找
    let songsUrl = storage.getItem("songsurl")
    if(songsUrl && songsUrl !== "" && songsUrl.content) {
      let data = songsUrl.content
      if(Array.isArray(data)) {
        let urlObj = data.find(ele => ele.id === id)
        if(urlObj) { return urlObj }
      }
    }
    // 2. 缓存当中找不到就去请求
    try {
      let res = await request.fetch(Api.getSongUrl(), {id: id},{loading:true})
      if(res.statusCode && res.statusCode === 200) {
        let tempUrlObj = res.data.data[0] || null
        // 保存到正在播放的列表数据当中
        if(songsUrl === "" && tempUrlObj) {
          storage.setItem("songsurl",[tempUrlObj])
        } else if (Array.isArray(songsUrl.content) && songsUrl.content.length<30) {
          storage.setItem("songsurl", [tempUrlObj, ...songsUrl.content])
        } else if (Array.isArray(songsUrl.content) && songsUrl.content.length >= 30) {
          let oldData = songsUrl.content.slice(0, 30)
          storage.setItem("songsurl", [tempUrlObj, ...oldData])
        }

        // 最后返回
        return tempUrlObj
      }
    } catch (error) {
      console.log("获取歌曲播放地址失败")
      return null
    }
  }
}
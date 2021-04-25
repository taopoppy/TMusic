const Api = require('../api.js')
const request = require('../request.js')
const { playingList } = require('../../store/getStorageData.js')

// 根据id获取歌曲详情
module.exports = {
  func: async (musicId) => {
    // 1.先从缓存当中找
    let music = playingList.getMusicData(musicId)
    if(music !== null) {
      return music
    }
    // 2. 缓存找不到再去请求
    try {
      let res = await request.fetch(Api.getSongDetail(), {ids: musicId},{loading:true})
      if(res.statusCode && res.statusCode === 200) {
        let tempMusicObj = res.data.songs[0]
        // 保存到正在播放的列表数据当中
        playingList.saveMusicList(musicId, [tempMusicObj])

        // 最后返回
        return tempMusicObj
      }
    } catch (error) {
      console.log("获取歌曲详情失败")
      return null
    }

  }
}
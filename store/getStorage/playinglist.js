const storage = require('../index.js')

module.exports = {
  /**
   * 保存歌单的歌曲到正在播放列表中
   */
  saveMusicList: (musicid,musiclist) => {
    let playinglist = storage.getItem("playinglist")
    let hasNewData = Array.isArray(musiclist) && musiclist.length > 0
    if(playinglist === "" && hasNewData) {
      // 说明要么没存过，要么过期被删除了
      storage.setItem("playinglist",[...musiclist])
    } else if (Array.isArray(playinglist.content) && playinglist.content.length < 30 && hasNewData) {
      if(playinglist.content.findIndex(ele => ele.id == musicid) === -1) {
        // 说明才保存的歌曲数量还没有到顶点30,且播放列表中没有该歌曲
        storage.setItem("playinglist", [...musiclist, ...playinglist.content])
      }
      
    } else if (Array.isArray(playinglist.content) && playinglist.content.length >= 30 && hasNewData) {
      if(playinglist.content.findIndex(ele => ele.id == musicid) === -1) {
        // 说明storage保存的播放列表中的歌曲数量到底上限30,且播放列表中没有该歌曲
        let oldData = playinglist.content.slice(0, 20)
        storage.setItem("playinglist", [...musiclist, ...oldData])
      }
    }
  },

  // 根据musicId从platinglist缓存中找到歌曲信息返回
  getMusicData:(musicId) => {
    let playingListStorage = storage.getItem("playinglist")
    if(playingListStorage!== "") {
      let content = playingListStorage.content
      let tempData = content.find(ele => String(ele.id) == String(musicId))
      if(tempData) {
        return tempData
      }
      return null
    }
    return null
  },

  // 根据musicId获取上一个首歌曲的musicId
  getPrevMusicId:(musicId) => {
    let playingListStorage = storage.getItem("playinglist").content
    let tempMusicId = -1
    if(Array.isArray(playingListStorage)) {
      playingListStorage.find((ele, index)=> {
        if(ele.id == musicId) {
          let tempMusicIndex = index - 1 < 0 ? playingListStorage.length - 1 : index -1
          tempMusicId = playingListStorage[tempMusicIndex].id
        }
      })
    }
    return tempMusicId
  },

  // 根据musicId获取下一个首歌曲的musicId
  getNextMusicId: (musicId) => {
    let playingListStorage = storage.getItem("playinglist").content
    let tempMusicId = -1
    if(Array.isArray(playingListStorage)) {
      playingListStorage.find((ele, index)=> {
        if(ele.id == musicId) {
          let tempMusicIndex = index + 1 > playingListStorage.length - 1 ? 0 : index + 1
          tempMusicId = playingListStorage[tempMusicIndex].id
        }
      })
    }
    return tempMusicId
  }
}
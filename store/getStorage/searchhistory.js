const storage = require('../index.js')

/**
 * 修改顺序
 */
const changIndex = (keyword) => {
  let history = storage.getItem("searchhistory")
  let oldArr = history.content
  if(Array.isArray(oldArr)) {
    let index = oldArr.indexOf(keyword)
    let value = oldArr[index]
    oldArr.splice(index, 1)
    oldArr.unshift(value)
    storage.setItem("searchhistory", oldArr)
  }
}

/**
 * 保存搜素关键词进入缓存
 */
const saveToSearchHistory = (keywords) => {
  let history = storage.getItem("searchhistory")
  if(history === "" && keywords) {
    storage.setItem("searchhistory",[keywords])
  } else if (Array.isArray(history.content) && history.content.length<10) {
    if(history.content.indexOf(keywords) == -1) {
      storage.setItem("searchhistory", [keywords, ...history.content])
    } else {
      changIndex(keywords)
    }
  } else if (Array.isArray(history.content) && history.content.length >= 10) {
    if(history.content.indexOf(keywords) == -1) {
      let oldData = history.content.slice(0, 10)
      storage.setItem("searchhistory", [keywords, ...oldData])
    } else {
      changIndex(keywords)
    }
  }
}


/**
 * 获取搜索历史
 */
const getAllHistories = () => {
  let history = storage.getItem("searchhistory")
  if(history == "") {
    return []
  } else if(Array.isArray(history.content) && history.content.length > 0) {
    return history.content
  }
}

module.exports = {
  changIndex,
  saveToSearchHistory,
  getAllHistories
}
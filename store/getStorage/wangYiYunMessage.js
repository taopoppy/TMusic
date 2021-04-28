const storage = require('../index.js')

// 获取网易云账号信息缓存
const getWangYiYunMessage = ()=> {
  let WangYiYunMessage = storage.getItem("wangyiyunmessage")
  if(WangYiYunMessage !== "") {
    return WangYiYunMessage
  }
  return null
}


// 设置
const setWangYiYunMessage = (data) => {
  storage.setItem("wangyiyunmessage", data)
}

module.exports = {
  getWangYiYunMessage,
  setWangYiYunMessage
}
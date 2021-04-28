const Api = require('../api.js')
const request = require('../request.js')
const {appId, appSecret} = require('../../config.js')
const { userMessageHistory } = require('../../store/getStorageData.js')

// 获取用户OpenId
module.exports = { 
  func: async () => {
    // 1. 检查缓存当中是否已经有用户信息，且包含openId
    let userMessage = userMessageHistory.getUserMessage()
    if(userMessage) {
      return userMessage
    }

    // 2. 不包括再去请求
    wx.login({
      success:async (res)=> {
        if(res.code) {
          let result = await request.fetch(Api.getOpenId(appId, appSecret, res.code),{},{})
          if(result.data.openid && result.data.session_key) {
            // 保存进入缓存
            let data = result.data
            data.hasAuthorize = false
            userMessageHistory.UpdateUserMessage(data)
            return data
          }
          return null
        }
        return null
      }
    })
  }
}

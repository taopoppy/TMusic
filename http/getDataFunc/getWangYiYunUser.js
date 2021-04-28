const Api = require('../api.js')
const request = require('../request.js')
const { wangYiYunMessageHistory} = require('../../store/getStorageData.js')

// 获取网易云账号信息
module.exports = {
  func: async(number, password) => {
    // 1. 先去Storage当中去找
    let wangYiYunUser = wangYiYunMessageHistory.getWangYiYunMessage()
    if(wangYiYunUser) {
      return wangYiYunUser
    }

    // 2. 缓存当中没有，再去请求
    try {
      let res = await request.fetch(Api.getLoginCookie(), {phone:number, password:password},{})
      if(res.statusCode && res.statusCode === 200 ) {
        // 用户名密码错误
        if(res.data && res.data.code !== 200) {
          return {
            code: -1,
            message: res.data.message
          }
        }

        let data = {
          id: res.data.account.id,
          cookie: res.data.cookie
        } 

        // 根据id请求用户详情
        let userDetail = await request.fetch(Api.getWangYiYunUserDetail(), {uid: data.id}, {loading:true})
        if(userDetail.statusCode && userDetail.statusCode === 200) {
          data = Object.assign(data, userDetail.data)
        }

        // 保存进入缓存
        wangYiYunMessageHistory.setWangYiYunMessage(data)

        // 最后返回
        return {
          code: 0,
          message: "登录成功"
        }
      } else {
        return {
          code: -1,
          message: "登录异常"
        }
      }
    } catch (error) {
      console.log("登录失败",error.toString())
      return {
        code: -1,
        message: "登录失败，检查网络"
      }
    }
  }
}
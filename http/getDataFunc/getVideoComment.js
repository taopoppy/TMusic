const Api = require('../api.js')
const request = require('../request.js')

// 获取视频评论信息
module.exports = {
  func: async (id) => {
    try {
      let res = await request.fetch(Api.getVideoComment(), {
        id: id
      }, {})
      if(res.statusCode === 200 && res.errMsg === "request:ok"){
        return res.data
      }
    } catch (error) {
      console.log("getVideoComment函数catch到错误", error)
      return null
    }
  }
}
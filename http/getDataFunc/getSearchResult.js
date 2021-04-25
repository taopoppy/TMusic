const Api = require('../api.js')
const request = require('../request.js')

// 根据keyword获取搜索结果
module.exports = {
  func: async (keyword) => {
    try {
      let res = await request.fetch(Api.getSearchResult(), {keywords: keyword}, {loading: true})
      if(res.statusCode && res.statusCode === 200) {
        // 返回搜索结果
        return res.data.result
      }
    } catch (error) {
      console.log("获取搜索结果失败")
      return null
    }
  }
}
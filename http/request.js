// http/request.js

const errMsg = "服务异常，请稍后再试"

module.exports = {
  fetch: function(url, data={}, option={}) {
    let {
      loading = false,
      toast = false,
      method = 'get'
    } = option
    return new Promise((resolve, reject)=> {
      if(loading) {
        wx.showLoading({
          title: 'loading...',
          mask: true
        })
      }
      wx.request({
        url,
        data,
        method,
        success: function(result) {
          if(loading) {
            wx.hideLoading() // 关闭加载显示框
          }
          resolve(result)
        },
        fail:function(e={code:-1, msg: errMsg, errMsg}) {
          let msg = e.errMsg
          if(msg === 'request:fail timeout') {
            msg = "服务请求超时"
          }
          if(toast) {
            wx.showToast({
              title: msg,
              icon: 'none'
            })
          }
          reject(e)
        }
      })
    })
  }
}
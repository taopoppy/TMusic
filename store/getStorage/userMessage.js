const storage = require('../index.js')

// 获取用户的信息缓存
const getUserMessage = ()=> {
  let userMessage = storage.getItem("usermessage")
  if(userMessage !== "") {
    return userMessage
  }
  return null
}


// 更新用户的信息，或者说合并
const UpdateUserMessage = (newData) => {
  let oldData = {}
  let userMessage = getUserMessage()
  if(userMessage !== null){
    oldData = userMessage.content
  }
  let resultData = Object.assign(oldData,newData)
  storage.setItem("usermessage", resultData)
}

module.exports = {
  getUserMessage,
  UpdateUserMessage
}
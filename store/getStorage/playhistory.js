const storage = require('../index.js')

module.exports = {
  savePlayHistory: (music)=> {
    let history = storage.getItem("history")
    if(history === "" && music) {
      storage.setItem("history",[music])
    } else if (Array.isArray(history.content) && history.content.length<30) {
      storage.setItem("history", [music, ...history.content])
    } else if (Array.isArray(history.content) && history.content.length >= 30) {
      let oldData = history.content.slice(0, 30)
      storage.setItem("history", [music, ...oldData])
    }
  }
}
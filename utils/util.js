const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}


const transHttps = str => {
  return str.replace("http:", "https:")
}

const tranNumber = (num,point) => {
  let numStr = num.toString().split('.')[0]
  if(numStr.length < 6) {
    return numStr
  }else if(numStr.length >= 6 && numStr.length <= 8) {
    let deciaml = numStr.substring(numStr.length - 4, numStr.length - 4 + point)

    return parseFloat(parseInt(num/ 10000) + '.' + deciaml) + '万'
  } else if(numStr.length > 8) {
    let deciaml = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
    return parseFloat(parseInt(num/ 100000000) + '.' + deciaml) + '亿'
  }
}


module.exports = {
  formatTime,
  transHttps,
  tranNumber
}

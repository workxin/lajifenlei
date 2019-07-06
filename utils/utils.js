
var TXAPI_BASE_URL = "https://api.tianapi.com";  //天行数据接口域名
var TXAPI_KEY = "";  //请填写你在天行数据www.tianapi.com获得apikey

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  TXAPI_BASE_URL: TXAPI_BASE_URL,
  TXAPI_KEY: TXAPI_KEY,
  formatTime: formatTime
}

//index.js
//获取应用实例
var util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
  },


  onLoad: function () {

  },
  query: function (e) {
    var that = this;
    if (!e.detail.value){
      wx.showToast({title: '请输入废弃物名称'})
      return; 
    }
  wx.request({
    url: util.TXAPI_BASE_URL + '/txapi/lajifenlei/', //垃圾分类接口
    data: {
      key: util.TXAPI_KEY,
      word: e.detail.value
    },
    success: function (res) {
      console.log('返回的数据：', res.data.code);
      if (res.data.code == 200) {
        var txapi = res.data.newslist[0]
        that.setData({
          hidden: true,
          name: txapi.name,
          type: txapi.type,
          explain: txapi.explain,
          contain: txapi.contain,
          tip: txapi.tip

        })
        } else {
        console.error('错误码：' + res.data.code + '\n错误提示：' + res.data.msg + '\n接口详情：https://www.tianapi.com/apiview/97')
        wx.showModal({
          title: '垃圾分类',
          content: res.data.msg,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      }
    },
    fail: function (err) {
      console.log(err)
    }
  })   
  }
})

var util = require('../../utils/util.js');
var app = getApp(); // 获取入口文件app的应用实例

Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: false,
    margintop:40
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  /**
   * 选择 / 拍摄图片
   */
  addapimg: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (ress) {
        console.log(ress)
        if (ress.size > 1024 * 1024 * 3) {
          wx.showModal({
            title: '垃圾分类',
            content: '很抱歉，图片最大允许3M，当前为' + (ress.size / (1024 * 1024)).toFixed(2),
          })
          return false;
        }else{
          wx.getFileSystemManager().readFile({
            filePath: ress.tempFilePaths[0], //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              console.log('data:image/png;base64,' + res.data)
          wx.request({
            url: util.TXAPI_BASE_URL + '/txapi/imglajifenlei/', //垃圾分类接口
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              key: util.TXAPI_KEY,
              img: 'data:image/png;base64,' + res.data
            },
            success: function (res) {
              if (res.data.code == 200) {
                let temp_data = res.data.newslist;
                var newSource = res.data.newslist.concat(temp_data)
                that.setData({
                  img: ress.tempFilePaths[0],
                  size: (ress.size / (1024 * 1024)).toFixed(2),
                  bindSource: newSource
                })
              } else {
                console.error('错误码：' + res.data.code + '\n错误提示：' + res.data.msg + '\n接口详情：https://www.tianapi.com/apiview/101')
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
                that.setData({
                  hideScroll: true,
                  bindSource: []
                })
              }
            }
          })
          }
          })
        }
      }
    }
    )
  }

})

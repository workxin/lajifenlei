var util = require('../../utils/util.js');
var app = getApp(); // 获取入口文件app的应用实例

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    width: 0
  },

  // 触摸开始
  touchStart: function (e) {

    this.recorderManager.start({
      duration: 60000,
      numberOfChannels:1,
      sampleRate:16000,
      frameSize: 1,
      format: 'PCM'
    });
  },

  // 触摸结束
  touchEnd: function (e) {
  
    this.recorderManager.stop();
  },
  // 实时监测变化调用这些方法
  onShow: function () {
    var that = this;
    //  初始化录音对象
    this.recorderManager = this.recorderManager || wx.getRecorderManager();
    this.recorderManager.onError(function (err) {
      console.log("录音失败")
      console.log(err)
      // that.tip("录音失败！")
    });
    this.recorderManager.onStart(function () {
      console.log("录音开始")
      // that.tip("录音失败！")
    });
    
    // 录音结束
    this.recorderManager.onStop(function (record) {
      console.log("录音结束")
      console.log(record)
      var src = record.tempFilePath;

      // var fileSize = record.fileSize;
      // const fs = wx.getFileSystemManager();
      console.log(src)
      wx.uploadFile({
        url: util.TXAPI_BASE_URL + '/txapi/voicelajifenlei/index', //语音垃圾分类接口
        filePath: src,
        name: 'say',
        formData: {
          key: util.TXAPI_KEY,
          format:'pcm'
        },
        success (res){
          console.log(res.data)
          wx.showModal({
            title: '提示',
            content: res.data,
            showCancel: false
          })
        
        }
      })

     
  
    });


  },
  tip: function (msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false
    })
  },

})

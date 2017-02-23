//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: []
  },
  // onLoad: function () {
  //   this.setData({
  //     logs: (wx.getStorageSync('logs') || []).map(function(log) {
  //       return util.formatTime(new Date(log))
  //     })
  //   })
  // },
  onShow:function(){
      console.log('logs')
      var logs = wx.getStorageSync('logList')
      this.setData({
          logs:logs.reverse()
      })
  }
})

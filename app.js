//app.
const Towxml = require('/towxml-master/main');
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    userInfo: null,
    url:'https://www.channnxy.cn/',
    // url: 'http://192.168.124.8:3000/',
    // url: 'http://117.50.22.42:3000/',
    token:''
  },
  towxml: new Towxml()
})
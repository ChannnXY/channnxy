var util = require('../../../utils/myUtil.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否展示登录按钮
    loginFlag:false,
    keyBoardBottom:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initScrollView();
    this.checkLogin();
  },

  /**
   * 初始化scroll-view高度
   */
  initScrollView:function(){
    var that = this;
    util.getItemHeight('.header', function (res) {
      that.setData({ headerHeight: res })
    })
    util.getWinHeight(function (res) {
      that.setData({ winHeight: res })
    })
  },

  /**
   * 拉起键盘的时候重定位input框位置
   */
  keyBoardFocusListener:function(e){
    this.setData({ keyBoardBottom: 7})
  },

  keyBoardBlurListener: function (e) {
    this.setData({ keyBoardBottom: 0 })
  },

  /*
  * 检查用户是否授权
  */
  checkLogin:function(){
    var that = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // 在调用登录接口获得userId
          wx.getUserInfo({
            success: res => {
              var data = res.userInfo;
              console.log(data);
              //调用登录接口
              wx.login({
                success: res => {
                  // console.log(res.code)
                  var data = { code: res.code }
                  util.ajax('users/login', data, false, function (res) {
                    console.log(res.data.data)
                    that.setData({
                      loginFlag: false,
                      user:res.data.data
                    })
                  })
                }
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          that.setData({
            loginFlag: true
          })
        }
      }
    })
  },
  /**
   * 如果用户没有授权，则拉起授权窗口
   */
  bindGetUserInfo:function(e){
    var that = this;
    if (e.detail.userInfo){
      // console.log(e.detail.userInfo)
      var info = e.detail.userInfo;
      //如果用户同意了授权，登录获取userid，在数据库中插入用户信息
      wx.login({
        success: res => {
          var data = { code: res.code,
            nickName: info.nickName,
            avatarUrl: info.avatarUrl,
            city: info.city,
            country: info.country,
            province: info.province,
            }
          util.ajax('users/register', data, false, function (res) {
            // console.log(res.data.data)
            that.setData({
              loginFlag: false,
              user: res.data.data
            })
            wx.showToast({
              title: '雷猴啊！'+res.data.data.nickName+'是你要给孩子一份工作吗',
            })
          })
        }
      })
    }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
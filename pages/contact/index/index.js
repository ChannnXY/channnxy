var util = require('../../../utils/myUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyBoardBottom:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initScrollView();
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
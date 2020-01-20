var util = require('../../../utils/myUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tipAnimationFlag:false,
    tipFlag:false
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //定时任务，出现和隐藏角标
    this.showTips();
    this.initData();
  },

   /*
  * 初始化数据
  */
  initData:function(){
    var that = this;
    util.ajax('resume/get',null,false,function(res){
      wx.hideLoading();
      // console.log(res.data.data)
      var data = res.data.data;
      that.setData({
        competition:data.competition,
        experience: data.experience,
        info: data.info,
        project: data.project,
        skills: data.skills,
      })
    })
  },

  /*
  * 出现和隐藏角标
  */
  showTips(){
    var that = this;
    setTimeout(function () {
      that.setData({ tipFlag: true })
    }, 4000)
    setTimeout(function () {
      that.setData({ tipAnimationFlag: true })
    }, 5000)
    setTimeout(function () {
      that.setData({ tipAnimationFlag: false })
    }, 10000)
    setTimeout(function () {
      that.setData({ tipFlag: false })
    }, 11000)
  },

  //监听用户长按，显示toast
  cardLongTapListener:function(){
    wx.showToast({
      icon:'none',
      title: '点击标签栏，查看更多内容',
    })
  },

  //点击转发
  onShareMenu:function(){
    wx.showShareMenu({
      withShareTicket:true
    })
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
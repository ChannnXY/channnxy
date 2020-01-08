var util = require('../../../utils/myUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: ["项目简介","产品展示","技术难点"],
    currrentTab:0,
    imgFlag:false,
    // 项目简介
    intro: ["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the "],
    //角色责任
    roles: ["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the "],
    //项目成果
    result: ["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the "],
    //技术难点
    problems: [{ intro: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the", solutions: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the", url:"http://via.placeholder.com/343x300" }, { intro: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the", solutions: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the" }, { intro: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the", solutions: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the" }],
    //产品展示
    products: ["http://via.placeholder.com/343x600", "http://via.placeholder.com/343x600", "http://via.placeholder.com/343x600"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //图片撑满屏幕
    util.getWinHeight(function(res){
      that.setData({ winHeight: res })
    })
  },

  /*
  *手势动作监听
  */
  imgScrollStartListener:function(e){
    //用户触摸的起始点Y值
    this.setData({
      startY: e.changedTouches[0].pageY
    })
  },

  imgScrollEndListener:function(e){
    var that = this;
    //终止触摸的Y值
    let endY = e.changedTouches[0].pageY;
    // console.log(this.data.startY - endY)
    if ((this.data.startY - endY)>5) {
      wx.pageScrollTo({
        scrollTop: this.data.winHeight,
        duration:100
      })
      //隐藏图片,先滑动，再隐藏图片
      setTimeout(function () {
        that.setData({ imgFlag: true })
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 0
        })
        //计算内容高度
        util.getItemHeight('#tab',function(res){
          that.setData({ tabHeight: res})
        })
      }, 100);
    }
  },

  /*
  *tab点击和滑动监听
  */
  tabClickListener:function(e){
    this.setData({
      currrentTab:parseInt(e.currentTarget.dataset.index)
    })
  },

  tabSwiperListener:function(e){
    var that = this;
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    };
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
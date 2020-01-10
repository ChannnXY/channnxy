var util = require('../../../utils/myUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //swiper相关参数
    tabList: ["项目简介","产品展示","技术难点"],
    currentTab:0,
    //图片模式还是文字模式
    imgFlag:false,
    tabFlag:false,
    //scroll-view的顶部
    top_0: 0,
    top_1: 0,
    top_2: 0,
    scrollViewTop:0,
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
      //下滑
      that.setData({ tabFlag: true })
      wx.pageScrollTo({
        scrollTop: this.data.winHeight,
        duration:200
      })
      //隐藏图片,先滑动，再隐藏图片
      setTimeout(function () {
        that.setData({ imgFlag: true})
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 0
        })
        //计算内容高度
        util.getItemHeight('.tab',function(res){
          that.setData({ tabHeight: res})
        })
      }, 200);
    }
  },

  //tab上滑手势监听
  tabScrollEndListener: function (e) {
    var that = this;
    //终止触摸的Y值
    let endY = e.changedTouches[0].pageY;
    if (((this.data.startY - endY) < - 5) && (this.data.scrollViewTop < 5)) {
      //上滑显示图片
      that.setData({ imgFlag: false })
      wx.pageScrollTo({
        scrollTop: this.data.winHeight,
        duration: 0
      })
      //隐藏图片,先滑动，再隐藏图片
      setTimeout(function () {
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 300
        })
        that.setData({
          tabFlag: false
        })
      }, 300);
    }
  },

  //scroll上滑手势监听
  scrollViewListener: function (e) {
    //设置
    this.setData({ scrollViewTop: e.detail.scrollTop})
  },

  /*
  *tab点击和滑动监听
  */
  tabClickListener:function(e){
    this.setData({
      currentTab:parseInt(e.currentTarget.dataset.index)
    })
  },

  tabSwiperListener:function(e){
    var that = this;
    that.setData({
      currentTab: e.detail.current
    })
  },

  /**
   * 回到顶部按钮监听
   */
  toTopClickListener:function(e){
    var that = this;
    var top_id = "top_"+e.currentTarget.dataset.idx ;
    this.setData({
      [top_id]:0,
    })
  },
})
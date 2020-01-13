var util = require('../../../../utils/myUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //swiper相关参数
    tabList: ["项目简介", "产品展示", "技术难点"],
    currentTab: 0,
    //scroll-view的顶部
    top_0: 0,
    top_1: 0,
    top_2: 0,
    scrollViewTop: 0,
    // 项目简介
    intro: [],
    //角色责任
    roles: [],
    //项目成果
    result: [],
    //技术难点
    problems: [{ intro: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the", solutions: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the", url: "http://via.placeholder.com/343x300" }, { intro: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the", solutions: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the" }, { intro: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the", solutions: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the" }],
    //产品展示
    products: ["http://via.placeholder.com/343x600", "http://via.placeholder.com/343x600", "http://via.placeholder.com/343x600"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //图片撑满屏幕
    util.getWinHeight(function (res) {
      that.setData({ winHeight: res })
    })
    util.getItemHeight('.tab',function(res){
      that.setData({ tabHeight: res })
    })
    wx.setNavigationBarTitle({
      title: options.title,
    })
    this.initData(parseInt(options.id));
  },

  /*
  *初始化数据
  */
  initData:function(e){ 
    var that = this;
    wx.showLoading({
      title: '正在加载中',
    })
    var data = {id:e};
    util.ajax('project/getItem',data,false,function(res){
      wx.hideLoading();
      var data = res.data.data
      that.setData({
        intro : data.intro,
        roles : data.roles,
        result : data.result
      })
    })
  },

  /*
  *tab点击和滑动监听
  */
  tabClickListener: function (e) {
    this.setData({
      currentTab: parseInt(e.currentTarget.dataset.index)
    })
  },

  tabSwiperListener: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    })
  },

  /**
   * 回到顶部按钮监听
   */
  toTopClickListener: function (e) {
    var that = this;
    var top_id = "top_" + e.currentTarget.dataset.idx;
    this.setData({
      [top_id]: 0,
    })
  }
})
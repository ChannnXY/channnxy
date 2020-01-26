var util = require('../../../../utils/myUtil.js');
var app = getApp();
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
    problems: [],
    //产品展示
    products: [],
    flags:[true,true,true]
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
    this.setData({
      id : parseInt(options.id)
    })
    this.initIntro(parseInt(options.id));
  },

  /*
  *初始化数据
  */
  initIntro:function(e){ 
    var that = this;
    var data = {id:e};
    util.ajax('project/getItemIntro',data,false,function(res){
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
    if(this.data.flags[e.detail.current]&&e.detail.current === 1 ){
      this.initProjects();
    } else if (this.data.flags[e.detail.current] && e.detail.current === 2 ){
      this.initProblems();
    }
  },

  initProblems:function(){
    var that = this;
    var data = { id: that.data.id }
    util.ajax('project/getProblem', data, false, function (res) {
      wx.hideLoading();
      var data = res.data.data;
      var problems = new Array();
      for(var i in data){
        let string2json = app.towxml.toJson(data[i], 'markdown');
        problems.push(string2json);
      }
      that.setData({
        problems: problems,
        ['flags[2]']: false
      })
    })
  },

  initProjects: function () {
    var that = this;
    var data = { id : that.data.id }
    util.ajax('project/getImage',data,false,function(res){
      wx.hideLoading();
      that.setData({
        products:res.data.data,
        ['flags[1]']:false
      })
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
  },

/*
*
*/
previewImg: function(e){
  var that = this;
  var index = e.currentTarget.dataset.idx;
  wx.previewImage({
    current:that.data.problems[index],
    urls: that.data.products,
  })
}

})
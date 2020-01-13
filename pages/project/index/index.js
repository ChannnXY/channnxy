var util = require('../../../utils/myUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: [],
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

    util.ajax('project/getList',null,false,function(res){
      that.setData({imageUrl:res.data.data})
    })
  },

})
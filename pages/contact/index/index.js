var util = require('../../../utils/myUtil.js');
var throttle = util.throttle;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否展示登录按钮
    loginFlag:false,
    keyBoardBottom:0,
    //联系列表
    contactList:[],
    contact:{hasNextPage:true,currentPage:0,text:'正在努力加载中'}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initScrollView();
    this.checkLogin();
    this.getContactList();
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
  * 初始化留言列表
  */
  getContactList:function(){
    var that = this;
    if (that.data.contact.hasNextPage){
      var data = {
        currentPage: this.data.contact.currentPage,
        pageSize: 5
      }
      util.ajax('contact/get', data,false, function (res) {
        wx.hideLoading();
        //拼接数据和分页
        var data = res.data.data;
        var contact = that.data.contact;
        contact.hasNextPage = data.hasNextPage;
        contact.currentPage++
        if(data.hasNextPage){
          contact.text = '上滑加载下一页数据'
        }else{
          contact.text = '这是全部留言啦！'
        }
        var contactList = that.data.contactList.concat(data.list);
        that.setData({
          contactList,
          contact
        })
      })
    }
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
              // console.log(data);
              //调用登录接口
              wx.login({
                success: res => {
                  // console.log(res.code)
                  var data = { code: res.code }
                  util.ajax('users/login', data, false, function (res) {
                    // console.log(res.data.data)
                    wx.hideLoading();
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
            wx.hideLoading();
            that.setData({
              loginFlag: false,
              user: res.data.data
            })
            wx.showToast({
              icon:'none',
              title: '雷猴啊！'+res.data.data.nickName+'！是你要给孩子一份工作吗',
            })
          })
        }
      })
    }
  },

  /**
   * 提交表单
   */
  input_contact:function(e){
    this.setData({content:e.detail.value})
  },

  submit:throttle(function(e){
    var that = this;
    var data = {
      user_id : that.data.user.id,
      content: that.data.content
    }
    if (that.data.content!==0){
      util.ajax('contact/input', data, true,function (res) {
        wx.hideLoading();
        // console.log(res.data.data);
        var time = new Date();
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();
        var newContact = {id:res.data.data,
          user_id:that.data.user.id,
          content: that.data.content,
          nickName:that.data.user.nickName,
          avatarUrl: that.data.user.avatarUrl,
          time: year + '年' + month + '月' + date + '日',
          }
        var contactList = that.data.contactList;
        contactList.unshift(newContact);
        that.setData({ 
          contactList,
          content:''
        })
        wx.showToast({
          title: '发布成功！',
        })
      })
    }
  },1000),

  delete_check:function(e){
    var that = this;
    var data = {
      id: e.currentTarget.dataset.id,
      user_id: that.data.user.id
    }
    var idx = e.currentTarget.dataset.idx;
    wx.showModal({
      title: '删除确认',
      content: '您确定要删除这条留言吗QAQ',
      success:function(res){
        if (res.confirm) that.delete_contact(data,idx);
      }
    })
  },
  
  delete_contact:throttle(function(data,idx){
    var that = this;
    util.ajax('contact/delete',data,false,function(res){
      wx.hideLoading();
      // console.log(res);
      if(res.data.code==200){
        var contactList = that.data.contactList;
        contactList.splice(idx, 1);
        that.setData({contactList});
        wx.showToast({
          title: '删除成功',
        })
      }else{
        wx.showToast({
          icon:'none',
          title: '失败，请刷新后再试',
        })
      }
    })
  },1000),

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
    var data = {
      currentPage: 0,
      pageSize: 5
    }
    util.ajax('contact/get', data, false, function (res) {
      //拼接数据和分页
      wx.hideLoading();
      var data = res.data.data;
      var contact = that.data.contact;
      contact.hasNextPage = data.hasNextPage;
      contact.currentPage = 1;
      if (data.hasNextPage) {
        contact.text = '上滑加载下一页数据'
      } else {
        contact.text = '这是全部留言啦！'
      }
      var contactList = data.list;
      that.setData({
        contactList,
        contact
      })
      wx.showToast({
        title: '刷新成功',
      })
    })
  }
})
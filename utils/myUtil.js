function getWinHeight(cb){
  wx.getSystemInfo({
    success: function(res) {
      cb(res.windowHeight)
    }
  })
}

function getItemHeight(item,cb){
  var query = wx.createSelectorQuery();
  query.select(item).boundingClientRect(function (res) {
    // console.log(res.height)
    cb(res.height);
  }).exec()
}

//get请求
var app = getApp();
function ajax(url, data, isPost, success,  complete){
  //出现加载框
  wx.showLoading({
    title: '正在加载中',
  });
  //自动拼接url
  url = app.globalData.url + url;
  wx.request({
    url: url,
    data: data,
    method: isPost ? 'POST' : 'GET',
    success: success,
    complete: complete
  })
}

//时锁
function throttle(func, delay) {
  var lastTime;
  return function () {
    var context = this;
    var args = arguments;
    var nowTime = new Date().getTime();
    if (!lastTime || nowTime > lastTime + delay) {
      lastTime = nowTime;
      func.apply(context, args)
    }
  }
}

module.exports={
  getWinHeight: getWinHeight,
  getItemHeight: getItemHeight,
  ajax: ajax,
  throttle: throttle
}
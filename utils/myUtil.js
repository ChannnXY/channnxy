function getWinHeight(cb){
  wx.getSystemInfo({
    success: function(res) {
      cb(res.windowHeight)
    }
  })
}

function getItemHeight(item,cb){
  var query = wx.createSelectorQuery();
  query.select('.tab').boundingClientRect(function (res) {
    cb(res.height);
  }).exec()
}

module.exports={
  getWinHeight: getWinHeight,
  getItemHeight: getItemHeight
}
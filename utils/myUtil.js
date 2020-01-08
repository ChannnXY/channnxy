function getWinHeight(cb){
  wx.getSystemInfo({
    success: function(res) {
      cb(res.windowHeight)
    }
  })
}

module.exports={
  getWinHeight: getWinHeight
}
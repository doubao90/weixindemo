// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers:[
      { 
        id: 1, 
        latitude: 39.9219,
        longitude: 116.44355,
         title: 'hello', 
         zIndex: 5, 
         iconPath: '/image/ico-addr.png',
          width: '50rpx',
           height:'50rpx'
           }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  getLoction:function(){
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log(res)
        wx.openLocation({
          latitude,
          longitude,
          scale: 18
        })
      }
    })
  }



})
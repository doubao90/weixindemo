// pages/home/home.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
       swiperImg:[                         'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',          'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ],
    navList:[
      {id:1,name:'全部'},
      { id: 1, name: '上装' },
      { id: 2, name: '裤装' },
      { id: 3, name: '家具内衣' },
      { id: 4, name: '特价区' },
      { id: 5, name: '裙装' },
      { id: 6, name: '套装' }
    ],

      categoryId: '0',
      nameLike: '',
      page: 1,
      pageSize: 20,
    category:[],
    goodList:[],
    dataState:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var This=this;
    // nav列表
    wx.request({
      url: app.globalData.httpUrl +'/shop/goods/category/all',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:'post',
      success(res) {
        var data = res.data;
        if (data.code==0){
          This.data.category=data.data;
          data.data.unshift({id:0,name:'全部'})
          This.setData({
            category: data.data,
            activeCategoryId: 0,
            curPage: 1
          });
          console.log(data.data)
        }
        
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var This=this;
    This.list()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this)
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
    console.log(444)

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var That=this;
    That.setData({
      page:That.data.page+1
      
      // That.searchObj.page = searchObj.page++
    })
    That.list()
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  list:function(append){
    var This=this;
    wx.request({
      url: app.globalData.httpUrl +'/shop/goods/list', 
      data: {
        categoryId:This.data.categoryId,
        nameLike: This.data.nameLike,
        page: This.data.page,
        pageSize: This.data.pageSize
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.showLoading({
          title: '加载中...',
        })
        if(res.data.code!=404){
          for (var i = 0; i < res.data.data.length; i++) {
            This.data.goodList.push(res.data.data[i])
          }
          // arrlist =res.data.data;

          This.setData({
            goodList: This.data.goodList,
            dataState:true
          })
          wx.hideLoading()
        }
        if (res.data.code == 404){
          This.setData({
            dataState:false
          })
          
        }
       
        
        console.log(This.data.goodList)
      }
    })
  
  }

})
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

      categoryId: 0,
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
    This.bannerList()
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
        }
        This.list(0)
      }
    })
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var This=this;
    
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
    var That=this;
    That.setData({
      page:That.data.page+1
    })
    That.list(That.data.categoryId)
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // banner图
  bannerList:function(){
    var This=this;
    wx.request({
      url: app.globalData.httpUrl +'/banner/list',
      data:{
        key:'mallName'
      },
      method: 'post',
      success(res){
        
        This.setData({
          swiperImg: res.data.data
        })
      }
    })
  },
  list:function(id,state){
    var This=this;
    wx.request({
      url: app.globalData.httpUrl +'/shop/goods/list', 
      data: {
        categoryId:id,
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

          if (res.data.code != 404) {
            if(state){
              This.data.goodList=[];
            }
              for (var i = 0; i < res.data.data.length; i++) {
                This.data.goodList.push(res.data.data[i])
              }
              This.setData({
                goodList: This.data.goodList,
                dataState: true
              })
              
            
            wx.hideLoading();
          }
          if (res.data.code == 404) {
            if(state){
              This.setData({
                goodList: [],
              
              })
            }
            This.setData({
              dataState: false
            })
            wx.hideLoading();
          }
        }
 
   
    })
  
  },
  //切换nav
  checknav:function(data){
    this.data.goodList=[];
    this.data.page=1;
    this.setData({
      categoryId: data.currentTarget.id
    })
    // this.data.categoryId = data.currentTarget.id
    this.list(data.currentTarget.id,true)
  },
  // 搜索输入框
  SearchInput:function(e){
    this.setData({
      nameLike: e.detail.value
    })
  },
// 搜索
  search:function(){
    var This=this
    this.data.page = 1;
    this.list(This.data.categoryId,true)
  },
  // 跳转物品详情页
  goodsDetail:function(e){
    console.log(e)
    wx.redirectTo({
      url: '/pages/goodsDetail/goodsDetail?id='+e.currentTarget.id
    })
  }

})
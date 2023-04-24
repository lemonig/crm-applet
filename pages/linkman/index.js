// pages/linkman/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleProps: {
      title: "联系人"
    },
    option1: [{
        text: '排序',
        value: 0
      },
      {
        text: '新款商品',
        value: 1
      },

    ],
    option2: [{
        text: '高级排序',
        value: 'a'
      },
      {
        text: '好评排序',
        value: 'b'
      },
      {
        text: '销量排序',
        value: 'c'
      },
    ],
    value1: 0,
    value2: "a",

  },

  gotoCustomer() {
    wx.navigateBack()
  },
  add() {
    wx.navigateTo({
      url: '/pages/linkman-form/index',
    })
  },
  edit() {
    wx.navigateTo({
      url: '/pages/linkman-form/index?id=1',
    })
  },
  
  gotoDetail() {
    wx.navigateTo({
      url: '/pages/linkman-detail/index?id=1',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
// pages/customer/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    isOwnPage: true,

    option1: [{
        text: '录入时间',
        value: 0
      },
      {
        text: '跟进时间',
        value: 1
      },
      {
        text: '未收款',
        value: 2
      },
      {
        text: '商机数量',
        value: 3
      },
      {
        text: '合同数量',
        value: 5
      },
      {
        text: '累计合同额',
        value: 6
      },

    ],
    option2: [{
        text: '和我相关',
        value: 'a'
      },
      {
        text: '全部',
        value: 'b'
      },

    ],
    value1: 0,
    value2: 'b',
    list: [
      {
        id:'1',
        a: '杭州市环保局',
        b: '未收款200w',
        c: '2032-9-9',

      },
      {
        id:'2',
        a: '平湖市环保局',
        b: '未收款600w',
        c: '2032-9-9',

      }
    ],
  },
  gotolink(events) {
    // wx.navigateTo({
    //   url: '/pages/linkman/index',
    //   events: events,
    //   success: (result) => {},
    //   fail: (res) => {},
    //   complete: (res) => {},
    // })
    console.log('111');
    this.setData({
      isOwnPage: !this.data.isOwnPage
    })
    console.log(this.data.isOwnPage);
  },
  add() {
    wx.navigateTo({
      url: '/pages/customer-form/index',
    })
  },
  gotoDetail() {
    wx.navigateTo({
      url: '/pages/customer-detail/index?id=1',
    })
  },

  gotoSearch() {
    if (this.data.isOwnPage) {
      wx.navigateTo({
        url: '/pages/customer/components/search-customer/index',
      })
      
    } else {
      wx.navigateTo({
        url: '/pages/customer/components/search-linkman/index',
      })
    }
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
    console.log(this.getTabBar());
    this.getTabBar().init();
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
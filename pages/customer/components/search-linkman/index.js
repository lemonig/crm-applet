// pages/customer/components/search-linkman/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleProps: {
      title:"搜索联系人"
    },
    list: [
      {
        id:'1',
        a: '杭州市环保局 站长',
        b: '张三',
      },
      {
        id:'2',
        a: '平湖市环保局 站长',
        b: '李四',
      }
    ],
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
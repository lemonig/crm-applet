// pages/deal-detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleProps: {
      title: "详情"
    },
    msg: [{
      text: "信息获取",
      isShow: true,
    },
    {
      text: "关系建立",
      isShow: true,
    },
    {
      text: "公司认可",
      isShow: true,
    },
    {
      text: "招标参与",
      isShow: false,
    },
    {
      text: "合同签订",
      isShow: false,
    },

    ],
    id:''
  },
  selectPipeline() {
    wx.navigateTo({
      url: '/pages/search/pipeline-select/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    this.setData({
      id :options.id
    })
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
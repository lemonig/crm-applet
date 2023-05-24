Page({
  data: {
    titleProps: {
      title:"选择产品"
    },
    id:'',
    list: [
      {
        id:'1',
        label: "水站建设（单位：个）",
        value: 1,
        checked:true
      },
      {
        id:'2',
        label: "水站运维（单位：年）",
        value: 2,
        checked:true
      },
      {
        id:'3',
        label: "水站搬迁（单位：个）",
        value: 3,
        checked:false
      },

    ],
    result: ['1', '2'],
  },
  onChange(event) {
    console.log(event);
    this.setData({
      result: event.detail,
    });
  },

  toggle(event) {
    // const { index } = event.currentTarget.dataset;
    // const checkbox = this.selectComponent(`.checkboxes-${index}`);
    // checkbox.toggle();
  },
  submit() {
      // console.log(this.data.result);
      // let res = this.data.list.filter(ele =>ele.checked)
      // console.log(res);
      var pages = getCurrentPages()
      var prePages = pages[pages.length - 2]
      prePages.setData({
          "form.productList":`共${this.data.result.length}项`
      })
      wx.navigateBack({
          delta: 1
      })
  },

  noop() {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id:options.id
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
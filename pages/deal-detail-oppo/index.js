Page({
  data: {
    titleProps: {
      title:"选择竞争对手"
    },
    id:'',
    list: [
      {
        id:'1',
        label: "北京尚洋",
        value: 1,
        checked:true
      },
      {
        id:'2',
        label: "湖南力合",
        value: 2,
        checked:true
      },
      {
        id:'3',
        label: "上海衡普",
        value: 3,
        checked:false
      },

    ],
    result: ['1', '2'],
  },
  onChange(event) {
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
      console.log(this.data.result);
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
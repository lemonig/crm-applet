import { listCompetitor, updateDeal } from '../../../../api/deal';
Page({
  data: {
    titleProps: {
      title: '选择竞争对手',
    },
    id: '',
    list: [],
    result: [],
    btnLoad: false,
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
  async submit() {
    this.setData({
      btnLoad: true,
    });
    this.data.result.shift()
    let { success, message } =await updateDeal({
      id: this.data.id,
      competitorList: this.data.result.map(item=> ({competitorId:item})),
    });
    wx.showToast({
      title: message,
      icon: 'none',
    });
    setTimeout(()=>{
      if(success){
        wx.navigateBack({
          delta: 1
        })
      }
    },1000)
    
  },

  noop() {},

  async getDetail() {
    let { data } = await listCompetitor({
      id: this.data.id,
    });
    data.forEach((item) => {
      this.data.result.forEach((jtem) => {
        if (item.id == jtem) {
          item.checked = true;
          item.value = jtem.num;
        }
      });
    });
    this.setData({
      list: data,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  
    this.setData({
      id: options.dealId,
      result: options.selected.split(',').filter(Boolean),
    });
    this.getDetail();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});

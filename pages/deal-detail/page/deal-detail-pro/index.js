import { listProduct, updateDeal } from '../../../../api/deal';
Page({
  data: {
    titleProps: {
      title: '选择产品',
    },
    id: '',
    list: [],
    result: [],
    btnLoad: false,
    needPost: false,
  },

  stepChange(event) {
    let idx = event.currentTarget.dataset.index;
    this.data.list[idx].value = event.detail;
  },
  onCheckChange(event) {
    let idx = event.currentTarget.dataset.index;
    this.data.list[idx].checked = event.detail;
    this.setData({
      list: [...this.data.list],
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
    let productMsg = this.data.list
      .map((item) => {
        if (item.checked) {
          return {
            productId: item.id,
            num: item.value,
          };
        }
      })
      .filter(Boolean);
    if (this.data.needPost) {
      let { success, message } = await updateDeal({
        id: this.data.id,
        dealProductList: productMsg,
      });
      wx.showToast({
        title: message,
        icon: 'none',
      });
      setTimeout(() => {
        if (success) {
          wx.navigateBack({
            delta: 1,
          });
        }
      }, 1000);
    } else {
      var pages = getCurrentPages();
      var prePages = pages[pages.length - 2];
      prePages.setData({
        productMsg,
      });
      wx.navigateBack({
        delta: 1,
      });
    }
  },

  noop() {},
  /**
   * 生命周期函数--监听页面加载
   */

  async getDetail() {
    let { data } = await listProduct({
      id: this.data.id,
    });
    data.forEach((item) => {
      this.data.result.forEach((jtem) => {
        if (item.id == jtem.productId) {
          item.checked = true;
          item.value = jtem.num;
        }
      });
    });
    this.setData({
      list: data,
    });
  },

  onLoad(options) {
    console.log(options);

    this.setData({
      id: options.dealId ? options.dealId:'',
      result: options.selected ? JSON.parse(options.selected) : [],
      needPost:options.post ? JSON.parse(options.post) : false
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

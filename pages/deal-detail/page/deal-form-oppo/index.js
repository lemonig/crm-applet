import { addcompetitor, updatecompetitor, getcompetitor } from '../../../../api/deal';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    titleProps: {
      title: '竞争对手',
    },
    id: '',
    list: [],
    result: [],
    btnLoad: false,
    form: {
        weakness: '',
        strength: '',
      creditCode: '',
      description: '',
      name: '',
    },
  },
  formSubmit: async function (e) {
    this.setData({
      btnLoad: true,
    });
    let params = e.detail.value;
    params.companyName = params.name;
    delete params.name;
    params.dealId = this.data.dealId;

    if (this.data._id) {
      params.id = this.data._id;

      var { success, message } = await updatecompetitor(params);
    } else {
      var { success, message } = await addcompetitor(params);
    }
    this.setData({
      btnLoad: false,
    });
    if (success) {
      wx.navigateBack({
        delta: 1, // 返回上一页
      });
      wx.showToast({
        title: message,
        icon: 'none',
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let { id, dealid } = options;
    if (id) {
      this.setData({
        _id: id,
        dealId:dealid,
        titleProps: {
          title: `编辑竞争对手`,
        },
      });
      this.getDetail(id ).then((res) => {
        this.setData({
          form: {
              ...res.data,
              name:res.data.companyName
          }

        });
      });
    } else {
      this.setData({
        dealId:dealid,

        titleProps: {
          title: '新建竞争对手',
        },
      });
    }
  },

  async getDetail(id) {
    return await getcompetitor({ id });
  },
  debouncedHandleInput(event) {
    // debounce()
    this.setData({
      form: {
        ...this.data.form,
        name: event.detail,
      },
    });
  },

  // debouncedHandleInput : debounce(this.onCustomerChange, 300),

  selectCustomer() {
    wx.navigateTo({
      url: '/pages/search/customer-search/index?text=' + this.data.form.name,
    });
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
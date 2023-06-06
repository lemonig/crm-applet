import { tylook } from '../../../api/public';
import { debounce } from '../../../utils/util';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,
    titleProps: {
      title: '工商信息查询',
    },
    key: '',
    pageData: [],
    btnLoad: false,
    value: '',
  },
  onSelect(event) {
    console.log(event);
    this.setData({
      value: event.currentTarget.dataset.item,
    });
  },

  comfirm() {
    console.log(this.data.value);
    var pages = getCurrentPages();
    var prePages = pages[pages.length - 2];
    prePages.setData({
      'form.name': this.data.value.name,
      'form.address':this.data.value.address,
      // 'form.base': this.data.value.base,
      'form.creditCode': this.data.value.creditCode,
      // 'form.orgType': this.data.value.orgType,
    });
    wx.navigateBack({
      delta: 1,
    });
  },

  fetchData: async function () {
    if(!this.data.key){
      return
    }
    let { data } = await tylook({ keyword: this.data.key });
    if (!data.length) {
      this.setData({
        isAllData: true,
      });
      return;
    }
    this.setData({
      loading: false,
      pageData: this.data.pageData.concat(data),
    });
  },
  handleListFilter: debounce(function (eve) {
    if (!eve.detail) {
      return;
    }
    this.setData({
      key: eve.detail,
    });
    this.fetchData();
  }, 500),

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    this.setData({
      key: options.text,
    });
    this.fetchData();
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

import { tylook } from '../../../api/public';
import { debounce } from '../../../utils/util';
import { organizationSearch } from '../../../api/deal';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,
    titleProps: {
      title: '选择客户',
    },
    key: '',
    pageData: [],
    btnLoad: false,
    value: null,
    name: '',
    need: true
  },

  onSelect(event) {
    const { value, name } = event.currentTarget.dataset;
    this.setData({
      value,
      name,
    });
  },

  confirm() {
    if (this.data.need && !this.data.value.personName) {
        wx.showToast({
          title: '该客户没有联系人，请完善后再选择',
          icon: 'none',
        });
        return;
      }
    var pages = getCurrentPages();
    var prePages = pages[pages.length - 2];
    if (!!this.data.value) {
      prePages.setData({
        'form.orgId': this.data.value.id,
        'form.orgName': this.data.value.name,
      });
    }
    wx.navigateBack({
      delta: 1,
    });
  },

  fetchData: async function () {
    let params = {
      name: this.data.key,
    };
    let { data } = await organizationSearch(params);

    this.setData({
      loading: false,
      pageData: data,
    });
  },
  handleListFilter: debounce(function (eve) {
    this.setData({
      key: eve.detail,
    });
    if (!eve.detail) {
      return;
    }
    this.fetchData();
  }, 500),

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      key: options.text,
      need: 'need' in options?  JSON.parse(options.need) : true
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

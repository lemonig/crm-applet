import { debounce } from '../../../utils/util';
import { pageContract } from '../../../api/contract';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,
    titleProps: {
      title: '选择商机转化合同',
    },
    key: '',
    btnLoad: false,
    value: '',
    name: '',

    pageData: [],
    id: '',
    pageNo: 1,
    loading: false,
    isAllData: false,
  },
  onSelect(event) {
    this.setData({
      value: event.currentTarget.dataset.value,
      name: event.currentTarget.dataset.name,
    });
  },

  confirm() {
    var pages = getCurrentPages();
    var prePages = pages[pages.length - 2];
    prePages.setData({
      'winForm.conId': this.data.value,
      'winForm.conName': this.data.name,
    });
    wx.navigateBack({
      delta: 1,
    });
  },

  fetchData: async function () {
    let { value1, value2, value3 } = this.data;
    let params = {
      page:1,
      size: 30,
      data: {
        // pipelineStageId: value1,
        valueType:'1',
        name: this.data.key
      },
    };
    let { data, additional_data } = await pageContract(params);
    this.setData({
      loading: false,
      pageData: data,
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
    this.setData({
      key: options.text,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
  },

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

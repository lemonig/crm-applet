// pages/deal-view/index.js
import { deal as pageDeal } from '../../api/navgate.js';
import { debounce } from '../../utils/util';

const app = getApp();
Page({
  data: {
    navBarHeight: app.globalData.navBarHeight,
    titleProps: {
      title: '商机看板',
    },

    pageData: [],
    pageDataCum: {},
    id: '',
    isPage: false,
    pageNo: 1,
    loading: false,
    isAllData: false,
    show: false,
    userIdList: [],
    feachParams: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const eventChannel = this.getOpenerEventChannel();
    let _this = this;
    let text = ['商机数量','商机金额',]
    eventChannel.on('acceptData', function ({ data }) {
      _this.setData({
        feachParams: data,
        titleProps:{
            title: text.includes(data.title) ? '进行中商机':data.title || ''
        }
      });
      _this.fetchData();
    });
  },

  fetchData: async function () {
    let params = {
      page: this.data.pageNo,
      size: 30,
      data: this.data.feachParams,
    };
    let { data, additional_data } = await pageDeal(params);
    if (additional_data.pagination.total === this.data.pageData.length) {
      this.setData({
        isAllData: true,
        loading: false,
        pageDataCum: additional_data.count.totalCount,
      });
      return;
    }
    this.setData({
      loading: false,
      pageData: this.data.pageData.concat(data),
      pageDataCum: additional_data.count.totalCount,
    });
  },

  gotoDetail(eve) {
    let id = eve.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/deal-detail/index?id=' + id,
    });
  },
  handleToLower: debounce(function () {
    this.setData({
      loading: true,
      pageNo: this.data.pageNo + 1,
    });
    this.fetchData();
  }, 500),

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

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

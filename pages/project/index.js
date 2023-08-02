// pages/project/index.js
import { worklog } from '../../api/contract';
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,
    titleProps: {
      title: '工程进展',
    },
    pageData: {
      detail: [],
      list: [],
    },
    prcode: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchData(options.prcode);
  },
  fetchData: async function (code) {
    this.setData({
      loading: true,
    });

    let { data } = await worklog({ projectCode: code });
    data.list = data.list.reverse()
    this.setData({
      loading: false,
      pageData: data,
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

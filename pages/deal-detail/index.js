// pages/deal-detail/index.js
import { detailDeal , listPipelineStage } from '../../api/deal';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    titleProps: {
      title: '详情',
    },
    pipeState: [],
    pipelineId: '',
    active: 0,
    dealId: '',
    data: {},
  },

  fetchData: async function () {
    let { data } = await detailDeal({
      id: this.data.dealId,
    });
    this.setData({ data });
  },
  onChange(event) {
    console.log(event.detail.name);
    this.setData({
      active: event.detail.name,
    });
  },
  selectPipeline() {
    wx.navigateTo({
      url: '/pages/search/pipeline-select/index?dealId=' + this.data.dealId,
    });
  },

  async getListPipelineStage() {
    let { data } = await listPipelineStage();
    this.setData({
      pipeState: data.map((item) => ({
        ...item,
        label: item.name,
        value: item.dealProbability,
      })),
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    this.setData({
      dealId: options.id,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.fetchData();
  },

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

// pages/deal/index.js
import { pageDeal, listPipelineStage } from '../../api/deal';
const app = getApp();
Page({
  data: {
    navBarHeight: app.globalData.navBarHeight,
    titleProps: {
      title: '商机', // 导航栏标题
    },
    option1: [],
    option2: [
      {
        text: '录入时间',
        value: 1,
      },
      {
        text: '跟进时间',
        value: 2,
      },
      {
        text: '商机金额',
        value: 3,
      },
      {
        text: '业务类型',
        value: 4,
      },
    ],
    option3: [
    
      {
        text: '赢单商机',
        value: 1,
      },
      {
        text: '输单商机',
        value: 2,
      },
      {
        text: '终止商机',
        value: 3,
      },
      {
        text: '进行中商机',
        value: 4,
      },
      {
        text: '特殊业务商机',
        value: 5,
      },
      {
        text: '普通业务商机',
        value: 6,
      },
      // {
      //   text: '无跟进商机',
      //   value: 7,
      // },
      // {
      //   text: '无变化商机',
      //   value: 8,
      // },
    ],
    option4: [
      {
        text: '全部商机',
        value: 0,
      },
      {
        text: '我负责的商机',
        value: 1,
      },
      {
        text: '下属负责的商机',
        value: 2,
      },
      {
        text: '我及我下属负责的商机',
        value: 3,
      },
    ],
    value1: 0,
    value2: 1,
    value3: 1,
    value4: 0,
    pageData: [],
    pageDataCum: {},
    id: '',
    isPage: false,
    pageNo: 1,
    loading: false,
    isAllData: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getListPipelineStage();
  },

  fetchData: async function () {
    let { value1, value2, value3 } = this.data;
    let params = {
      page: this.data.pageNo,
      size: 30,
      data: {
        pipelineStageId: value1,
        filterBy: value3,
        orderBy: value2,
      },
    };
    let { data, additional_data } = await pageDeal(params);
    if (!data.length) {
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
    console.log(this, data.pageDataCum);
  },

  addDeal() {
    wx.navigateTo({
      url: '/pages/deal-form/index',
    });
  },
  gotoDetail(eve) {
    console.log(eve);
    let id = eve.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/deal-detail/index?id=' + id,
    });
  },
  handleToLower: function () {
    this.setData({
      loading: true,
      pageNo: this.data.pageNo + 1,
    });
    this.fetchData();
  },
  //
  async getListPipelineStage() {
    let { data } = await listPipelineStage();
    this.setData({
      option1: [
        { text: '全部', value: 0 },
        ...data.map((item) => ({
          text: item.name,
          value: item.id,
        })),
      ],
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
    console.log(this.getTabBar);
    this.fetchData();

    this.getTabBar().init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    this.setData({
      pageData: [],
      pageNo:1
    });
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

  sortChange1(eve) {
    this.setData({
      pageNo: 1,
      pageData: [],
      value1: eve.detail,
    });
    this.fetchData();
  },
  sortChange2(eve) {
    this.setData({
      pageNo: 1,
      pageData: [],
      value2: eve.detail,
    });
    this.fetchData();
  },
  sortChange3(eve) {
    this.setData({
      pageNo: 1,
      pageData: [],
      value3: eve.detail,
    });
    this.fetchData();
  },
  sortChange4(eve) {
    this.setData({
      pageNo: 1,
      pageData: [],
      value4: eve.detail,
    });
    this.fetchData();
  },
});

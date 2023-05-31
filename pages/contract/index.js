// pages/contract/index.js
const app = getApp();
const mock = require('./mock');
import { pagecContract,getContract } from '../../api/contract';
var cloneData = [];

Page({
  data: {
    navBarHeight: app.globalData.navBarHeight,
    active: 0,
    titleProps: {
      title: '合同',
    },
    show: false,
    soetItme: [
      {
        label: '合同额',
        value: '1',
      },
      {
        label: '回款',
        value: '2',
      },
      {
        label: '已开票未收',
        value: '3',
      },
      {
        label: '应收未收',
        value: '4',
      },
      {
        label: '已开票',
        value: '5',
      },
      {
        label: '未开票',
        value: '6',
      },
    ],
    pageData: [],
  },
  onChange(event) {
    this.setData({
      active: event.detail.name,
    });
  },
  sortBy(eve) {
    let type = eve.detail.value;
    let key = eve.currentTarget.dataset.skey;
    console.log(type);
    console.log(key);
    if (key === 'signedDate') {
      if (type === 1) {
        this.data.pageData.sort((a, b) => {
          let na = Number(a[key].replace(/\D/g, ''));
          let nb = Number(b[key].replace(/\D/g, ''));
          return na - nb;
        });
        this.setData({
          pageData: [...this.data.pageData],
        });
      } else if (type === -1) {
        this.data.pageData.sort((a, b) => {
          let na = Number(a[key].replace(/\D/g, ''));
          let nb = Number(b[key].replace(/\D/g, ''));
          return nb - na;
          // if (na > nb) {
          //   return type
          // }
        });
        this.setData({
          pageData: [...this.data.pageData],
        });
      } else {
        this.setData({
          pageData: cloneData,
        });
      }
    } else if (key === 'value') {
      if (type === 1) {
        this.data.pageData.sort(function (a, b) {
          return a[key] - b[key];
        });
        this.setData({
          pageData: [...this.data.pageData],
        });
      } else if (type === -1) {
        this.data.pageData.sort(function (a, b) {
          return b[key] - a[key];
        });
        this.setData({
          pageData: [...this.data.pageData],
        });
      } else {
        this.setData({
          pageData: cloneData,
        });
      }
    }
  },
  gotoDetail(eve) {
    wx.navigateTo({
      url: '/pages/contract-detail/index?id=' + eve.currentTarget.dataset.id,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    cloneData = JSON.parse(JSON.stringify(mock.default.data));
    this.setData({
      pageData: mock.default.data,
    });
  },
  filterPop() {
    this.setData({
      show: true,
    });
  },
  onClose() {
    this.setData({
      show: false,
    });
  },
  filterData(eve) {
    console.log(eve);
    this.onClose();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().init();
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

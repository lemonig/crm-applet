// pages/search/customer-search/index.js
import { linkmanInfo } from '../../../api/linkman';
import { debounce } from '../../../utils/util';

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,
    titleProps: {
      title: '选择联系人',
    },
    pageData: [],
    btnLoad: false,
    value: [],
    orgId: '',
  },
  onCheck(event) {
    const { index } = event.currentTarget.dataset;
    const pageData = this.data.pageData.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          checked: !item.checked,
        };
      }
      return item;
    });
    this.setData({
      pageData: pageData,
    });
  },
  

  confirm() {
    const pages = getCurrentPages();
    const prePage = pages[pages.length - 2];
    const personList = this.data.pageData.filter((item) => item.checked);
    prePage.setData({
      linkmanMsg: personList.map((item) => item.id),
      'form.personName': personList.map((item) => item.name),
    });
    wx.navigateBack({
      delta: 1,
    });
  },
  

  async fetchData() {
    let params = {
      data: {
        orderBy: this.data.value1,
        filterBy: this.data.value2,
        orgId: this.data.orgId ? this.data.orgId : -1,
        name:this.data.key
      },
    };
  
    try {
      let { data } = await linkmanInfo(params);
      let newD = data.map((item) => {
        return {
          ...item,
          checked: !!this.data.value ? this.data.value.includes(item.id) : false,
        };
      });
      this.setData({
        loading: false,
        pageData: newD,
      });
    } catch (error) {
      // 处理请求失败的情况
    }
  },
  handleListFilter: debounce(function (eve) {
    this.setData({
      key: eve.detail,
    });
    if (!eve.detail) {
      return;
    }
    // 添加请求数据的逻辑
    this.fetchData();
  }, 500),
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.selected) {
      this.setData({
        value: [...options.selected].map(Number),
      });
    }
    if(options.orgId){
      this.setData({
        orgId:options.orgId
      })
    }
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

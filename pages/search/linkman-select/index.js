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
    let { index, value } = event.currentTarget.dataset;
    let item = this.data.pageData[index];
    item.checked = !item.checked;
    console.log(item);
    this.setData({
      pageData: [...this.data.pageData],
    });
  },

  comfirm() {
    var pages = getCurrentPages();
    var prePages = pages[pages.length - 2];
    let personList = this.data.pageData.filter((item) => item.checked);
    prePages.setData({
      linkmanMsg: personList.map((item) => item.id),
      'form.personName': personList.map((item) => item.name),
    });
    wx.navigateBack({
      delta: 1,
    });
  },

  fetchData: async function () {
    let params = {
      data: {
        orderBy: this.data.value1,
        filterBy: this.data.value2,
        orgId: this.data.orgId ? this.data.orgId : -1,
      },
    };

    let { data } = await linkmanInfo(params);
    if (!!this.data.value) {
      console.log(this.data.value);
      let newD = data.map((item) => {
        console.log(this.data.value.includes(item.id));
        return {
          ...item,
          checked: this.data.value.includes(item.id),
        };
      });
      console.log(newD);
      this.setData({
        loading: false,
        pageData: newD,
      });
    } else {
      let newD = data.map((item) => {
        return {
          ...item,
          checked: false,
        };
      });
      this.setData({
        loading: false,
        pageData,
      });
    }
  },
  handleListFilter: debounce(function (eve) {
    this.setData({
      key: eve.detail,
    });
    if (!eve.detail) {
      return;
    }
  }, 500),
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
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

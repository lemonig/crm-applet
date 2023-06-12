// pages/customer/index.js
import { companyInfo } from '../../api/customer';
import { debounce } from '../../utils/util';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isOwnPage: true,
    navBarHeight: app.globalData.navBarHeight,
    option1: [
      {
        text: '录入时间',
        value: 1,
      },
      {
        text: '跟进时间',
        value: 2,
      },
      {
        text: '未收款',
        value: 3,
      },
      // {
      //   text: '商机数量',
      //   value: 3
      // },
      // {
      //   text: '合同数量',
      //   value: 5
      // },
      // {
      //   text: '累计合同额',
      //   value: 6
      // },
    ],
    option2: [
      {
        text: '和我相关',
        value: 1,
      },
      {
        text: '全部',
        value: 2,
      },
    ],
    value1: 1,
    value2: 1,

    pageData: [],
    isPage: false,
    pageNo: 1,
    loading: false,
    isAllData: false,
  },
  gotolink(events) {
    // wx.navigateTo({
    //   url: '/pages/linkman/index',
    //   events: events,
    //   success: (result) => {},
    //   fail: (res) => {},
    //   complete: (res) => {},
    // })
    this.setData({
      isOwnPage: !this.data.isOwnPage,
    });
  },
  add() {
    wx.navigateTo({
      url: '/pages/customer-form/index',
    });
  },
  gotoDetail(eve) {
    let id = eve.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/customer-detail/index?id='+ id,
    });
  },

  gotoSearch() {
    if (this.data.isOwnPage) {
      wx.navigateTo({
        url: '/pages/customer/components/search-customer/index',
      });
    } else {
      wx.navigateTo({
        url: '/pages/customer/components/search-linkman/index',
      });
    }
  },

  fetchData: async function () {
    let params = {
      page: this.data.pageNo,
      size: 10,
      data: {
        orderBy: this.data.value1,
        filterBy:this.data.value2,
      },
    };
    let { data ,additional_data} = await companyInfo(params);
    if (additional_data.pagination.total === this.data.pageData.length) {
       this.setData({
        isAllData: true,
        loading: false,
      });
      return;
    }
    this.setData({
      loading: false,
      pageData: this.data.pageData.concat(data),
    });
  },


  handleToLower: debounce(function () {
    this.setData({
      loading: true,
      pageNo: this.data.pageNo + 1,
    });
    this.fetchData();
  }, 500),


  sortChange() {
    this.setData({
      pageNo: 1,
      pageData: [],
    });
    this.fetchData();
  },

  sortChange1(eve) {
    this.setData({
      pageNo: 1,
      pageData: [],
      value1:eve.detail
    });
    this.fetchData();
  },
  sortChange2(eve) {
    this.setData({
      pageNo: 1,
      pageData: [],
      value2:eve.detail
    });
    this.fetchData();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if(!this.data.isOwnPage){
      const linkPage =   this.selectComponent('#linkPage')
      linkPage.fetchData()
    }
    this.fetchData()
  
    this.getTabBar().init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    this.setData({
      pageData:[]
    })
    const linkPage =   this.selectComponent('#linkPage')
    linkPage.setData({
      pageData:[]
    })
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

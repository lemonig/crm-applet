// pages/contract/index.js
import { pageContract, getContract } from '../../api/contract';
import { debounce } from '../../utils/util';
const app = getApp();

Page({
  data: {
    navBarHeight: app.globalData.navBarHeight,
    titleProps: {
      title: '合同看板',
    },
   
    pageData: [],
    id: '',
    isPage: false,
    pageNo: 1,
    loading: false,
    isAllData: false,
    isScrollFeatch: false,
    feachParams:{}
  
  },


  gotoDetail(eve) {
    wx.navigateTo({
      url: '/pages/contract-detail/index?id=' + eve.currentTarget.dataset.id,
    });
  },


 


  fetchData: async function () {
    this.setData({
      loading: true,
    });
    let sortData = [];
    
    let params = {
      page: this.data.pageNo,
      size: 20,
      data: this.data.feachParams,
    };


    let { data,additional_data } = await pageContract(params);
    if (this.data.isScrollFeatch && additional_data.pagination.total === this.data.pageData.length) {
      this.setData({
        isAllData: true,
        loading: false,
      });
      return;
    }
    this.setData({
      loading: false,
      pageData: this.data.isScrollFeatch ? this.data.pageData.concat(data) : data,
      isScrollFeatch:false
    });
  },

  handleToLower: debounce(function () {
    this.setData({
      pageNo: this.data.pageNo + 1,
      isScrollFeatch: true,
    });
    this.fetchData();
  }, 500),



  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const eventChannel = this.getOpenerEventChannel();
    let _this = this;
    eventChannel.on('acceptData', function ({ data }) {
      _this.setData({
        feachParams: data,
      });
      _this.fetchData();
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

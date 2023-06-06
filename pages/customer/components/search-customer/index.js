// pages/customer/components/search-customer/index.js
import { companyInfo } from '../../../../api/customer';
import { debounce } from "../../../../utils/util";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleProps: {
      title:"客户搜索"
    },
    list: [
  
    ],
    key: '',
  },
  gotoDetail(eve) {
    let id = eve.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/customer-detail/index?id='+ id,
      })
  },
  fetchData: async function () {
    let params = {
      page: 1,
      size: 20,
      data:{
        name: this.data.key
      }
    };
    let { data } = await companyInfo(params);

    this.setData({
      loading: false,
      list: data,
    });
  },
  handleListFilter: debounce(function(){
    this.fetchData()
  },500) ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

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
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
// pages/search/customer-search/index.js
import { linkmanInfo } from '../../../api/linkman';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleProps: {
      title:'选择联系人'
    },
    key: '',
    options:[{
      name: "张三",
      value: "1",
    },
    {
      name: "零四",
      value: "2",
    },
    {
      name: "王五",
      value: "3",
    },
    {
      name: "赵六",
      value: "4",
    },
    {
      name: "钱吧",
      value: "5",
    }
    ],
    btnLoad: false,
    value:''
    
  },
  onSelect(event) {
    console.log(event);
    this.setData({
      value:event.currentTarget.dataset.value
    })
   
  },

  comfirm() {
    console.log(this.data.value);
    var pages = getCurrentPages()
    var prePages = pages[pages.length - 2]
    prePages.setData({
      "form.name":this.data.value
    })
    wx.navigateBack({
      delta: 1
    })
  },

  fetchData: async function () {
    let params = {
      data:{
        orderBy: this.data.value1,
        filterBy:this.data.value2,
      },
      page: this.data.pageNo,
      size: 10,
    };
    let { data } = await linkmanInfo(params);
    if (!data.length) {
      this.setData({
        isAllData: true,
      });
      return
    }
    this.setData({
      loading: false,
      pageData: this.data.pageData.concat(data),
    });
  },

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
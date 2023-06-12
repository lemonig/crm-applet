// pages/deal-detail/index.js
import { pageContract, getContract } from '../../api/contract';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    titleProps: {
      title: '合同详情',
    },
    active: 0,
    msg: [
      {
        text: '信息获取',
        isShow: true,
      },
      {
        text: '关系建立',
        isShow: true,
      },
      {
        text: '公司认可',
        isShow: true,
      },
      {
        text: '招标参与',
        isShow: false,
      },
      {
        text: '合同签订',
        isShow: false,
      },
    ],
    id: '',
    data: {},
  },
  onChange(event) {
    this.setData({
      active: event.detail.name,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id,
    });
    this.getPageData(options.id)
  },
  async getPageData(id) {
    let { data } = await getContract({id});
    data?.financeInfo?.details.map(item=> {
      if(item.rate) item.rate += '%'
    })
    this.setData({
     data
    })
  },

  gotoCustomer(){
    if(!this.data.data.baseInfo.orgName){
      return
    }
    wx.navigateTo({
      url: '/pages/customer-detail/index?id=' + this.data.data.baseInfo.orgId,
    })
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

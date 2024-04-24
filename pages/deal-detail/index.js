// pages/deal-detail/index.js
import { detailDeal, listPipelineStage,dealAct } from '../../api/deal';
import Dialog from '@vant/weapp/dialog/dialog';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    titleProps: {
      title: '商机详情',
    },
    pipeState: [],
    pipelineId: '',
    pipelineIdx: -1,
    active: 0,
    dealId: '',
    data: {},

  },
  parentMethod() {
    wx.switchTab({
        url: '/pages/deal/index',
      });
  },
  fetchData: async function () {
    let { data } = await detailDeal({
      id: this.data.dealId,
    });
    console.log(data);
    let res = data.pipelineDetailList.findLastIndex((item) => item.isShow);
    this.setData({ data, pipelineIdx: res + 1 });
  },
  onChange(event) {
    this.setData({
      active: event.detail.name,
    });
  },
  selectPipeline() {
    if(!this.data.data.baseInfo.isOwner){
      return
    }
    if(['2','3','4'].includes(this.data.data.baseInfo.status )){
      Dialog.confirm({
        title: '提示',
        message: `商机已 ${this.data.data.baseInfo.statusName} ,确认重新打开？`,
        beforeClose: (action) =>
          new Promise(async(resolve) => {
              if (action === 'confirm') {
                let { success, message } = await dealAct({
                  id: this.data.dealId,
                  type: 'reopen'
                });
                if(success){
                  wx.navigateTo({
                    url: '/pages/search/pipeline-select/index?dealId=' + this.data.dealId+'&pipelineStageId='+ this.data.data.baseInfo.pipelineStageId,
                  });
                }
                  resolve(true);
              } else {
                resolve(true);
              }
          }),
      });
      return 
    }
    wx.navigateTo({
        url: '/pages/search/pipeline-select/index?dealId=' + this.data.dealId+'&pipelineStageId='+ this.data.data.baseInfo.pipelineStageId,
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

  gotoCustomer(){
    if(!this.data.data.baseInfo.orgName){
      return
    }
    wx.navigateTo({
      url: '/pages/customer-detail/index?id=' + this.data.data.baseInfo.orgId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      dealId: options.id,
    });
    wx.hideHomeButton()
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
  onUnload(event) {
  },

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

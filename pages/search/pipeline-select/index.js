// pages/pipeline-select/index.js
import Notify from '@vant/weapp/notify/notify';
import {
  listPipelineStagePlus,
  dealAct,
  activityList,
  terminationReasonList,
  lostReasonList,
  pageDeal,
} from '../../../api/deal';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    titleProps: {
      title: '推进流程阶段',
    },
    pipeState: [],
    tarminalList: [],
    loseList: [],
    terminaId: '',
    loseId: '',
    description: '',
    winForm: {
      conNmae: '',
      conId: '',
    },
    dealId: '',
    currentID: '',
    pipelineType: 'default',
    btnLoad: false,
  },
  choosePipe(eve) {
    let { id, ptype } = eve.currentTarget.dataset;
    this.setData({
      currentID: id,
      pipelineType: ptype,
    });
  },

  onConfirmt(event) {
    const { picker, value, index } = event.detail;
    this.setData({
      terminaId: value,
    });
  },
  onConfirml(event) {
    const { picker, value, index } = event.detail;
    this.setData({
      loseId: value,
    });
  },

  async submit() {
    this.setData({
      btnLoad: true,
    });
    let { terminaId, loseId, winForm, dealId, currentID, pipelineType, description } = this.data;
    let params = {
      id: dealId,
      pipelineStageId: currentID,
      type: pipelineType,
    };
    switch (pipelineType) {
      case 'terminate':
        params.terminationReasonId = terminaId;
        params.description = description;
        break;
      case 'lose':
        params.lostReasonId = loseId;
        params.description = description;
        break;
      case 'win':
        params.contractId = winForm.conId;
        break;
      default:
        params.pipelineStageId;
    }
    let { success, message } = await dealAct(params);
    wx.showToast({
      title: message,
      icon: 'none',
    });
    this.setData({
      btnLoad: false,
    });
    if (success) {
      wx.navigateBack();
    }

    setTimeout(() => {
      // wx.navigateBackMiniProgram()
    }, 2000);
  },
  selectCon() {
    wx.navigateTo({
      url: '/pages/search/contract-win/index',
    });
  },

  async getListPipelineStage() {
    let { data } = await listPipelineStagePlus();
    this.setData({
      pipeState: data.map((item) => ({
        ...item,
        label: item.name,
        value: item.dealProbability,
      })),
    });
  },
  async getTerminationReasonList() {
    let { data } = await terminationReasonList();
    const { contract } = data;
    this.setData({
      tarminalList: data.map((item) => ({
        label: item.name,
        value: item.id,
      })),
      winForm: {
        conId: 'id' in contract ?  contract.id :'',
        conNmae:'name' in contract ?  contract.name :'',
      },
    });
  },
  async getLostReasonList() {
    let { data } = await lostReasonList();
    this.setData({
      loseList: data.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      dealId: options.dealId,
      currentID: options.pipelineStageId * 1,
    });
    this.getListPipelineStage();
    this.getTerminationReasonList();
    this.getLostReasonList();
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

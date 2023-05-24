// pages/pipeline-select/index.js
import Notify from '@vant/weapp/notify/notify';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    titleProps: {
      title: '推进流程阶段',
    },
    pipeState: [
      {
        id: '1',
        label: '信息获取',
        value: 12,
      },
      {
        id: '2',
        label: '关系建立',
        value: 12,
      },
      {
        id: '3',
        label: '公司认可',
        value: 12,
      },
      {
        id: '4',
        label: '招投标签订',
        value: 12,
      },
      {
        id: '5',
        label: '商机终止',
        value: 100,
      },
      {
        id: '6',
        label: '输单',
        value: 100,
      },
      {
        id: '7',
        label: '赢单',
        value: 100,
      },
    ],

    tarminalList: [
      {
        label: '客户取消项目',
        value: '1',
      },
      {
        label: '预算过大',
        value: '2',
      },
    ],
    loseList: [
      {
        label: '方案修改',
        value: '1',
      },
      {
        label: '临时取消',
        value: '2',
      },
    ],

    terminalForm:{
      terminationReasonId:'1',
      description:''
    },
    loseForm:{
      lostReasonId :'1',
      description:''
    },
    winForm:{
      conNmae :'',
      conId:''
    },

    currentID: '',
    btnLoad: false,
  },
  choosePipe(eve) {
    let id = eve.currentTarget.dataset.id;
    console.log(id);
    this.setData({
      currentID: id,
    });
  },
  submit() {
    this.setData({
      btnLoad: true,
    });
    // Notify({
    //   message: '自定义时长',
    //   duration: 1000,
    // });
    wx.showToast({
      title: '提交',
      icon: 'none',
    });
    setTimeout(() => {
      wx.navigateBack();
      // wx.navigateBackMiniProgram()
    }, 2000);
  },
  selectCon() {
    wx.navigateTo({
      url: '/pages/search/contract-win/index',
    })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

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

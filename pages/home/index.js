// pages/home/index.js

const salerData = [

  {
    text: "",
  }
]

const saleOptions = [{
    label: "仅本人",
    value: "1",
  },
  {
    label: "本人及下属",
    value: "2",
  },
  {
    label: "公司",
    value: "3",
  },
  {
    label: "东部大区",
    value: "4",
  },
  {
    label: "北部大区",
    value: "5",
  }
]

const contractMoney = [{
    label: "合同额",
    value: "1",
  },
  {
    label: "回款额",
    value: "2",
  },
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultData: {
      title: "首页", // 导航栏标题
    },
    saleOptions: saleOptions,
    saleValue: "1",
    saleShow: false,
    contractMOp: contractMoney,
    contractValue: "1",
    contractShow: false
  },




  onSaleClose() {
    this.setData({
      saleShow: false
    });
  },
  // 销售
  onShowSalePopup() {
    this.setData({
      saleShow: true
    });
  },
  onSaleChange: function (e) {
    console.log(e.detail);
    this.setData({
      saleValue: e.detail.value,
      saleShow: false
    })
    // 自定义组件触发事件时提供的detail对象
  },
  // 合同
  onContactPopupClick() {
    this.setData({
      contractShow: true
    });
  },
  onContractChange: function (e) {
    console.log(e.detail);
    this.setData({
      contractValue: e.detail.value,
      contractShow: false
    })
    // 自定义组件触发事件时提供的detail对象
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(this.data.height)
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
    this.contractMoneyBarInit()


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

  },


  //  合同金额
  contractMoneyBarInit() {
    const charts = this.selectComponent('#contract-money-bar')
    if (!charts) return
    charts.init({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }]
    })
  }

  // contractMoneyBarInit({
  //   legend,
  //   dataList,
  //   xaxis
  // }) {
  //   const colorMap = {
  //     '优Ⅲ': '#52C0FC',
  //     'Ⅳ类': '#F1E10C',
  //     'Ⅴ类': '#FB9B03',
  //     '劣Ⅴ类': '#F82504',
  //   }
  //   const charts = this.selectComponent('#contract-money-bar')
  //   if (!charts) return
  //   const series = dataList.map((item, index) => {
  //     return {
  //       stack: 'total',
  //       type: 'bar',
  //       color: colorMap[legend[index]],
  //       name: legend[index],
  //       barMaxWidth: 25,
  //       data: item
  //     }
  //   })
  //   charts.init({
  //     title: {
  //       text: "逐月趋势",
  //       textStyle: {
  //         fontSize: 14,
  //         color: '#5a5a5a',
  //         fontWeight: 400
  //       },
  //     },
  //     tooltip: {
  //       show: true,
  //       textStyle: {
  //         fontSize: 12
  //       }
  //     },
  //     grid: {
  //       top: 30,
  //       left: 10,
  //       right: 10,
  //       bottom: 30,
  //       containLabel: true,
  //     },
  //     legend: {
  //       right: 10,
  //       textStyle: {
  //         fontSize: 10
  //       }
  //     },
  //     xAxis: [{
  //       type: 'category',
  //       data: xaxis
  //     }],
  //     yAxis: [{
  //       type: 'value'
  //     }],
  //     series,
  //   })
  // },

})
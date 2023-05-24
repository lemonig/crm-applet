// pages/home/index.js
import Notify from '@vant/weapp/notify/notify';
import Dialog from '@vant/weapp/dialog/dialog';
const app = getApp()
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
const rankList = [{
    label: "合同金额",
    value: "1",
  },
  {
    label: "回款金额",
    value: "2",
  },
  {
    label: "合同书",
    value: "3",
  },
  {
    label: "新增更进记录",
    value: "4",
  },
]
const funnelList = [{
    label: "商机金额",
    value: "1",
  },
  {
    label: "商机数量",
    value: "2",
  },

]
const timeList = [{
    label: "本周",
    value: "1",
  },
  {
    label: "本月",
    value: "2",
  },
  {
    label: "本季度",
    value: "3",
  },
  {
    label: "本年",
    value: "4",
  },
  {
    label: "上月",
    value: "5",
  },
  {
    label: "上周",
    value: "6",
  },
  {
    label: "上季度",
    value: "7",
  },
  {
    label: "上年",
    value: "8",
  },

]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,
    defaultData: {
      title: "首页", // 导航栏标题
    },
    saleOptions: saleOptions,
    saleValue: "1",
    saleShow: false,

    timeOptions: timeList,
    timeValue: "1",
    timeShow: false,

    contractMOp: contractMoney,
    contractValue: "1",
    contractShow: false,

    rankList: rankList,
    rankValue: "1",
    rankShow: false,

    funnelList: funnelList,
    funnelValue: "1",
    funnelShow: false,
    // 表格
    tableHeader: [{
        prop: 'id',
        width: 110,
        label: '序号'
      },
      {
        prop: 'status',
        width: 300,
        label: '姓名'
      }, {
        prop: 'datetime',
        width: 200,
        label: '日期',
        color: '#55C355'
      },


    ],
    stripe: true,
    border: true,
    outBorder: true,
    row: [{
      "id": 1,
      "status": '张三',
      "datetime": "12213",

    }, {
      "id": 2,
      "status": '李四',
      "datetime": "30402",

    }, {
      "id": 3,
      "status": '王五',
      "datetime": "10403",
    }],
    msg: '暂无数据',
    salePanel: [

      {
        label: "今日任务",
        val: "2",
        unit: "个",
        link:"task"
      },
      {
        label: "全部待办",
        val: "6",
        unit: "个",
        link:"task"
      },
      {
        label: "超期任务",
        val: "5",
        unit: "个",
        link:"task"
      },
      {
        label: "商机数量",
        val: "4",
        unit: "个",
        link:"deal"
      },
      {
        label: "无跟进计划商机",
        val: "3",
        unit: "个",
        link:"deal"
      },
      {
        label: "无变化商机",
        val: "2",
        unit: "个",
        link:"deal"
      },
      {
        label: "商机金额预测",
        val: 60000,
        unit: "",
        link:"deal"
      },
      {
        label: "应收未收额",
        val: 400000,
        unit: "",
        link:"deal"
      },
      {
        label: "已开票未收款",
        val: 200,
        unit: "",
        link:"deal"
      },
    ]


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
  // 时间
  onShowTimePopup() {
    this.setData({
      timeShow: true
    });
  },
  onTimeChange: function (e) {
    console.log(e.detail);
    this.setData({
      timeValue: e.detail.value,
      timeShow: false
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
  // 排行
  onRankPopupClick() {
    this.setData({
      contractShow: true
    });
  },
  onRankChange: function (e) {
    console.log(e.detail);
    this.setData({
      rankValue: e.detail.value,
      rankShow: false
    })
    // 自定义组件触发事件时提供的detail对象
  },
  // 漏斗
  onFunnelPopupClick() {
    this.setData({
      funnelShow: true
    });
  },
  onFunnelhange: function (e) {
    console.log(e.detail);
    this.setData({
      funnelValue: e.detail.value,
      funnelShow: false
    })
    // 自定义组件触发事件时提供的detail对象
  },
  // 跳转
  gotoDetail: function (e) {
    let {
      panel
    } = e.currentTarget.dataset
    let url = `/pages/${panel}/index`
    wx.switchTab({
      url: url,
    })
  
  
  },
  gotoSaleDetail(events) {
    let {
      panel
    } = events.currentTarget.dataset
    let url = `/pages/${panel}/index`
    console.log(url);
    wx.switchTab({
      url: url,
    })
  
  
  
  },
  gotoPage(events) {
    let {
      panel
    } = events.currentTarget.dataset
    let url = `/pages/${panel}-form/index`
    console.log(url);
    wx.navigateTo({
      url: url,
      // events: events,
      // success: (result) => {},
      // fail: (res) => {},
      // complete: (res) => {},
      // url: '/pages/customer-form/index',
    })

  },
  logout(){
    Dialog.confirm({
      title: '提示',
      message: '确定退出吗',
    })
      .then(() => {
        // on confirm
        wx.clearStorage()
        wx.redirectTo({
          url: '/pages/login/index',
        })
      })
      .catch(() => {
        // on cancel
      });
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
    this.funnelMoneyBarInit()
    this.getTabBar().init();


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
      grid: {
        top: 30,
        left: 10,
        right: 10,
        bottom: 30,
        containLabel: true,
      },
      tooltip: {
        show: true,
        textStyle: {
          fontSize: 12
        }
      },
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
  },

  funnelMoneyBarInit() {
    const charts = this.selectComponent('#funnel-money-bar')
    if (!charts) return
    charts.init({
      grid: {
        top: 30,
        left: 10,
        right: 10,
        bottom: 30,
        containLabel: true,
      },
      tooltip: {
        show: true,
        textStyle: {
          fontSize: 12
        }
      },
      xAxis: {
        type: 'value'

      },
      yAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
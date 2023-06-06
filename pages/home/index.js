// pages/home/index.js
import Notify from '@vant/weapp/notify/notify';
import { saleCount, dashboard } from '../../api/home';
import {
  saleOptions1,
  saleOptions,
  contractMoney,
  rankList,
  funnelList,
  timeList,
} from './staticData';

const app = getApp();
const salerData = [
  {
    text: '',
  },
];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,
    defaultData: {
      title: '首页', // 导航栏标题
    },
    saleOptions: saleOptions,
    saleValue: '1',
    saleShow: false,

    saleOptions1: saleOptions1,
    saleValue1: '1',
    saleShow1: false,

    timeOptions: timeList,
    timeValue: '1',
    timeShow: false,

    contractMOp: contractMoney,
    contractValue: 'valueCount',
    contractShow: false,

    rankList: rankList,
    rankValue: '1',
    rankShow: false,

    funnelList: funnelList,
    funnelValue: 'valueCount',
    funnelShow: false,
    // 表格
    tableHeader: [
      {
        prop: 'id',
        width: 110,
        label: '序号',
      },
      {
        prop: 'status',
        width: 300,
        label: '姓名',
      },
      {
        prop: 'datetime',
        width: 200,
        label: '日期',
        color: '#55C355',
      },
    ],
    stripe: true,
    border: true,
    outBorder: true,
    row: [
      {
        id: 1,
        status: '张三',
        datetime: '12213',
      },
      {
        id: 2,
        status: '李四',
        datetime: '30402',
      },
      {
        id: 3,
        status: '王五',
        datetime: '10403',
      },
    ],
    msg: '暂无数据',
    salePanel: [
      {
        label: '今日任务',
        val: '2',
        unit: '个',
        link: 'task',
        key: 'todayActivityCount',
      },
      {
        label: '全部待办',
        val: '6',
        unit: '个',
        link: 'task',
        key: 'allActivityCount',
      },
      {
        label: '超期任务',
        val: '5',
        unit: '个',
        link: 'task',
        key: 'overdueActivityCount',
      },
      {
        label: '商机数量',
        val: '4',
        unit: '个',
        link: 'deal',
        key: 'dealCount',
      },
      {
        label: '无跟进计划商机',
        val: '3',
        unit: '个',
        link: 'deal',
        key: 'noFollowUpDealCount',
      },
      {
        label: '无变化商机',
        val: '2',
        unit: '个',
        link: 'deal',
        key: 'noChangeDealCount',
      },
      {
        label: '商机金额预测',
        val: 60000,
        unit: '',
        link: 'deal',
        key: 'prevDealValue',
      },
      {
        label: '应收未收额',
        val: 400000,
        unit: '',
        link: 'deal',
        key: 'unreceivedValue',
      },
      {
        label: '已开票未收款',
        val: 200,
        unit: '',
        link: 'deal',
        key: 'invoicedUnreceivedValue',
      },
    ],

    pageData1: {},
    pageData2: {},
    pageData3: {},
    pageData4: {},
  },

  onSaleClose() {
    this.setData({
      saleShow: false,
    });
  },
  // 销售
  onShowSalePopup() {
    this.setData({
      saleShow: true,
    });
  },

  onSaleChange: function (e) {
    this.setData({
      saleValue: e.detail.value,
      saleShow: false,
    });
    this.getSaleCount();
  },
  onShowSalePopup1() {
    this.setData({
      saleShow1: true,
    });
  },
  onSaleChange1: function (e) {
    this.setData({
      saleValue1: e.detail.value,
      saleShow1: false,
    });
  },
  // 时间
  onShowTimePopup() {
    this.setData({
      timeShow: true,
    });
  },
  onTimeChange: function (e) {
    console.log(e.detail);
    this.setData({
      timeValue: e.detail.value,
      timeShow: false,
    });
    // 自定义组件触发事件时提供的detail对象
  },
  // 合同
  onContactPopupClick() {
    this.setData({
      contractShow: true,
    });
  },
  onContractChange: function (e) {
    console.log(e.detail);
    this.setData({
      contractValue: e.detail.value,
      contractShow: false,
    });

    this.contractMoneyBarInit(this.data.pageData3[e.detail.value]);
    // 自定义组件触发事件时提供的detail对象
  },
  // 排行
  onRankPopupClick() {
    this.setData({
      contractShow: true,
    });
  },
  onFunnelPopupClick() {
    this.setData({
      funnelShow: true,
    });
  },
  onRankChange: function (e) {
    console.log(e.detail);
    this.setData({
      rankValue: e.detail.value,
      rankShow: false,
    });
    // 自定义组件触发事件时提供的detail对象
  },
  // 漏斗
  onFunnelPopupClick() {
    this.setData({
      funnelShow: true,
    });
  },
  onFunnelhange: function (e) {
    console.log(e.detail);
    this.setData({
      funnelValue: e.detail.value,
      funnelShow: false,
    });
    this.funnelMoneyBarInit(this.data.pageData4[e.detail.value]);
    // 自定义组件触发事件时提供的detail对象
  },
  // 跳转
  gotoDetail: function (e) {
    let { panel } = e.currentTarget.dataset;
    let url = `/pages/${panel}/index`;
    wx.switchTab({
      url: url,
    });
  },
  gotoSaleDetail(events) {
    let { panel } = events.currentTarget.dataset;
    let url = `/pages/${panel}/index`;
    console.log(url);
    wx.switchTab({
      url: url,
    });
  },
  gotoPage(events) {
    let { panel } = events.currentTarget.dataset;
    let url = `/pages/${panel}-form/index`;
    console.log(url);
    wx.navigateTo({
      url: url,
      // events: events,
      // success: (result) => {},
      // fail: (res) => {},
      // complete: (res) => {},
      // url: '/pages/customer-form/index',
    });
  },

  gotoMyself() {
    wx.navigateTo({
      url: '/pages/myself/index',
    });
  },
  async getSaleCount() {
    let { success, data } = await saleCount({
      filterBy: this.data.saleValue,
    });
    this.setData({
      pageData1: data,
    });
  },

  async getDashboard() {
    let params = {
      filterBy: this.data.saleValue,
      timeBy: this.data.timeValue,
    };
    let { success, data } = await dashboard(params);
    this.setData({
      pageData2: data.simpleReport,
      pageData3: data.contractChart,
      pageData4: data.funnelChart,
    });
    this.contractMoneyBarInit(data.contractChart[this.data.contractValue]);
    this.funnelMoneyBarInit(data.funnelChart[this.data.funnelValue]);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getSaleCount();
    this.getDashboard();
    console.log(this.data.height);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().init();
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
  onPullDownRefresh() {
    this.getSaleCount();
    this.getDashboard();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},

  //  合同金额
  contractMoneyBarInit(data) {
    let xData = [];
    let yData = [];
    data.forEach((ele) => {
      xData.push(ele.name);
      yData.push(ele.value);
    });
    const charts = this.selectComponent('#contract-money-bar');
    if (!charts) return;
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
          fontSize: 12,
        },
      },
      xAxis: {
        type: 'category',
        data: xData,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: yData,
          type: 'bar',
        },
      ],
    });
  },

  funnelMoneyBarInit(data) {
    let xData = [];
    let yData = [];
    data.forEach((ele) => {
      xData.push(ele.name);
      yData.push(ele.value);
    });
    const charts = this.selectComponent('#funnel-money-bar');
    if (!charts) return;
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
          fontSize: 12,
        },
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: xData,
      },
      series: [
        {
          data: yData,
          type: 'bar',
        },
      ],
    });
  },
});

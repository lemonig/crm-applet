// pages/home/index.js
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
    saleValue: '3',
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
        val: '0',
        unit: '个',
        link: 'task',
        key: 'todayActivityCount',
        type:1
      },
      {
        label: '全部待办',
        val: '0',
        unit: '个',
        link: 'task',
        key: 'allActivityCount',
        type:2
      },
      {
        label: '超期任务',
        val: '0',
        unit: '个',
        link: 'task',
        key: 'overdueActivityCount',
        type:3
      },
      {
        label: '商机数量',
        val: '0',
        unit: '个',
        link: 'deal',
        key: 'dealCount',
        type:1
      },
      {
        label: '无跟进计划商机',
        val: '0',
        unit: '个',
        link: 'deal',
        key: 'noFollowUpDealCount',
        type:2
      },
      {
        label: '无变化商机',
        val: '0',
        unit: '个',
        link: 'deal',
        key: 'noChangeDealCount',
        type:3
      },
      {
        label: '商机金额',
        val: '0',
        unit: '',
        link: 'deal',
        key: 'allDealValue',
        type:1
      },

      {
        label: '商机金额预测',
        val: 0,
        unit: '',
        link: 'deal',
        key: 'prevDealValue',
        type:1
      },
      {
        label: '未收款',
        val: 0,
        unit: '',
        link: 'contract',
        key: 'unreceivedValue',
        type:6

      },
      {
        label: '已开票未收款',
        val: 0,
        unit: '',
        link: 'contract',
        key: 'invoicedUnreceivedValue',
        type:2
      },
    ],

    pageData1: {},
    pageData2: {},
    pageData3: {},
    pageData4: {},
    userIdList: [],
    deptIdList: [],
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
    if (e.detail.isLink) {
      wx.navigateTo({
        url: '/pages/search/staff-search/index',
      });
    }
    this.setData({
      saleValue: e.detail.value,
      saleShow: false,
    });
    if (!e.detail.isLink) {
      this.setData({
        userIdList: [],
      });
      this.getPageData();
    }
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
    this.getDashboard();
  },
  // 时间
  onShowTimePopup() {
    this.setData({
      timeShow: true,
    });
  },
  onTimeChange: function (e) {
    this.setData({
      timeValue: e.detail.value,
      timeShow: false,
    });
    this.getDashboard();
    // 自定义组件触发事件时提供的detail对象
  },
  // 合同
  onContactPopupClick() {
    this.setData({
      contractShow: true,
    });
  },
  onContractChange: function (e) {
    this.setData({
      contractValue: e.detail.value,
      contractShow: false,
    });

    this.contractMoneyBarInit(this.data.pageData3[e.detail.value]);
    // 自定义组件触发事件时提供的detail对象
  },
  // 排行
  // onRankPopupClick() {
  //   this.setData({
  //     contractShow: true,
  //   });
  // },
  onFunnelPopupClick() {
    this.setData({
      funnelShow: true,
    });
  },
  onRankChange: function (e) {
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
  onFunnelChange: function (e) {
    this.setData({
      funnelValue: e.detail.value,
      funnelShow: false,
    });
    this.funnelMoneyBarInit(this.data.pageData4[e.detail.value]);
    // 自定义组件触发事件时提供的detail对象
  },
  // 跳转
  gotoDetail: function (e) {
    let { panel,type,title } = e.currentTarget.dataset;
    let url = `/pages/${panel}-view/index`;
    let _this = this
    wx.navigateTo({
        url: url,
        success: function(res) {
          res.eventChannel.emit('acceptData', { data: {
            type,
            filterBy: _this.data.saleValue,
            timeBy: _this.data.timeValue,
            userIdList: _this.data.userIdList,
            title
          } })
        }
      })
  },
  gotoSaleDetail(events) {
    let { panel,type,title } = events.currentTarget.dataset;
    let url = `/pages/${panel}-view/index`;
    let _this = this
    wx.navigateTo({
        url: url,
        success: function(res) {
          res.eventChannel.emit('acceptData', { data: {
            type,
            filterBy: _this.data.saleValue,
            userIdList: _this.data.userIdList,
            title
          } })
        }
      })
 
  },
  gotoPage(events) {
    let { panel } = events.currentTarget.dataset;
    let url = `/pages/${panel}-form/index`;
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
      userIdList: this.data.userIdList,
    });
    this.setData({
      pageData1: data,
    });
  },

  async getDashboard() {
    let params = {
      filterBy: this.data.saleValue,
      timeBy: this.data.timeValue,
      userIdList: this.data.userIdList,
    };
    try {
      let { success, data } = await dashboard(params);
      if(success){
        this.setData({
          pageData2: data.simpleReport,
          pageData3: data.contractChart,
          pageData4: data.funnelChart,
        });
        this.contractMoneyBarInit(data.contractChart[this.data.contractValue]);
        this.funnelMoneyBarInit(data.funnelChart[this.data.funnelValue]);
        return success;
      }
      
    } catch (error) {
      
    }

  },

  getPageData() {
    this.getSaleCount();
    this.getDashboard();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getPageData();
    wx.stopPullDownRefresh(); //刷新完成后停止下拉刷新动效
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
    this.onLoad();
  },

  refreshData: function () {},

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
          label: {
            show: true,
            position: 'top',
            color: '#000',
            fontSize: 12,
          },
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
        left: 0,
        right: 30,
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
          label: {
            show: true,
            position: 'right',
            color: '#000',
            fontSize: 12,
          },
        },
      ],
    });
  },
});

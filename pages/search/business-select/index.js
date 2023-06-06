// index.js
// 获取应用实例
const app = getApp();
import Notify from '@vant/weapp/notify/notify';
import { searchDeal as getDealList } from '../../../api/task';
import { debounce } from '../../../utils/util';
Page({
  data: {
    navBarHeight: app.globalData.navBarHeight,
    loading: false,
    titleProps: {
      title: '商机',
    },
    //  请求列表数据类型
    dataType: '',
    key: '',
    list: [],
    filterList: [],
    indexList: [],
    pageData: [],
    loading: false,
    value:{}
  },
  //  页面加载事件
  onLoad(options) {
    if (!options.dataType) return Notify({ type: 'warning', message: '未获取到数据类型' });
    this.setData({
      dataType: options.dataType,
    });
  },
  //  页面显示事件
  onShow() {
    if (!this.data.dataType) return Notify({ type: 'warning', message: '未获取到数据类型' });
  },
  //  获取页面数据
  async fetchData() {
    let { data } = await getDealList({
      name: this.data.key,
    });

    this.setData({
      pageData: data,
    });
  },

  handleListFilter: debounce(function (eve) {
    if (!eve.detail) {
      return;
    }
    this.setData({
      key: eve.detail,
    });
    this.fetchData();
  }, 500),

  //  站点列表点击事件
  handleSiteClick(event) {},
  //  搜索数组过滤
  onSelect(event) {
    console.log(event);
    this.setData({
      value: event.currentTarget.dataset.item,
    });
  },
  // delete

  comfirm() {
    console.log(this.data.value);
    var pages = getCurrentPages();
    var prePages = pages[pages.length - 2];
    console.log(prePages);
    prePages.setData({
      'form.dealName': this.data.value.title,
      'form.dealId': this.data.value.id,

    });
    console.log(prePages.data.form);
    wx.navigateBack({
      delta: 1,
    });
  },


});

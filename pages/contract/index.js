// pages/contract/index.js
import dayjs from 'dayjs';
import { pageContract, getContract } from '../../api/contract';
import { debounce } from '../../utils/util';
const app = getApp();
var cloneData = [];

Page({
  data: {
    navBarHeight: app.globalData.navBarHeight,
    active: 0,
    titleProps: {
      title: '合同',
    },
    show: false,
    soetItme: [
      {
        label: '合同额',
        value: 1,
      },
      {
        label: '回款',
        value: 2,
      },
      {
        label: '已开票未收',
        value: 3,
      },
      {
        label: '应收未收',
        value: 4,
      },
      {
        label: '已开票',
        value: 5,
      },
      {
        label: '未开票',
        value: 6,
      },
    ],
    pageData: [],
    id: '',
    isPage: false,
    pageNo: 1,
    loading: false,
    isAllData: false,
    isScrollFeatch: false,
    filterD: {
      dataScope: 0,
      contractType: 0,
      otherType: 0,
      name: '',
    }, //search data
    sortData: {
      value: 0,
      signedDate: 0,
      rate: 0,
    },
  },
  //tab change
  onChange(event) {
    this.setData({
      active: event.detail.name,
      isScrollFeatch: false,
      pageNo: 1,
      sortData: {
        value: 0,
        signedDate: 0,
        rate: 0,
      },
    });
    this.fetchData();
  },
  // sort
  sortBy(eve) {
    let type = eve.detail.value;
    let key = eve.currentTarget.dataset.skey;
    this.data.sortData[key] = type;
    this.setData({
      sortData: { ...this.data.sortData },
      isScrollFeatch: false,
      pageNo: 1,
    });
    this.fetchData();
  },
  gotoDetail(eve) {
    wx.navigateTo({
      url: '/pages/contract-detail/index?id=' + eve.currentTarget.dataset.id,
    });
  },

  filterPop() {
    this.setData({
      show: true,
    });
  },
  onClose() {
    this.setData({
      show: false,
    });
  },
  filterData(eve) {
    this.onClose();
    this.setData({
      filterD: eve.detail,
      pageNo: 1,
      isScrollFeatch: false,
    });
    this.fetchData();
  },

  fetchData: async function () {
    this.setData({
      loading: true,
    });
    let sortData = [];
    let { active } = this.data;
    for (let i in this.data.sortData) {
      if (active === 0) {
        if (i == 'rate') {
          continue;
        }
      }

      if (active !== 0) {
        if (i == 'signedDate') {
          continue;
        }
      }
      let direction = '';
      if (this.data.sortData[i] === 1) {
        direction = 'asc';
      } else if (this.data.sortData[i] === -1) {
        direction = 'desc';
      } else {
        direction = '';
      }
      if (direction) {
        sortData.push({
          name: i,
          direction,
        });
      }
    }
    console.log(this.data.filterD);
    let params = {
      page: this.data.pageNo,
      size: 20,
      data: {
        ...this.data.filterD,
        valueType: this.data.active + 1,
        orderBy: sortData,
      },
    };


    let { data } = await pageContract(params);
    if (this.data.isScrollFeatch && !data.length) {
      this.setData({
        isAllData: true,
        loading: false,
      });
      return;
    }
    this.setData({
      loading: false,
      pageData: this.data.isScrollFeatch ? this.data.pageData.concat(data) : data,
      isScrollFeatch:false
    });
  },

  handleToLower: debounce(function () {
    this.setData({
      pageNo: this.data.pageNo + 1,
      isScrollFeatch: true,
    });
    this.fetchData();
  }, 500),



  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchData();
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

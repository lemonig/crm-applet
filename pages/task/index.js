// pages/task/index.js
import { updateAct, listTask, activityList } from '../../api/task';
import { taskInfo } from '../../api/home';
import { debounce } from '../../utils/util';
import Dialog from '@vant/weapp/dialog/dialog';

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,
    titleProps: {
      title: '任务',
    },
    option1: [
      {
        text: '全部',
        value: 0,
      },
      {
        text: '未完成',
        value: 1,
      },
      {
        text: '已完成',
        value: 2,
      },
      {
        text: '超时',
        value: 3,
      },
    ],
    option2: [
      {
        text: '全部',
        value: 0,
      },
    ],
    option3: [
      {
        text: '全部',
        value: 0,
      },
      {
        text: '仅我本人',
        value: 1,
      },
      {
        text: '我下属的',
        value: 2,
      },
      {
        text: '我及我下属的',
        value: 3,
      },
    ],
    value1: 0,
    value2: 0,
    value3: 1,

    checked: false,
    pageData: [],
    pageNo: 1,
    loading: false,
    isAllData: false,
  },

  onChange(event) {
    if (event.type === 'change') {
    }
    let {
      dataset: { checked, myself },
      id,
    } = event.currentTarget;
    if (!myself) {
      return;
    }
    // let res = this.data.pageData.find(ele => ele.id == id)
    // if (res) {
    //   res.done = !done
    //   this.setData({
    //     pageData: [...this.data.pageData]
    //   })
    // }
    let params = {
      id,
      done: !checked,
    };
    updateAct(params).then((res) => {
      if (res.success) {
        if (res.data.done && res.data.dealId) {
          Dialog.confirm({
            title: '消息',
            message: '任务已完成，是否去更新商机状态？ ',
            confirmButtonText: '好',
            cancelButtonText: '暂不更新',
            beforeClose: (action) =>
              action === 'confirm'
                ? wx.navigateTo({
                    url: '/pages/deal-detail/index?id=' + res.data.dealId,
                  })
                : true,
          })
            .then(() => {
              // on confirm
            })
            .catch(() => {
              // on cancel
            });
        }
        let res1 = this.data.pageData.find((ele) => ele.id == id);

        if (res1) {
          res1.done = !checked;
          this.setData({
            pageData: [...this.data.pageData],
          });
          this.getRelaInfo();
        }
      }
      wx.showToast({
        title: res.message,
        icon: 'none',
      });
    });
  },
  add() {
    wx.navigateTo({
      url: '/pages/task-form/index',
    });
  },

  handleToLower: debounce(function () {
    this.setData({
      loading: true,
      pageNo: this.data.pageNo + 1,
    });
    this.fetchData();
  }, 500),

  gotoDetail(eve) {
    let id = eve.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/task-detail/index?id=' + id,
    });
  },
  fetchData: async function () {
    let { value1, value2, value3 } = this.data;
    let params = {
      page: this.data.pageNo,
      size: 30,
      data: {
        status: value1,
        typeId: value2,
        filterBy: value3,
      },
    };
    let { data, additional_data } = await listTask(params);
    if (additional_data.pagination.total === this.data.pageData.length) {
      this.setData({
        isAllData: true,
        loading: false,
      });
      return;
    }
    this.setData({
      loading: false,
      pageData: this.data.pageData.concat(data),
    });
  },
  getActivityList: async function () {
    let { data } = await activityList();
    this.setData({
      option2: [
        ...this.data.option2,
        ...data.map((item) => ({
          text: item.name,
          value: item.id,
        })),
      ],
    });
  },

  async getRelaInfo() {
    let { data } = await taskInfo();
    this.getTabBar().setData({
      taskNum: data.undoneActivityCount,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getActivityList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      isAllData: false,
    });
    this.fetchData();

    this.getTabBar().init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    this.setData({
      pageData: [],
      pageNo: 1,
    });
  },

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
  sortChange1(eve) {
    this.setData({
      pageNo: 1,
      pageData: [],
      value1: eve.detail,
    });
    this.fetchData();
  },
  sortChange2(eve) {
    this.setData({
      pageNo: 1,
      pageData: [],
      value2: eve.detail,
    });
    this.fetchData();
  },
  sortChange3(eve) {
    this.setData({
      pageNo: 1,
      pageData: [],
      value3: eve.detail,
    });
    this.fetchData();
  },
});

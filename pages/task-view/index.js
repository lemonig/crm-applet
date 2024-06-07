// pages/task/index.js
import { updateAct } from '../../api/task';
import { activity as listTask } from '../../api/navgate';
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
      title: '任务看板',
    },
    feachParams: [],
    checked: false,
    pageData: [],
    pageNo: 1,
    loading: false,
    isAllData: false,
    userIdList: [],
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
    let params = {
      page: this.data.pageNo,
      size: 30,
      data: this.data.feachParams,
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
    const eventChannel = this.getOpenerEventChannel();
    let _this = this;
    eventChannel.on('acceptData', function ({ data }) {
      _this.setData({
        feachParams: data,
        titleProps: {
          title: data.title || '',
        },
      });
      _this.fetchData()

    });
    this.setData({
      isAllData: false,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
 
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    
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
});
